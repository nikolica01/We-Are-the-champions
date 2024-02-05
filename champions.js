import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref , push , onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appsetings = {
    databaseURL:"https://we-are-the-champions-1c32f-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app=initializeApp(appsetings)
const database=getDatabase(app)
const wearethechampionslistInDB=ref(database,"championslist")




const publish=document.getElementById("pubBtn")
const inputwrite=document.getElementById("inputwrite")
const inputfrom=document.getElementById("from")
const inputTo=document.getElementById("To")
const divel=document.getElementById("divel")




publish.addEventListener("click",function(){
    let AllinputValues=inputTo.value + inputwrite.value + inputfrom.value 
    
push(wearethechampionslistInDB,AllinputValues)

clearInputFieldEl()


})


onValue(wearethechampionslistInDB,function(snapshot){
    if (snapshot.exists()){

    let itemsArray=Object.entries(snapshot.val())
    clearchampionslistItem()
    for (let i=0; i < itemsArray.length ;i++){
        let currentItem=itemsArray[i]
        let currentItemId=currentItem[0]
        let currentItemValue=currentItem[1]
        appenditemtochampionList(currentItem)
        
    }
    } else {divel.innerHTML="No items here yet!"}
})



function appenditemtochampionList(item){
    let itemID=item[0]
    let itemValue=item[1]
    let newEl=document.createElement("div")
    let newEl2=document.createElement("br")
    newEl.appendChild(newEl2)
   
     newEl.classList.add("championlist")
    newEl.textContent=itemValue
    
     newEl.addEventListener("dblclick",function(){
        let exactLocationOfItemInDB=ref(database,`championslist/${itemID}`)
        remove(exactLocationOfItemInDB)
     })

    divel.append(newEl)
    
}

function clearInputFieldEl(){
    inputwrite.value=""
    inputTo.value=""
    inputfrom.value=""
}
function clearchampionslistItem(){
    divel.innerHTML=""
}

