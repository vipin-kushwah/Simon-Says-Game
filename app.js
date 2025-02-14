let gameSeq = []; //Track Game color sequence
let userSeq = []; //Track User Color Press sequence

let btns = ["yellow", "red", "purple", "green"]; //All color

let started = false; //Initially Game was Stop
let level = 0; //Initial Level
let maxScore=0;//Maximum Score

let h2 = document.querySelector("h2");
//When First Time Key Press
document.addEventListener("keypress", function () {
    if (started == false) {
        started = true;

        levelUp();
    }
});
//Game Flash Function
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}
//UserButton Flash Function
function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 250);
}

//Change Level to Up
function levelUp() {
    userSeq=[];
    level++;
    h2.innerText = `Level ${level}`;
    //random color
    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

//Check Function to check userseq and gameseq
function checkAns(idx){
    if(userSeq[idx]===gameSeq[idx]){
       if(userSeq.length==gameSeq.length){
        setTimeout(levelUp,1000);
       }
    }else{
        maxScore=Math.max(level,maxScore);
        h2.innerHTML=`Game Over! Your Score:<b>${level}</b> &ensp;&ensp;&ensp; <b>Maximum Score:${maxScore}</b><br>Press any key to start`
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);
        reset();
    }

}
//When User press button
function btnPress() {
    let btn = this;
    userFlash(btn);

    uesrColor=btn.getAttribute("id");
    userSeq.push(uesrColor);

    checkAns(userSeq.length-1);
}
let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}
//reset function when wrong answer choose
function reset(){
started=false;
gameSeq=[];
userSeq=[];
level=0;
}