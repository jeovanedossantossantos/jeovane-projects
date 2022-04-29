function verificar(){
    var data = new Date()
    var data_atual = data.getFullYear()
    var ano = window.document.querySelector('input#ano')
    var res = window.document.getElementById('res')
    
    

    //var Ano = Number(ano.value)
    if (ano.value.length == 0 || ano.value > ano){
        window.alert('[Erro] Prencha os dados e tente novamente')
    }else{
        var fsex = document.getElementsByName('tSexo')
        var idade = (data_atual - Number(ano.value))
        var gênero = ''
        //criando dinamicamente
        var img = document.createElement('img')
        img.setAttribute('id', 'foto')
        if(fsex[0].checked){
            gênero = 'Homeme'
            
            if(idade >=0 && idade <10){
                img.setAttribute('src','menino.png')
                //window.alert("entrou")
            }else if(idade < 21){
                img.setAttribute('src','jovem_home.png')
            }else if(idade < 50){
                img.setAttribute('src','homem_mais_de_30.png')
            }else{
                img.setAttribute('src','idoso.png')
            }
           
        }else if(fsex[1].checked){
            gênero = 'Mulher'
            if(idade >=0 && idade <10){
                img.setAttribute('src','menina.png')
            }else if(idade < 21){
                img.setAttribute('src','jovem_mulher.png')
            }else if(idade < 50){
                img.setAttribute('src','mulher_mais_de_30.png')
            }else{
                img.setAttribute('src','idosa.png')
            }
            
        }
        res.style.textAlign = 'center'
        res.innerHTML = `Detectamos ${gênero} com ${idade} anos.`
        res.appendChild(img)//adicionando na pagina
    }

}
