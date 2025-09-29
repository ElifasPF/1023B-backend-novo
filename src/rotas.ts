import {Router} from 'express'

import carrinhoController from './carrinho/carrinho.controller.js'
import produtosController from './produtos/produtos.controller.js'

const rotas = Router()

// Rotas do Carrinho
rotas.get('/carrinhos',carrinhoController.listar)
//rotas.post('/carrinho',carrinhoController.adicionarItem)

// Rotas dos produtos
rotas.get('/produtoslistagem',produtosController.listar)
rotas.post('/produtos',produtosController.adicionar)

rotas.post('/adicionarItem', carrinhoController.adicionarItem)

export default rotas