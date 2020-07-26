const botaoDePesquisa = document.querySelector("#page-home main a")
const css = document.querySelector("#modal")
const modal = document.querySelector("#modal .header a")

botaoDePesquisa.addEventListener("click",AbrirJanelaDePesquisa)

function AbrirJanelaDePesquisa(){   
    css.classList.remove("hide")
}

modal.addEventListener("click",() =>{
    css.classList.add("hide")
})