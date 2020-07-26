// importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose() // verbose vai configurar para eu ter informações sobre meu terminal

// criar o objeto que ira fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db
// estou exportando o banco acima



// // utilizando o objeto de banco de dados, para nossas operações
// db.serialize(() => {  // serialize vai rodar uma sequencia de codigos
// // criar tabela
// // db.run(`
// //     CREATE TABLE IF NOT EXISTS places (
// //         id INTEGER PRIMARY KEY AUTOINCREMENT,
// //         image TEXT,
// //         name TEXT,
// //         address TEXT,
// //         address2 TEXT,
// //         state TEXT,
// //         city TEXT,
// //         items TEXT
// //     );
// // `)

// // // inserir dados dps
// //  const query = `
// //         INSERT INTO places (
// //             image,
// //             name,
// //             address,
// //             address2,
// //             state,
// //             city,
// //             items
// //         ) VALUES (?,?,?,?,?,?,?); `

// // const values = ["https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1101&q=80",
// // "Papersider",
// // "Guilherme Gemballa, Jardim America",
// // "n° 260",
// // "Santa Catarina",
// // "Rio do sul",
// // "Residuos eletrônicos, Lâmpadas"]

// // function afterInsertData(err){
// //     if(err){
// //         return console.log(err)
// //     }
// //     console.log("cadastrado com sucesso")
// //     console.log(this) // this nao funciona em arrow function
// // }

// // // o terceiro parametro do run é um callback, q vai rodau uma função
// // db.run(query, values, afterInsertData)  // err é como expection erro de java e se usa no cacth
   
// // consultar dados dps // rows seram os registros da tabela na lista pois sao tods ou se ja muitos
// // db.all("SELECT name FROM places where state='Santa Catarina' ",function(err,rows){
// //     if(err){
// //         return console.log(err)
// //     }
// //     console.log("aqui estao os registros")
// //     console.log(rows)
// // })

// // deletar um dado da tabela

// db.run(`DELETE FROM places WHERE id=?`,[1], function(err){
//     if(err){
//         return console.log(err)
//     }
//     console.log("Registro excluido com sucesso")
// })



// })



