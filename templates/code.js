import * as wasm from './pkg' 
        var ChessBoard = document.getElementById('chess-board');
        var squares = ChessBoard.getElementsByTagName('td');
        var FromTo = [];
        function rook(){
            alphabet=["a","b","c","d","e","f","g","h"];
            if(ToPeice.id[0]==FromPeicePos.id[0]){ // if from position and to position have the same letter, then you check if the number goes up
                if(parseInt(FromPeicePos.id[1])<parseInt(ToPeice.id[1])){
                    for(var i=parseInt(FromPeicePos.id[1]); i<= parseInt(ToPeice.id[1]); i++){
                        if(document.getElementById(`${ToPeice.id[0]}${i}`).innerText!=""){
                            return "illegal";
                        }else{
                            return "legal";
                        }
                }
            }else{
                if(parseInt(FromPeicePos.id[1])>parseInt(ToPeice.id[1])){ // if peice going backwards
                    for(var i=parseInt(ToPeice.id[1]); i<= parseInt(FromPeicePos.id[1]); i++){
                        if(document.getElementById(`${ToPeice.id[0]}${i}`).innerText!=""){
                            return "illegal"; // this means there is a peice inbetween from and to
                        }else{
                            return "legal";
                        }
                }
            }}
            }
            
            if(ToPeice.id[1]==FromPiecePos.id[1]){
                    FromPeicePosIndex=alphabet.indexOf(FromPeicePos.id[0])
                    ToPeiceIndex=alphabet.indexOf(ToPeice.id[0])
                    if(alphabet.IndexOf(ToPeice.id[0])> alphabet.IndexOf(FromPeicePos.id[0])){
                        for(let i = FromPeicePosIndex; i<ToPieceIndex; i++){
                            let current_letter = alphabet[i]
                            if(document.getElementById(`${current_letter}${ToPeice.id[1]}`).innerText!=""){
                                return "illegal";
                            }else{
                                return "legal";
                            }
                        }
                    }if(alphabet.IndexOf(ToPeice.id[0])< alphabet.IndexOf(FromPeicePos.id[0])){
                        for(let i=ToPieceIndex; i<FromPeicePosIndex; i++){
                            let current_letter=alphabet[i]
                            if(document.getElementById(`${current_letter}${ToPeice.id[1]}`).innerText!=""){
                                return "illegal";
                            }else{
                                return "legal";
                            }
                        }
                    }
                }
            else{
                return "illegal";
            }

        }

        function bishop(){
            alphabet=["a","b","c","d","e","f","g","h"];
            if(FromPeicePos[0] != ToPeice[0] && FromPeicePos[1] !=ToPeice[1]){
                FromPeicePosFor=alpahbet.IndexOf(FromPeicePos[0]);
                ToPeicePosFor=aplhabet.IndexOf(ToPeice[0]);
                if(FromPeicePos[1]<ToPeice[1]){
                    for(let i=parseInt(FromPeicePos[1]); i<parseInt(ToPeicePosFor[1]); i++){
                        if(document.getElementById(`${alphabet[i]}${i}`).innerText!=""){
                            return "illegal";
                        }
                    }
                    return "legal";
                }
            }else{
                return"illegal";
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
                let toccupied= ToPeice.name!=FromPeice.name
                switch(FromPeice){
                    case '♜':
                        result=rook();
                        return result;
                    case '♟':
                        result = wasm.check_legality("pawn",FromPeicePos,ToPeice,toccupied)
                        return result;

                    default:
                        result="illegal";
                }
                if(result=="legal"){
                    if(ToPeice.innerText==""){
                        console.log(ToPeice.id)
                        console.log(FromPeicePos.id)
                        var text = document.createTextNode(FromPeice);
                        FromPeicePos.innerText = "";
                        ToPeice.appendChild(text);
                        movecolor(ToPeice,FromPeicePos.getAttribute("name"));
                    }else{
                        if(ToPeice.getAttribute("name") != FromPeicePos.getAttribute("name")){
                            var text = document.createTextNode(FromPeice);
                            FromPeicePos.innerText = "";
                            ToPeice.innerText=""
                            ToPeice.appendChild(text);
                            movecolor(ToPeice,FromPeicePos.getAttribute("name"));

                        }
                    }
                }
                FromTo = [];
            }
        }

        for (let square of squares) {
            square.addEventListener("click", buttonPressed);
        }