window.onload = function(){

    let posicao = 0;
    let imagens = document.querySelectorAll(".containerImg img");
    let mudar = true;
    let time  = 2000;
    let altomatico;

    document.querySelectorAll(".containerImg").item(0).addEventListener("mouseover",()=>{
        clearInterval(altomatico)
    })
    document.querySelectorAll(".containerImg").item(0).addEventListener("mouseout",()=>{
        altomatico = setInterval(voltar,time++)
    })
    for(image of imagens){
        if(image != imagens.item(posicao)){ image.style.left = "-600px"; }
        else {
            imagens.item(0).style.left = 0;
        }
    }

    let btnCotrolers = document.querySelectorAll(".containerImg button")
    btnCotrolers[0].onclick = () => {
        clearInterval(altomatico)
        avancar()
        setTimeout(()=>{
            altomatico = setInterval(voltar,time++)
        },time++)
        
    }
    btnCotrolers[1].onclick = () => {
        clearInterval(altomatico)
        voltar()
        setTimeout(()=>{
            altomatico = setInterval(voltar,time++)
        },time++)
    }

    function avancar(){

        if(mudar){

            mudar = false;
            
            for(image of imagens){
                image.style.transition = '0s';
            }

            for(image of imagens){
                if(image != imagens.item(posicao)){ image.style.left = "-600px"; }
            }
            setTimeout(function(){

                imagens.item(posicao).style.transition = time + 'ms';
                imagens.item(posicao).style.left = '600px';

                posicao++            
                if(posicao > imagens.length - 1) posicao = 0
                
                imagens.item(posicao).style.transition = time + 'ms';
                imagens.item(posicao).style.left = '0px';

            },1)
            setTimeout(function(){
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
                if(image != imagens.item(posicao)){ image.style.left = "600px"; }
            }
            setTimeout(function(){

                imagens.item(posicao).style.transition = time + 'ms';
                imagens.item(posicao).style.left = '-600px';

                posicao--            
                if(posicao < 0) posicao = imagens.length - 1
                
                imagens.item(posicao).style.transition = time + 'ms';
                imagens.item(posicao).style.left = '0px';

            },1)
            setTimeout(function(){
                mudar = true;
            },time++)
        }
    }

    document.onkeyup = (e) =>{       

        if(e.key == "ArrowRight"){
            voltar()            
        }
        if(e.key == "ArrowLeft"){
            avancar()          
        }
        
    }

    altomatico = setInterval(voltar,time++)
}