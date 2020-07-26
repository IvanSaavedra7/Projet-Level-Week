
function PreencherUf(){

    const Ufselect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) => {return res.json()} /*res =>res.json()*/ )
    .then((estado) =>{

        for(const estados of estado) // PEGARA UM ESTADO E COLOCARA NA VARIALVE ESTADO UM POR UM
        {
            Ufselect.innerHTML += `<option value="${estados.id}">${estados.nome}</option>`
        }
    })

}

PreencherUf();

function getCidades(event){

    const Cityselect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const estado = event.target.value // pega o valor numero event que bem do uf

    const index = event.target.selectedIndex
    stateInput.value = event.target.options[index].text // isso é para enviar o nome da cidade n o numero dela

    Cityselect.innerHTML = `<otions value="">Selcione a cidade</option` // LIMPA O CAMPO ANTES DE INSERIR OS ESTADOS
    Cityselect.disabled = true

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`

    fetch(url)
    .then( (res) => {return res.json()} /*res =>res.json()*/ )
    .then((citys) =>{

        for(const city of citys) 
        {
            Cityselect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        Cityselect.disabled = false //  deixa editavel o campo

    })

}


document
.querySelector("select[name=uf]")// procura um certo elemento do HTML com um certo nome
.addEventListener("change", getCidades) // n colocamos "()" para so chmar o metodo quando evento ocorrer


// ficara atento a qualquer mudança do documento
// (carregamento da pagina, click de algo) edps executara um função
// () => {} ---  isso ao lado é uma função '()' é o paramentro, e dentro do '{}' é o metodo


////////////////////////////////////////////// METODOS ABAIXO PARA SELECIONAR OS MAETERIAIS

const itens = document.querySelectorAll(".itens-grid li")
/// ira verificar item por item da lista de materiais e ver se ele foi clkicado
for(const item of itens){
    item.addEventListener("click", SelecaoItem)
}

 let listaItens = []

 const colecaoItens = document.querySelector("input[name=items]")

function SelecaoItem(event){

   

    const qualCaixa = event.target // pega o campo html

    
    qualCaixa.classList.toggle("select")//adiciona ou remove um classe css em algum elemento html
                                        //toggle vai procurar o select se tiver ele coloca senao nao

    const IdCaixa = qualCaixa.dataset.id // pega o id do elemento selecionado

    // ver se algo foi selecionao, e se sim qual foi selecionado
    // retorna true se o que tem no vetor é o msm do q foi selecionado
    const alreadyselect = listaItens.findIndex( item => {
        const eDiferente = item == IdCaixa
        return eDiferente
    }
    )
    
    

    // se ja estiver selecionado
    if( alreadyselect >= 0){
        //tirar da seleção
        const filtrarItem = listaItens.filter( item =>{
            const itemEdiferente = item != IdCaixa
            return itemEdiferente
        })
        listaItens = filtrarItem      
    } else {
        // se nao estiver selecionado sdicionar a seleção
        listaItens.push(IdCaixa)
    }

    // atulizar no botao escondido com  os itens selecionados

    colecaoItens.value = listaItens

}


///////////////////////////////////////


