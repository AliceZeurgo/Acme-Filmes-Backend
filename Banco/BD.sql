create database acme_db_ab;

use acme_db_ab;

drop database acme_db_ab;

 create table usuario
( id int auto_increment primary key not null,
  nome_usuario varchar(100) not null,
  senha_usuario varchar(20) not null,
  email varchar(40) not null,
  img_usuario varchar(400),
  administrador boolean
 );
 
 create table filmes
 (
 id int auto_increment primary key not null,
 nome varchar(500) not null,
 id_classificacao int not null,
 sinopse text not null,
 foto_capa varchar(3000) not null,
 valor float not null,
 duracao time not null,
 data_lancamento date not null,
 data_relancamento date,
 
 foreign key(id_classificacao) references classificacao(id)
 );
 
 create table classificacao
 (
 id int auto_increment primary key not null,
 nome_classificacao varchar(50) not null,
 sigla_classificacao varchar(3) not null,
 descricao_classificacao varchar(150) not null
 );

create table atores
(
id int auto_increment primary key not null,
nome varchar(50) not null,
biografia varchar(400),
data_nascimento date,
foto_ator varchar(300)
);

create table diretores
(
id int auto_increment primary key not null,
nome_diretores varchar(30) not null,
biografia varchar(400),
data_nascimento date,
foto_diretor varchar(300)
);

INSERT INTO usuarios (id, nome_usuario, senha_usuario, email, url_foto, administrador)
VALUES
    (1, 'joao123', 'senha123', 'joao123@email.com', 'https://i.pinimg.com/564x/a8/6d/af/a86daf2f117497b99dfb1f82b8f86537.jpg', true),
    (2, 'maria456', 'abcd9876', 'maria456@email.com', 'https://i.pinimg.com/564x/39/72/20/3972206c87f275b56d65653953155d80.jpg', false),
    (3, 'carlos789', 'qwerty123', 'carlos789@email.com', 'https://i.pinimg.com/564x/91/49/10/91491027e7d8c5105a595a8163d08a95.jpg', false),
    (4, 'ana321', 'anaSenha', 'ana321@example.com', 'https://i.pinimg.com/736x/ee/02/c8/ee02c87e8478998ef642dc86633f3ca6.jpg', true),
    (5, 'pedro654', 'pedro1234', 'pedro654@example.com', 'https://i.pinimg.com/564x/1c/ee/d3/1ceed3f01c5ebc572d8490ff21acd8b3.jpg', false),
    (6, 'lucas987', 'senha123', 'lucas987@example.com', 'https://i.pinimg.com/564x/81/8d/b9/818db98d605087d1254795691bd9b11f.jpg', false),
    (7, 'julia12', 'julia456', 'julia12@example.com', 'https://i.pinimg.com/564x/dc/84/85/dc8485c823d7f8f95b59fafe44450fc8.jpg', true),
    (8, 'ana456', 'anaSenha', 'ana456@example.com', 'https://i.pinimg.com/564x/00/2f/b3/002fb3290a53579b0f31030a7362b11f.jpg', false),
    (9, 'rafael21', 'senha123', 'rafael21@example.com', 'https://i.pinimg.com/564x/79/01/2f/79012f6bfa73ea76c52860e8734a01ff.jpg', false),
    (10, 'laura789', 'laura123', 'laura789@example.com', 'https://i.pinimg.com/564x/81/8d/b9/818db98d605087d1254795691bd9b11f.jpg', true);
   

