let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-btn");
let newgamebtn=document.querySelector("#new-btn");
let msgcontainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");

let turnO= true; // player x, player O
let count=0;     //to track draw
// create 2d array
const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

boxes.forEach((box) => {
    box.addEventListener("click", ()=>{
        // console.log("box was clicked");
        if(turnO==true){
            box.innerText="O";
            turnO=false;
        }
        else{
            box.innerText="X";
            turnO=true;
        }
        box.disabled=true; // because if box was  first time clicked again if clicked that button theen button also perform that's why we use box.disabled=true
        
        // step 8 for match tie
        count++;
        let iswinner=checkWinner();
        if(count===9 && !iswinner){
            gameDraw();
        }
    });
});

// step 9 for match draw function
const gameDraw=()=>{
    msg.innerText=`Game was a Draw.`;
    msgcontainer.classList.remove("hide");
    disableBoxes();
};

//step 2 for checking winner
const checkWinner=()=>{
    for( let pattern of winPatterns){
        // console.log(boxes[pattern[0]].innerText,boxes[pattern[1]].innerText,boxes[pattern[2]].innerText);

        let pos1val=boxes[pattern[0]].innerText;
        let pos2val=boxes[pattern[1]].innerText;
        let pos3val=boxes[pattern[2]].innerText;

        if(pos1val!="" && pos2val!="" && pos3val!=""){
            if(pos1val===pos2val && pos2val===pos3val){
                // console.log("winner",pos1val);
                showWinner(pos1val);
                return true;      //step 9
            }
        }
    }
}

// step 4 when one winner is matched disable all btn boxes
const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};

// step 5 when one winner is matched enable all btn boxes for new game
const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
};

//step 3 for showing winner
const showWinner=(winner)=>{
    msg.innerText=`Congratulations, Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disableBoxes();
};



//step 6 game reseting
const resetGame=()=>{
    turnO=true;
    count=0;
    enableBoxes();
    msgcontainer.classList.add("hide");  /*when game is reset then message is hide */
};

// step7 

newgamebtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);