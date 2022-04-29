/**
 * Elementos
 */

let container = document.getElementById("container")
let nome = document.getElementById("cronosName")
let linkImagem = document.getElementById("cronosImage")
let descricao = document.getElementById("cronosDes")
let nomeED = document.getElementById("cronosNameED")
let linkImagemED = document.getElementById("cronosImageED")
let descricaoED = document.getElementById("cronosDesED")
let tbody = document.getElementById("tbody")


// Estanciando um Array e um objeto do tipo localStorage e convertendo ele para um JSON
let itens = new Array()
if (localStorage.hasOwnProperty("itens")) {
    itens = JSON.parse(localStorage.getItem("itens"))
}

// Variavel global para verificar o nome do curso (key = chave)
let key = ''

// Função que recebe o nome do curso 
function setNameEdicao(key) {
    this.key = key
    this.keyEditor = 1
}
// Função que pega a o nome do curso 
function getNameEdicao() {
    return this.key
}

// Função que exclui os cursos


function excluir(key) {

    // let lista = []
    let ob = JSON.parse(localStorage.getItem(localStorage.key(0)));

    if (localStorage.hasOwnProperty("itens")) {
        itens = JSON.parse(localStorage.getItem("itens"))
    }
    let novoOb = []
    if (localStorage.length > 0) {
        for (var i = 0; i < ob.length; i++) {
            // console.log(localStorage.getItem(localStorage.key(i)));
            // console.log(key)
            if (key === ob[i].name) {
                // console.log(ob[i].name)
                delete ob[i];
                Toastify({
                    text: "Excluido com sucesso!",
                    className: "info",
                    style: {
                        background: "red",
                    },
                    duration: 3000
                }).showToast();
                break

            }

        }
        for (let i = 0; i < ob.length; i++) {
            if (ob[i] !== undefined) {
                novoOb.push(ob[i])

            }
        }
        localStorage.setItem("itens", JSON.stringify(novoOb))

        listarTabela()


    }
}



function delay(n) {
    return new Promise(function(resolve) {

        setTimeout(resolve, n * 1000);
    });
}
// Está função é a que salva os novos curso e salva as edições de cada curso 
async function salvar() {





    let tipo = ''
    let ob = JSON.parse(localStorage.getItem(localStorage.key(0)));

    let novoOb = []

    if (localStorage.length > 0 && getNameEdicao() !== undefined) {

        if ((nomeED.value !== '') && (descricaoED.value !== '') && (linkImagemED.value !== '')) {
            for (var i = 0; i < ob.length; i++) {
                if (getNameEdicao() === ob[i].name) {

                    ob[i].name = nomeED.value
                    ob[i].image = linkImagemED.value
                    ob[i].descricao = descricaoED.value


                    break

                }

            }
        } else {
            alert("Prencha os campos Editar!")
        }
        for (let i = 0; i < ob.length; i++) {
            if (ob[i] !== undefined) {
                novoOb.push(ob[i])

            }
        }

        localStorage.setItem("itens", JSON.stringify(novoOb))

        nomeED.value = ""
        descricaoED.value = ""



    } else {
        for (let i = 0; i < ob.length; i++) {
            if (ob[i] !== undefined) {
                novoOb.push(ob[i])

            }
        }
        if ((nome.value !== '') && (descricao.value !== '') && (linkImagem.value !== '')) {
            novoOb.push({
                name: nome.value,
                image: linkImagem.value,
                descricao: descricao.value
            })

            tipo = "salva"




        } else {
            alert("Prencha os campos!")
        }

        localStorage.setItem("itens", JSON.stringify(novoOb))


    }

    listarTabela()






}

// Função que chama o modal para fazer a edição 
function editar(key) {
    setNameEdicao(key)

    let nomeCurso = document.getElementById('cronosNameED');
    let imagemCurso = document.getElementById('cronosImageED');
    let descricaoCurso = document.getElementById('cronosDesED');

    let cursos = JSON.parse(localStorage.getItem('itens'));

    let cursosAux = cursos.filter((item) => {
        return item.name === key
    })
    let cursoAlvo = cursosAux[0];

    nomeCurso.value = cursoAlvo.name;
    imagemCurso.value = cursoAlvo.image;
    descricaoCurso.value = cursoAlvo.descricao;

    $('#edicao').modal('show'); //use JQuery
}

// Função que vai mostra todas os cursos
function listarTabela() {





    tbody.innerHTML = ""
    if (itens.length === 0) {
        itens.push({
            name: "Desenvolvimento Web",
            image: "imagens/ilustra-web.png",
            descricao: "Consequatur debitis ipsa numquam illum placeat quod deleniti."
        })
        itens.push({
            name: "Marketing Digital",
            image: "imagens/ilustra-marketing.png",
            descricao: "Consequatur debitis ipsa numquam illum placeat quod deleniti."
        })

        itens.push({
            name: "Consultoria UX",
            image: "imagens/ilustra-ux.png",
            descricao: "Consequatur debitis ipsa numquam illum placeat quod deleniti."
        })
        localStorage.setItem("itens", JSON.stringify(itens))
    }

    let lista = []
    if (localStorage.length > 0) {
        for (var i = 0; i < localStorage.length; i++) {

            lista.push(localStorage.getItem(localStorage.key(i)))

        }

        let ob = JSON.parse(lista);

        for (let i = 0; i < ob.length; i++) {


            let tr = tbody.insertRow();

            let tdNome = tr.insertCell();
            let tdImg = tr.insertCell();
            let tdDesc = tr.insertCell();
            let tdBotoes = tr.insertCell();

            tdNome.innerText = ob[i].name;


            let addImagem = document.createElement('img');
            addImagem.src = ob[i].image;
            // addImagem.src = URL.createObjectURL(linkImagem)
            tdImg.appendChild(addImagem);

            tdDesc.innerText = ob[i].descricao;

            let botaEdicao = document.createElement("BUTTON")
            botaEdicao.appendChild(document.createTextNode('editar'))
            botaEdicao.classList.add("btn")
            botaEdicao.classList.add("btn-secondary")
            botaEdicao.classList.add("m-1")
            botaEdicao.setAttribute("onclick", `editar('${ob[i].name}')`)



            tdBotoes.appendChild(botaEdicao)

            let botaExcluir = document.createElement("BUTTON")
            botaExcluir.appendChild(document.createTextNode('Excluir'))
            botaExcluir.classList.add("btn")
            botaExcluir.classList.add("btn-danger")
            botaExcluir.classList.add("m-1")
            botaExcluir.setAttribute("onclick", `excluir('${ob[i].name}')`)



            tdBotoes.appendChild(botaExcluir)



        }

    } else {
        alert("Erro!")
    }


}

listarTabela()