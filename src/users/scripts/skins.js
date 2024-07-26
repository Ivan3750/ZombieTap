const sprite = document.querySelector('.sprite');
const btnLeft = document.querySelector('.slider-left');
const btnRight = document.querySelector('.slider-right');
const lock = document.querySelector('.img-lock');


let activeSprite = 1
let animIndex = 1
let maxlevel = 1


window.addEventListener("load", ()=>{
    sprite.src = `../../assets/sprites/${activeSprite}/Idle 1 (${animIndex}).png`
})

const loadSprite = () =>{
    console.log("Now is sprite: " + activeSprite)
    if(maxlevel < activeSprite){
        sprite.classList.add("lock")
        lock.style.display = "flex"
    }else{
        sprite.classList.remove("lock")
        lock.style.display = "none"
    }
    sprite.src = `../../assets/sprites/${activeSprite}/Idle 1 (${animIndex}).png`

}


btnLeft.addEventListener("click", ()=>{
    if(activeSprite !== 1){
        activeSprite--
        loadSprite()
    }
})
btnRight.addEventListener("click", ()=>{
    if(activeSprite !== 6){
        activeSprite++
        loadSprite()
    }
})