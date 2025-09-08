import express from 'express'
import mysql from 'mysql2/promise'
import 'dotenv/config'

const app = express()
app.get('/', async (req, res ) => {
    if(process.env.DBHOST === undefined){
        res.status(500).send('ERRO: DBHOST não está definido nas variáveis de ambiente!')
        return
    }
    if(process.env.DBUSER === undefined){
        res.status(500).send('ERRO: DBUSER não está definido nas variáveis de ambiente!')
        return
    }
    if(process.env.DBPASSWORD === undefined){
        res.status(500).send('ERRO: DBPASSWORD não está definido nas variáveis de ambiente!')
        return
    }
    if(process.env.DBDATABASE === undefined){
        res.status(500).send('ERRO: DBDATABASE não está definido nas variáveis de ambiente!')
        return
    }
    if(process.env.DBPORT === undefined){
        res.status(500).send('ERRO: DBPORT não está definido nas variáveis de ambiente!')
        return
    }
    try {
        const conn = await mysql.createConnection({
            host: process.env.DBHOST,
            user: process.env.DBUSER,
            password: process.env.DBPASSWORD,
            database: process.env.DBDATABASE,
            port: Number(process.env.DBPORT)
        })
        res.send('Conectado ao banco de dados com sucesso!')
    }
    catch (err) {
        if(err instanceof Error == false){
            res.status(500).send('Erro desconhecido ao conectar ao banco de dados')
            return
        }
        const error = err as Error
        res.status(500).send('Erro ao conectar ao banco de dados: ' + err.message)
    }
})
/*
    ->  /produtos
Tarefa: Criar uma rota get para produtos que retorne a lista de produtos do banco de dados
O produto deve ter id, nome, preco, urlfoto, descricao
Deve-se criar uma tabela no banco de dados AIVEN para armazenar os produtos
A resposta deve ser um array de produtos em formato json
Crie o código sql para criar a tabela de produtos

CREATE TABLE produtos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    urlfoto VARCHAR(255) NOT NULL,
    descricao TEXT
);
Faz pelo menos 3 inserções nessa tabela
*/

app.listen(8000, () =>{
    console.log('Servidor rodando na porta: 8000')
})
app.get('/produtos', async (req, res) => {
    if(process.env.DBHOST === undefined){
        res.status(500).send('ERRO: DBHOST não está definido nas variáveis de ambiente!')
        return
    }
    if(process.env.DBUSER === undefined){
        res.status(500).send('ERRO: DBUSER não está definido nas variáveis de ambiente!')
        return
    }
    if(process.env.DBPASSWORD === undefined){
        res.status(500).send('ERRO: DBPASSWORD não está definido nas variáveis de ambiente!')
        return
    }
    if(process.env.DBDATABASE === undefined){
        res.status(500).send('ERRO: DBDATABASE não está definido nas variáveis de ambiente!')
        return
    }
    if(process.env.DBPORT === undefined){
        res.status(500).send('ERRO: DBPORT não está definido nas variáveis de ambiente!')
        return
    }
    try {
        const conn = await mysql.createConnection({
            host: process.env.DBHOST,
            user: process.env.DBUSER,
            password: process.env.DBPASSWORD,
            database: process.env.DBDATABASE,
            port: Number(process.env.DBPORT)
        })
        const [dados] = await conn.query("SELECT * FROM produtos")
        res.json(dados)
    }
    catch (err) {
        if(err instanceof Error == false){
            res.status(500).send('Erro desconhecido ao conectar ao banco de dados')
            return
        }
        const error = err as Error
        res.status(500).send('Erro ao conectar ao banco de dados: ' + err.message)
    }
})
