import { Router } from 'express'

import carrinhoController from '../carrinho/carrinho.controller.js'
import produtosController from '../produtos/produtos.controller.js'
import usuariosController from '../usuarios/usuarios.controller.js'

const rotas = Router()

// Rotas do Carrinho
//rotas.get('/carrinhos', carrinhoController.listar)
//rotas.post('/carrinho',carrinhoController.adicionarItem)

// Rotas dos produtos
rotas.post('/produtos', produtosController.adicionar)

rotas.post('/adicionarItem', carrinhoController.adicionarItem)
//rotas.post('/removerItem', carrinhoController.removerItem)
//rotas.get('/carrinho/:UsuarioID', carrinhoController.adicionar)
export default rotas