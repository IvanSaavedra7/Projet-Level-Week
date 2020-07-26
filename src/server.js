const express = require("express")
const server = express()

//pegar o banco
const db = require("./database/db")

// configurar pasta publica // 'use' abaixo é para configurar o servidor
// static é uma função q espera um argumento que configrara a  public
server.use(express.static("public"))

//habilitar o usso do req.body na aplicação
server.use(express.urlencoded({ extended: true }))

// utilizando nunjucks
// full mvc  = usa fronRnd e Backend
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
    // nocache ele salva alguma coisas na memorias pra ser mais rapido
})
// eu liguei o nunjucks ao exprexx

// configurara caminhos na minha aplicação
// pagina inicial
// req: requisição ou seja pedido
// res: respostas
server.get("/", function (req, res) {
    return res.render("index.html") // dirname é uma variavel global q serve para devolver qual diretorio eu estou a src
    // vai fazer o nuncks pelo motor do nunjucks
})

server.get("/create-point", function (req, res) {

    // para pegar os dados do formulario eu usarei o req 
    // q foi a requisação do sevidor para oc cliente
    // req.query: query string da nossa url

    //req.query
    console.log(req.query)

    return res.render("create-point.html") // dirname é uma variavel global q serve para devolver qual diretorio eu estou a src

})


// nesse momento eu vou usar o post para enviar o formulario de uma forma mais escondida
// para que as informações nao apareecm na url
// com o post abaixo qunado enviarmos nosso formulario nos iremos para outra pagina
server.post("/savepoint", (req, res) => {

    // inserir dados dps
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?); `

    //req.body: O corpo do nosso formulario, usso ele para pegar os dados do formulario pelo post
    //inserir dados no banco
    const values = [req.body.image, req.body.name, req.body.address,
    req.body.address2, req.body.state, req.body.city, req.body.items,]

    function afterInsertData(err) {
        if (err) {
            return console.log(err)
        }
        console.log("cadastrado com sucesso")
        console.log(this) // this nao funciona em arrow function
        return res.render("create-point.html", { saved: true }) // envia o ok so se a iseriu direito os dados
    }

    // o terceiro parametro do run é um callback, q vai rodau uma função
    db.run(query, values, afterInsertData)  // err é como expection erro de java e se usa no cacth

    
})

server.get("/search", function (req, res) {

    // abaixo um fiz uma operação para nao mostrar resultados se a pesquisa for vazia

    const search = req.query.search
    if(search == ""){
        return res.render("search-results.html", {total:0 })
    }

    // pegar os dados do banco de dados

    //o like q eu coloquei abaixo e as porcentagens vao fazer eu procurar qualquer coisa q tenha esse litras na sua formação
    // como eu pesuisar por "camp" mais ele colocara como resultado "campinas" pois é aproximado
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%' `, function (err, rows) {

        if (err) { return console.log(err) }

        console.log("aqui estao os registros")
        console.log(rows)

        const total = rows.length

        // mostrar a pagina html com os dados no banco
        return res.render("search-results.html", { places: rows, total })  //ussando nunjucks eu passo o valor do plasces 
        // para o html cmo uma variavel e troco la msm

    })


})

// o eu instaleu nunjucks q deixa o html mais inteligente como um html

// ligar o servidor
server.listen(3000)