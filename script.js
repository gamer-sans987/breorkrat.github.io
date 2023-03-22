function sleep(ms) {  return new Promise(resolve => setTimeout(resolve, ms)) }

		var er = new Audio('./assets/audio/er.mp3')
        var song = new Audio('assets/audio/song.mp3')
        let select = new Audio('assets/audio/select.mp3')
        let click = new Audio('assets/audio/click.mp3')
        let sans = document.getElementById('sans');
        //var bt = window.document.getElementById('bt')
        var cx = document.getElementById('cx')
        var dv = document.getElementById('dv')

        console.log(window.innerWidth)
        if(window.innerWidth < 577)
        {
            dv.innerHTML = "É recomendado que você rotacione o dispositivo"
        }
        
        var footer = window.document.getElementById('footer')
        footer.addEventListener('mouseover', menter)
        footer.addEventListener('mouseout', mout)
        footer.addEventListener('click', mclick)

        //var webhook = "https://ptb.discord.com/api/webhooks/1087122123048353923/AYU8aCh9zEoOXt-rNntapQRsiHP9n4F3Ql-fLu_ml4wNFyiWOI9XYlyvW5rgB1oG92gL"
        let txt;
        let para, falando = false;

        cx.addEventListener('keydown',  async (verif) => {

            //Isso é um RegEx, onde ele procura por letras de A-Z em maiúsculo e minúsculo, e caracteres de "! à @" em unicode, o que inclui os números
            if (/^[A-Za-z!-@À-Üá-ü]*$/.test(verif.key) == false) return;
            if (verif.key != "Enter") tocarMúsica()

            //Cancela a fala caso ele já esteja falando
            if (verif.key == "Enter") {
                if (falando == true) 
                {
                    para = true;
                    return;
                }             
                falar(txt)
                /*if(box.checked == true){
                    enviarmsg(cx.value)
                }*/  
            }
        })

        function enviarmsg() {
            if (cx.value.length <= 2000) {
                var msg = {
                    "content": cx.value
                }
                fetch(webhook, {
                    body: JSON.stringify(msg),
                    headers: {
                      "Content-Type": "application/json",
                    },
                    method: "POST",
                  })
                    .then(function (res) {
                      console.log(res);
                    })
                    .catch(function (res) {
                      console.log(res);
                    });
            }
        }

        let tempo = 0;
        let looping = false;

        async function falar(txt)
        {
            //Limpa o campo de fala
            dv.innerHTML = ""
            txt = cx.value.split("")
            er.play();
            falando = true;
            for (let i = 0; i < txt.length; i++)
            {
                //Cancela caso receba um sinal para parar
                if (para == true)
                {
                    //Reinicia a parte da fala
                    falando = false
                    para = false
                    falar(txt)
                    return;
                }
                //Escreve letra por letra tocando o áudio
                dv.innerHTML += `${txt[i]}`
                if (txt[i] !== " ") {
                    er.currentTime = 0.001;
                    er.play();
                }
                await sleep(35)
            }
            falando = false;
        }
        async function tocarMúsica()
        {
            //Coloca o limite de tempo em 2s
            tempo > 2 ? tempo == 2 : tempo += 2

            //Só começa a tocar caso a música esteja pausada
            if(song.paused == true) {
                song.play()
                sans.src = "./assets/imagens/passinho.webp"
            }

            //Não passa por cima do *while* caso ele já esteja em execução,
            //apenas o incrementa
            if (looping) return;

            //Sinaliza que um looping começou, decrementa em tempo a cada 0.1 segundos
            looping = true;
            while (tempo > 0)
            {
                tempo--;
                await sleep(100)
            }
            looping = false;
            song.pause()
            sans.src = "./assets/imagens/sans.png"
        }

        function mclick(){
            window.open("https://discord.gg/XXNQW7zdfc")
            click.play();
        }

        function menter(){
            footer.style.backgroundImage = "url('./assets/imagens/act2.png')"
            select.play()
        }

        function mout(){
            footer.style.backgroundImage = "url('./assets/imagens/act.png')"
        }
