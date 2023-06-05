window.onload = function(){

    let posicao = 0;
    let imagens = document.querySelectorAll(".containerImg img");
    let mudar = true;
    let time  = 2000;
    let altomatico = setInterval(voltar,time++);
    let atual = 0;

    document.querySelectorAll(".containerImg").item(0).addEventListener("mousemove",()=>{
        clearInterval(altomatico)
    })
    document.querySelectorAll(".containerImg").item(0).addEventListener("mouseover",()=>{
        clearInterval(altomatico)
    })
    document.querySelectorAll(".containerImg").item(0).addEventListener("mouseout",()=>{
        altomatico = setInterval(voltar,time++)
    })
    
    let containerMiniatura = document.getElementById("containerMiniatura")
    conteudo = ""
    contador = 0
    for(image of imagens){
        if(image != imagens.item(posicao)){ image.style.left = "-600px"; }
        else {
            imagens.item(0).style.left = 0;
        }
        conteudo += `
            <div class='divMini' id='dm${contador}'>
                <div class='imgMini' style="background:url('${image.src}');background-position: 0 0;background-repeat: no-repeat;background-size: 100% 100%;"></div>
                ${contador+1}
            </div>`
        contador++
    }
    containerMiniatura.innerHTML += conteudo
    document.getElementById('dm0').style.border = "thin solid red"

    let divsMini = document.querySelectorAll('.divMini')
    for(div of divsMini){
        div.addEventListener('click',(e) => {
            mover(e.srcElement.id.replace("dm",""));
        })
    }

    let btnCotrolers = document.querySelectorAll(".containerImg button")
    btnCotrolers[0].onclick = () => {
        clearInterval(altomatico)
        avancar()        
    }
    btnCotrolers[1].onclick = () => {
        clearInterval(altomatico)
        voltar()
    }
    function mover(imgId){

        if(mudar){

            clearInterval(altomatico)

            mudar = false;

            imagens.item(atual).style.transition = time + 'ms';
            imagens.item(atual).style.left = '-600px';

            imagens.item(imgId).style.transition = '0ms';
            imagens.item(imgId).style.left = '600px';

            setTimeout(function(){ 
                imagens.item(imgId).style.transition = time + 'ms';
                imagens.item(imgId).style.left = '0px';
                    
                atual = imgId
                imgId++
                
                if(imgId > imagens.length -1) imgId = 0
                console.log(imgId)
                
                posicao = imgId
                mudar = true

            },0)



            /*for(image of imagens){

                if(image != imagens.item(atual)){
                    image.style.transition = '0ms';
                    image.style.left = '600px';
                }
            }

            setTimeout(function(){

                imagens.item(atual).style.transition = time + 'ms';
                imagens.item(atual).style.left = '-600px';

                imagens.item(imgId).style.transition = time + 'ms';
                imagens.item(imgId).style.left = '0px';

            },1)

            setTimeout(function(){ 
                imagens.item(posicao).style.transition = '0ms';
                mudar = true; 
            },time++)

            console.log("Atual: " + atual + "Index: " + imgId)

            atual = imgId*/
        }
    }
    function avancar(){

        if(mudar){

            mudar = false;
            
            for(image of imagens){
                image.style.transition = '0s';
            }
            for(image of imagens){
                if(image != imagens.item(posicao)){ 
                    image.style.left = "-600px";
                }
                document.getElementById('dm'+(posicao)).style.border = "thin solid blue"
            }
            setTimeout(function(){

                imagens.item(posicao).style.transition = time + 'ms';
                imagens.item(posicao).style.left = '600px';

                posicao--            
                if(posicao < 0) posicao = imagens.length - 1

                document.getElementById('dm'+(posicao)).style.border = "thin solid red"
                
                imagens.item(posicao).style.transition = time + 'ms';
                imagens.item(posicao).style.left = '0px';

                atual = posicao

            },1)
            setTimeout(function(){ 
                imagens.item(posicao).style.transition = '0ms';
                mudar = true; 
            },time++)
        }
    }
    function voltar(){

        if(mudar){            

            mudar = false;
            
            for(image of imagens){
                image.style.transition = '0s';
            }

            for(image of imagens){
                if(image != imagens.item(posicao)) image.style.left = "600px";
                document.getElementById('dm'+(posicao)).style.border = "thin solid blue"
            }
            setTimeout(function(){

                imagens.item(posicao).style.transition = time + 'ms';
                imagens.item(posicao).style.left = '-600px';
                
                posicao++            
                if(posicao > imagens.length - 1) posicao = 0                
                
                document.getElementById('dm'+(posicao)).style.border = "thin solid red"

                imagens.item(posicao).style.transition = time + 'ms';
                imagens.item(posicao).style.left = '0px';

                atual = posicao

            },1)
            setTimeout(function(){
                imagens.item(posicao).style.transition = '0ms';
                mudar = true; 
            },time++)
        }
    }

    document.onkeyup = (e) =>{ 
        if(e.key == "ArrowRight"){ voltar() }
        if(e.key == "ArrowLeft"){ avancar() }    
    }    
}