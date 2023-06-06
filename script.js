window.onload = function(){

    let posicao = 0;
    let proxima;
    let containerAll = document.querySelectorAll(".containerImg").item(0);
    containerAll.innerHTML += `
        <div id="containerMiniatura"></div>
        <button class="btnsControler voltar">&#9668;</button>
        <button class="btnsControler avancar">&#9658;</button>
    `;
    let imagens = document.querySelectorAll(".containerImg img");
    let btns = document.querySelectorAll(".containerImg button");
    let mudar = mudar2 = true;
    let time  = 4000;
    let autoPlay = 0;
    let entrada = true

    containerAll.addEventListener("mouseout",()=>{
        autoPlay = setInterval(avancar,time)
    })
    containerAll.addEventListener("mouseover",()=>{
        clearInterval(autoPlay)
    })
    window.addEventListener("blur",()=>{
        clearInterval(autoPlay)
    })
    window.addEventListener("focus",()=>{
        if(!entrada) autoPlay = setInterval(avancar,time)
    })

    for(img of imagens){ 
        img.style.left = "-100%"
        img.onclick = function(e){
            if(e.srcElement.getAttribute("data-url") != null){
                if(e.srcElement.getAttribute("data-linkMode") == null)
                    window.location = e.srcElement.getAttribute("data-url")
                else
                    window.open(e.srcElement.getAttribute("data-url"), e.srcElement.getAttribute("data-linkMode"))
            }
        }
    }
    imagens[posicao].style.transition = '0s';
    imagens[posicao].style.left = '0';

    function ajusteValor(valor){
        if(valor < 0){ valor = imagens.length - 1 }
        if(valor > imagens.length -1){ valor = 0 }
        return valor
    }

    btns[0].onclick = () => voltar()
    btns[1].onclick = () => avancar()
    
    function avancar(next){        

        let contador1 = 0;
        for(img of imagens){
            if(img.style.left == "0px") {
                posicao = contador1
                img.style.zIndex = '2'
            } else {
                img.style.zIndex = '1'
            }

            contador1++;
        }
        //alert(" atual " + atual + " posicao " + posicao + " proxima " + proxima + " next " + next )
        if(next == posicao) mudar2 = false
        else mudar2 = true
        
        if(mudar && mudar2){

            entrada = false
            mudar = false

            if(next == undefined){
                proxima = ajusteValor(posicao + 1)
            } else {
                proxima = next.replace('dm','')
            }

            imagens[posicao].style.transition = '0s';
            imagens[posicao].style.left = '0';
            imagens[proxima].style.transition = '0s';
            imagens[proxima].style.left = '100%';

            let botoesGuia = document.querySelectorAll('.divMini')
            for(botao of botoesGuia){ botao.style.border = "thin solid blue" }
            botoesGuia[proxima].style.border = "thin solid red"

            setTimeout(()=>{
                imagens[posicao].style.transition = '1s';
                imagens[posicao].style.left = '-100%';
                imagens[proxima].style.transition = '1s';
                imagens[proxima].style.left = '0';
                posicao = ajusteValor(posicao + 1);
                mudar = true
            },100)
        }
    }
    function voltar(){

        let contador1 = 0;
        for(img of imagens){
            if(img.style.left == "0px") posicao = contador1
            contador1++;
        }

        if(mudar){

            mudar = false

            proxima = ajusteValor(posicao - 1)

            imagens[posicao].style.transition = '0s';
            imagens[posicao].style.left = '0';
            imagens[proxima].style.transition = '0s';
            imagens[proxima].style.left = '-100%';

            let botoesGuia = document.querySelectorAll('.divMini')
            for(botao of botoesGuia){ botao.style.border = "thin solid blue" }
            botoesGuia[proxima].style.border = "thin solid red"

            setTimeout(()=>{
                imagens[posicao].style.transition = '1s';
                imagens[posicao].style.left = '100%';
                imagens[proxima].style.transition = '1s';
                imagens[proxima].style.left = '0';
                posicao = ajusteValor(posicao - 1);
                mudar = true
            },100)
        }
    }
    
    let containerMiniatura = document.getElementById("containerMiniatura")
    conteudo = ""
    contador = 0
    
    for(image of imagens){
        
        conteudo += `
            <div class='divMini' id='dm${contador}'>
                <div class='imgMini' style="
                    background:url('${image.src}');
                    background-position: 0 0;
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                "></div>
                ${contador+1}
            </div>
        `;

        contador++
    }
    
    containerMiniatura.innerHTML = conteudo
    document.getElementById('dm0').style.border = "thin solid red"

    let botoesGuia = document.querySelectorAll('.divMini')
    for(botao of botoesGuia){
        
        botao.onclick = function(e){
            for(botao of botoesGuia){ botao.style.border = "thin solid blue" }
            avancar(e.srcElement.id.replace('dm',''))
            this.style.border = "thin solid red"
        }
    }

    autoPlay = setInterval(avancar,time)

    document.onkeyup = (e) =>{ 
        if(e.key == "ArrowRight"){ avancar() }
        if(e.key == "ArrowLeft") { voltar()  }  
    }
}    

