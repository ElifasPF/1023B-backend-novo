import { Request, Response } from "express";
import { db } from '../database/banco-mongo.js';
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
    // Adicionar item
    async adicionarItem(req: Request, res: Response) {
        try {
            const { usuarioId, produtoId, quantidade } = req.body;

            // Buscar o produto no banco de dados
            const produto = await db.collection('produtos').findOne({
                _id: ObjectId.createFromHexString(produtoId)
            });

            if (!produto) {
                return res.status(404).json({ mensagem: 'Produto não encontrado' });
            }

            // Pegar o preço e nome do produto
            const precoUnitario = produto.preco;
            const nome = produto.nome;

            // Verificar se o carrinho do usuário já existe
            const carrinho = await db.collection('carrinhos').findOne({ usuarioId }) as Carrinho | null;

            // Se o carrinho não existir, criar um novo
            if (!carrinho) {
                const novoCarrinho: Carrinho = {
                    usuarioId,
                    itens: [{
                        produtoId,
                        quantidade,
                        precoUnitario,
                        nome
                    }],
                    dataAtualizacao: new Date(),
                    total: precoUnitario * quantidade
                };

                await db.collection('carrinhos').insertOne(novoCarrinho);
                return res.status(201).json({
                    mensagem: 'Carrinho criado e item adicionado com sucesso',
                    carrinho: novoCarrinho
                });
            }

            // Se o carrinho já existir
            const itemExistente = carrinho.itens.find(item => item.produtoId === produtoId);

            if (itemExistente) {
                // Atualizar a quantidade se já existir
                itemExistente.quantidade += quantidade;
            } else {
                // Adicionar novo item ao carrinho
                carrinho.itens.push({
                    produtoId,
                    quantidade,
                    precoUnitario,
                    nome
                });
            }

            // Recalcular o total
            carrinho.total = carrinho.itens.reduce(
                (total, item) => total + (item.precoUnitario * item.quantidade),
                0
            );

            // Atualizar data de atualização
            carrinho.dataAtualizacao = new Date();

            // Atualizar no banco de dados
            await db.collection('carrinhos').updateOne(
                { usuarioId },
                {
                    $set: {
                        itens: carrinho.itens,
                        total: carrinho.total,
                        dataAtualizacao: carrinho.dataAtualizacao
                    }
                }
            );

            return res.status(200).json({
                mensagem: 'Item adicionado ao carrinho com sucesso',
                carrinho
            });
        } catch (erro) {
            console.error(erro);
            return res.status(500).json({ mensagem: 'Erro ao adicionar item ao carrinho' });
        }
    }

    // Listar todos os carrinhos
    async listar(req: Request, res: Response) {
        try {
            const carrinhos = await db.collection('carrinhos').find().toArray();
            return res.status(200).json(carrinhos);
        } catch (erro) {
            console.error(erro);
            return res.status(500).json({ mensagem: 'Erro ao listar carrinhos' });
        }
    }
}

export default new CarrinhoController();
