import { Request, Response } from "express";
import { db } from '../database/banco-mongo.js'
import { ObjectId } from 'bson';


interface ItemCarrinho {
    produtoId: string;
    quantidade: number;
    precoUnitario: number;
    nome: string;
}

interface Carrinho {
    usuarioId: string;
    itens: ItemCarrinho[];
    dataAtualizacao: Date;
    total: number;
}
class CarrinhoController {
    //adicionarItem
    async adicionarItem(req:Request, res:Response) {
        const { usuarioId, produtoId, quantidade } = req.body;
        //Buscar o produto no banco de dados
        const produto = await db.collection('produtos').findOne({ _id: ObjectId.createFromHexString(produtoId)});
        if (!produto) {
            return res.status(404).json({ mensagem: 'Produto não encontrado' });
        }
        //Pegar o preço do produto
        //Pegar o nome do produto
        const precoUnitario = produto.preco; // Supondo que o produto tenha um campo 'preco'
        const nome  = produto.nome; //Supondo que o produto tenha um campo 'nome'
        
        // Verificar se um carrinho com o usuário já existe
        const carrinho = await db.collection('carrinhos').findOne({ usuarioId: ObjectId.createFromHexString(usuarioId) }) as Carrinho | null;
        if (!carrinho) {
            // Se não existir, criar um novo carrinho
            const novoCarrinho: Carrinho = {
                usuarioId: ObjectId.createFromHexString(usuarioId).toHexString(),
                itens: [{
                    produtoId: ObjectId.createFromHexString(produtoId).toHexString(),
                    quantidade,
                    precoUnitario,
                    nome
                }],
                dataAtualizacao: new Date(),
                total: precoUnitario * quantidade
            };
            await db.collection('carrinhos').insertOne(novoCarrinho);
            return res.status(201).json({ mensagem: 'Carrinho criado e item adicionado com sucesso', carrinho: novoCarrinho });
        }

        // Se existir, deve adicionar o item ao carrinho existente
        

        // Calcular o total do carrinho

        // Atualizar a data de atualização do carrinho


        res.status(200).json({ mensagem: 'Item adicionado ao carrinho com sucesso' });

    }


    //removerItem
    //atualizarQuantidade
    //listar
    //remover                -> Remover o carrinho todo

    async listar(req: Request, res: Response) {
        const carrinhos = await db.collection('carrinhos').find().toArray()
        res.status(200).json(console.log('funcinando'))
    }

}
export default new CarrinhoController();