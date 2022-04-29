function contar(){
    let inicio = document.getElementById("inicio")
    let fim = document.getElementById("fim")
    let passo = document.getElementById("passo")
    var res = document.getElementById("res")
    var p = Number(passo.value)
    if(inicio.value.length == 0 || fim.value.length == 0|| passo.value.length == 0){
        res.innerHTML = "Impossivel contar"
        window.alert('[ERRO] Faltam dados!')  
        
    }else{
        res.innerHTML = "Contando: <br>"
        if(Number(passo.value) == 0){
            window.alert("Passo invalido! Considerando PASSO 1")
            p = 1
        }
        if(Number(inicio.value) < Number(fim.value)){
            for(var i =Number(inicio.value); i<Number(fim.value); i+=p){
                res.innerHTML += ` ${String(i)} \u{1F449}`
            }
            
        }else{
            for(var i =Number(inicio.value); i>= Number(fim.value); i-=p){
                res.innerHTML += ` ${String(i)} \u{1F449}`
            }
            
        }
        res.innerHTML += `\u{1F3C1}`
    }
    

}