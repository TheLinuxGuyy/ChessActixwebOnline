        var ChessBoard = document.getElementById('chess-board');
        var squares = ChessBoard.getElementsByTagName('td');
        var FromTo = [];
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
                FromTo = [];
            }
        }

        for (let square of squares) {
        square.addEventListener("click", buttonPressed);
        }
