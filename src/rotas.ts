import {Router} from 'express'

import carrinhoController from './carrinho/carrinho.controller.js'
import produtosController from './produtos/produtos.controller.js'
import usuariosController from './usuarios/usuarios.controller.js'

const rotas = Router()

// Rotas do Carrinho
rotas.get('/carrinhos',carrinhoController.listar)
//rotas.post('/carrinho',carrinhoController.adicionarItem)

// Rotas dos produtos
rotas.get('/produtoslistagem',produtosController.listar)
rotas.post('/produtos',produtosController.adicionar)

rotas.post('/adicionarItem', carrinhoController.adicionarItem)

rotas.post('/adicionarUsuario',usuariosController.adicionar)
rotas.post('/login', usuariosController.login)

export default rotas