INSERT INTO filmes (id, nome, id_classificacao, sinopse, foto_capa, valor, duracao, data_lancamento, data_relancamento)
VALUES
    (1, 'O Poderoso Chefão', 1, 'A saga de uma família ítalo-americana de Nova York em torno dos negócios da máfia.', 'https://i.pinimg.com/736x/24/83/cc/2483cc8145f6ae46efd7b8348f5d5955.jpg', 9.99, '02:55:00', '1972-03-24', NULL),
    (2, 'Interestelar', 2, 'Um grupo de exploradores faz uso de um buraco de minhoca recém-descoberto para superar as limitações das viagens interestelares.', 'https://i.pinimg.com/564x/2f/5b/a9/2f5ba9756f469a417639e81fea55f4d1.jpg', 12.99, '02:49:00', '2014-11-06', NULL),
    (3, 'O Senhor dos Anéis: A Sociedade do Anel', 2, 'Um hobbit relutante embarca em uma jornada épica para destruir um anel mágico e salvar a Terra-média do domínio das trevas.', 'https://i.pinimg.com/564x/18/0b/1f/180b1f60b92a2c5fc3b41f884feb4373.jpg', 11.99, '02:58:00', '2001-12-19', NULL),
    (4, 'O Rei Leão', 3, 'O jovem leão Simba busca vingança contra seu tio Scar por usurpar o trono de seu pai e causar a morte do rei Mufasa.', 'https://i.pinimg.com/564x/bf/6c/ad/bf6cad1e8fcc83cbe4544a84f39ee458.jpg', 8.99, '01:28:00', '1994-06-24', '2011-09-16'),
    (5, 'A Origem', 2, 'Um ladrão que entra na mente das pessoas através de seus sonhos é contratado para realizar uma tarefa quase impossível: implantar uma ideia na mente de alguém.', 'https://m.media-amazon.com/images/I/81l+It0iwhL._SL1500_.jpg', 10.99, '02:28:00', '2010-07-16', NULL),
    (6, 'Matrix', 3, 'Um jovem programador é atormentado por estranhos pesadelos nos quais ele é conectado por cabos a um mundo obscuro de realidade virtual.', 'https://i.pinimg.com/564x/97/9d/60/979d6039593ae47af0ce2a0b0fc7ca7a.jpg', 9.99, '02:16:00', '1999-03-31', NULL),
    (7, 'Crepúsculo', 4, 'Uma jovem se apaixona por um vampiro e enfrenta uma série de desafios sobrenaturais para ficar com ele.', 'https://i.pinimg.com/564x/4b/a7/ca/4ba7ca4f403b4959006bd63a67b055f8.jpg', 7.99, '02:02:00', '2008-11-21', NULL),
    (8, 'Pulp Fiction: Tempo de Violência', 3, 'Diversas histórias entrelaçadas sobre criminosos, gângsteres, boxeadores e revolucionários.', 'https://i.pinimg.com/564x/89/41/e7/8941e71464be8fe81ade92a86817338e.jpg', 11.99, '02:34:00', '1994-10-14', NULL),
    (9, 'Titanic', 2, 'Um romance épico sobre o trágico naufrágio do RMS Titanic e o amor proibido entre Rose, uma jovem aristocrata, e Jack, um artista pobre.', 'https://i.pinimg.com/564x/88/80/b6/8880b6d5f3517441316b1284f5921b10.jpg', 9.99, '03:15:00', '1997-12-19', '2012-04-04'),
    (10, 'Harry Potter e a Pedra Filosofal', 2, 'Um jovem bruxo descobre seu destino como o menino que sobreviveu ao ataque de um bruxo das trevas e frequenta a Escola de Magia e Bruxaria de Hogwarts.', 'https://i.pinimg.com/564x/f5/43/96/f543964147cb9bdcb69dc6a72b65ac03.jpg', 10.99, '02:32:00', '2001-11-16', NULL);

   
   
    INSERT INTO classificacao (id, nome_classificacao, sigla_classificacao, descricao_classificacao)
VALUES
    (1, 'Livre', 'L', 'Apropriado para todos os públicos.'),
    (2, '10 anos', '10', 'Não recomendado para menores de 10 anos.'),
    (3, '12 anos', '12', 'Não recomendado para menores de 12 anos.'),
    (4, '14 anos', '14', 'Não recomendado para menores de 14 anos.'),
    (5, '16 anos', '16', 'Não recomendado para menores de 16 anos.'),
    (6, '18 anos', '18', 'Não recomendado para menores de 18 anos.');
