CREATE TABLE produtos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    urlfoto VARCHAR(255) NOT NULL,
    descricao TEXT
);

INSERT INTO `defaultdb`.`produtos` (`id`, `nome`, `preco`, `urlfoto`, `descricao`) VALUES ('1', 'Banana', '8.99', 'https://upload.wikimedia.org/wikipedia/commons/a/af/Bananas_%28Alabama_Extension%29.jpg', 'Banana madura');
INSERT INTO `defaultdb`.`produtos` (`id`, `nome`, `preco`, `urlfoto`, `descricao`) VALUES ('2', 'Maça', '6.89', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/330px-Red_Apple.jpg', 'Maça novinha');
INSERT INTO `defaultdb`.`produtos` (`id`, `nome`, `preco`, `urlfoto`, `descricao`) VALUES ('3', 'Melancia', '10.00', 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Summer_99.jpg', 'Melancia por unidade');
INSERT INTO `defaultdb`.`produtos` (`id`, `nome`, `preco`, `urlfoto`, `descricao`) VALUES ('4', 'Uva', '14.10', 'https://52586.cdn.lojaquevende.com.br/static/52586/sku/frutas-uva-verde-sem-semente--p-1610106700609.pnghttps://52586.cdn.lojaquevende.com.br/static/52586/sku/frutas-uva-verde-sem-semente--p-1610106700609.png', 'Uva da hora');
INSERT INTO `defaultdb`.`produtos` (`id`, `nome`, `preco`, `urlfoto`, `descricao`) VALUES ('5', 'Laranja', '10.00', 'https://static.wixstatic.com/media/d40923_64569dd49a3a45c5b075dfe21d291463~mv2.jpg/v1/crop/x_2,y_46,w_1000,h_658/fill/w_400,h_260,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/d40923_64569dd49a3a45c5b075dfe21d291463~mv2.jpg', 'Laranja por saco');

DBPASSWORD=''
DBHOST='localhost'
DBUSER='root'
DBPORT='3306'
DBDATABASE='testdb'
MONGOURI='mongodb://localhost:27017'