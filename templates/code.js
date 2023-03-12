import * as wasm from './pkg'
//let result = wasm.ad
var ChessBoard = document.getElementById('chess-board');
var squares = ChessBoard.getElementsByTagName('td');
var FromTo = [];
function rook(){
    result = true
    if(ToPeice.id[0]==FromPeicePos.id[0]){ // if from position and to position have the same letter, then you check if the number goes up
        if(parseInt(FromPeicePos.id[1])<parseInt(ToPeice.id[1])){
            for(var i=parseInt(FromPeicePos.id[1]); i<= parseInt(ToPeice.id[1]); i++){
                if(document.getElementById(`${ToPeice.id[0]}${i}`).innerText!=""){
                    let result = false
            }
        }
    }else{
        if(parseInt(FromPeicePos.id[1])>parseInt(ToPeice.id[1])){ // if peice going backwards
            for(var i=parseInt(ToPeice.id[1]); i<= parseInt(FromPeicePos.id[1]); i++){
                if(document.getElementById(`${ToPeice.id[0]}${i}`).innerText!=""){
                    let result=false
                }
        }
    }}
    }
    else{

    }

}
function movecolor(id,color) {  
    document.getElementById(id.id).setAttribute("name",color);
}
const buttonPressed = e => {
    FromTo.push(e.target.id);
    if(FromTo.length==2){
        let FromPeicePos = document.getElementById(FromTo[0]);
        let FromPeice = document.getElementById(FromTo[0]).innerText;
        let ToPeice = document.getElementById(FromTo[1]);
        if(ToPeice.innerText==""){
            console.log(ToPeice.id)
            console.log(FromPeicePos.id)
            if(result){
                var text = document.createTextNode(FromPeice);
                FromPeicePos.innerText = "";
                ToPeice.appendChild(text);
                movecolor(ToPeice,FromPeicePos.getAttribute("name"));
            }
        }else{
            if(ToPeice.getAttribute("name") != FromPeicePos.getAttribute("name")){
                var text = document.createTextNode(FromPeice);
                FromPeicePos.innerText = "";
                ToPeice.innerText=""
                ToPeice.appendChild(text);
                movecolor(ToPeice,FromPeicePos.getAttribute("name"));

            }
        }
        FromTo = [];
    }
}

for (let square of squares) {
    square.addEventListener("click", buttonPressed);
}