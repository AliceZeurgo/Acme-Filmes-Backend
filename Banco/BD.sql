create database sql3706097;

use sql3706097;

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

INSERT INTO usuario (id, nome_usuario, senha_usuario, email, img_usuario, administrador)
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


INSERT INTO diretores (nome_diretores, biografia, data_nascimento, foto_diretor)
VALUES
    ('Francis Ford Coppola', 'Francis Ford Coppola é um diretor de cinema, produtor e roteirista americano. Ele é mais conhecido por dirigir a trilogia "O Poderoso Chefão".', '1939-04-07', 'https://upload.wikimedia.org/wikipedia/commons/2/26/Francis_Ford_Coppola_crop.jpg'),
    ('Christopher Nolan', 'Christopher Nolan é um diretor de cinema, produtor e roteirista britânico-americano. Ele é conhecido por dirigir filmes como "Interestelar" e "A Origem".', '1970-07-30', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Christopher_Nolan_by_Gage_Skidmore.jpg/800px-Christopher_Nolan_by_Gage_Skidmore.jpg'),
    ('Peter Jackson', 'Peter Jackson é um diretor, roteirista e produtor de cinema neozelandês. Ele é mais conhecido por dirigir a trilogia "O Senhor dos Anéis".', '1961-10-31', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Peter_Jackson_SDCC_2014.jpg/800px-Peter_Jackson_SDCC_2014.jpg'),
    ('Rob Minkoff', 'Rob Minkoff é um diretor de cinema americano. Ele é conhecido por dirigir filmes de animação como "O Rei Leão" e "Stuart Little".', '1962-08-11', 'https://upload.wikimedia.org/wikipedia/commons/1/19/Rob_Minkoff.jpg'),
    ('James Cameron', 'James Cameron é um diretor de cinema, produtor e roteirista canadense. Ele é conhecido por dirigir filmes como "Titanic" e "Avatar".', '1954-08-16', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/James_Cameron_by_Gage_Skidmore.jpg/800px-James_Cameron_by_Gage_Skidmore.jpg'),
    ('Lana Wachowski', 'Lana Wachowski é uma diretora de cinema, roteirista e produtora americana. Ela é mais conhecida por dirigir a trilogia "Matrix" junto com sua irmã, Lilly Wachowski.', '1965-06-21', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Lana_Wachowski_at_Sense8_Premiere_Rio_2016_%28cropped%29.jpg/800px-Lana_Wachowski_at_Sense8_Premiere_Rio_2016_%28cropped%29.jpg'),
    ('Lilly Wachowski', 'Lilly Wachowski é uma diretora de cinema, roteirista e produtora americana. Ela é mais conhecida por dirigir a trilogia "Matrix" junto com sua irmã, Lana Wachowski.', '1967-12-29', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Lilly_Wachowski_by_Gage_Skidmore.jpg/800px-Lilly_Wachowski_by_Gage_Skidmore.jpg'),
    ('Catherine Hardwicke', 'Catherine Hardwicke é uma diretora de cinema americana. Ela é conhecida por dirigir o filme "Crepúsculo".', '1955-10-21', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Catherine_Hardwicke_by_Gage_Skidmore.jpg/800px-Catherine_Hardwicke_by_Gage_Skidmore.jpg'),
    ('Quentin Tarantino', 'Quentin Tarantino é um diretor de cinema, roteirista e ator americano. Ele é conhecido por dirigir filmes como "Pulp Fiction" e "Kill Bill".', '1963-03-27', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Quentin_Tarantino_by_Gage_Skidmore.jpg/800px-Quentin_Tarantino_by_Gage_Skidmore.jpg'),
    ('James Wan', 'James Wan é um diretor de cinema, produtor e roteirista malaio-australiano. Ele é conhecido por dirigir filmes de terror como "Jogos Mortais" e "Invocação do Mal".', '1977-02-26', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/James_Wan_by_Gage_Skidmore.jpg/800px-James_Wan_by_Gage_Skidmore.jpg'),
    ('Steven Spielberg', 'Steven Spielberg é um diretor de cinema, produtor e roteirista americano. Ele é conhecido por dirigir filmes como "E.T. - O Extraterrestre" e "Jurassic Park".', '1946-12-18', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Steven_Spielberg_Cannes_2013.jpg/800px-Steven_Spielberg_Cannes_2013.jpg'),
    ('George Lucas', 'George Lucas é um diretor de cinema, produtor e roteirista americano. Ele é mais conhecido por criar a franquia "Star Wars" e dirigir o filme "American Graffiti".', '1944-05-14', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/George_Lucas_2013.jpg/800px-George_Lucas_2013.jpg'),
    ('Alfonso Cuarón', 'Alfonso Cuarón é um diretor de cinema, produtor e roteirista mexicano. Ele é conhecido por dirigir filmes como "Gravidade" e "Harry Potter e o Prisioneiro de Azkaban".', '1961-11-28', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Alfonso_Cuar%C3%B3n_Cannes_2019.jpg/800px-Alfonso_Cuar%C3%B3n_Cannes_2019.jpg'),
    ('David Yates', 'David Yates é um diretor de cinema britânico. Ele é conhecido por dirigir os últimos quatro filmes da série "Harry Potter".', '1963-11-30', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/David_Yates_at_the_2009_San_Diego_Comic-Con.jpg/800px-David_Yates_at_the_2009_San_Diego_Comic-Con.jpg'),
    ('Tim Burton', 'Tim Burton é um diretor de cinema, produtor e roteirista americano. Ele é conhecido por dirigir filmes como "Edward Mãos de Tesoura" e "O Estranho Mundo de Jack".', '1958-08-25', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Tim_Burton_by_Gage_Skidmore_2.jpg/800px-Tim_Burton_by_Gage_Skidmore_2.jpg');

   
   
    INSERT INTO classificacao (id, nome_classificacao, sigla_classificacao, descricao_classificacao)
VALUES
    (1, 'Livre', 'L', 'Apropriado para todos os públicos.'),
    (2, '10 anos', '10', 'Não recomendado para menores de 10 anos.'),
    (3, '12 anos', '12', 'Não recomendado para menores de 12 anos.'),
    (4, '14 anos', '14', 'Não recomendado para menores de 14 anos.'),
    (5, '16 anos', '16', 'Não recomendado para menores de 16 anos.'),
    (6, '18 anos', '18', 'Não recomendado para menores de 18 anos.');

INSERT INTO atores (nome, biografia, data_nascimento, foto_ator)
VALUES
    ('Tom Hanks', 'Tom Hanks é um ator e produtor americano. Ele é conhecido por seus papéis em filmes como "Forrest Gump", "Náufrago" e "O Resgate do Soldado Ryan".', '1956-07-09', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Tom_Hanks_TIFF_2019.jpg/800px-Tom_Hanks_TIFF_2019.jpg'),
    ('Leonardo DiCaprio', 'Leonardo DiCaprio é um ator e produtor americano. Ele é conhecido por seus papéis em filmes como "Titanic", "O Lobo de Wall Street" e "A Origem".', '1974-11-11', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Leonardo_DiCaprio_2016.jpg/800px-Leonardo_DiCaprio_2016.jpg'),
    ('Robert De Niro', 'Robert De Niro é um ator, produtor e diretor americano. Ele é conhecido por seus papéis em filmes como "O Poderoso Chefão Parte II", "Touro Indomável" e "Taxi Driver".', '1943-08-17', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Robert_De_Niro_Cannes_2016.jpg/800px-Robert_De_Niro_Cannes_2016.jpg'),
    ('Meryl Streep', 'Meryl Streep é uma atriz americana. Ela é conhecida por sua versatilidade e aclamados papéis em filmes como "A Escolha de Sofia", "Kramer vs. Kramer" e "O Diabo Veste Prada".', '1949-06-22', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Meryl_Streep_December_2018.jpg/800px-Meryl_Streep_December_2018.jpg'),
    ('Brad Pitt', 'Brad Pitt é um ator e produtor americano. Ele é conhecido por seus papéis em filmes como "Clube da Luta", "O Curioso Caso de Benjamin Button" e "Snatch - Porcos e Diamantes".', '1963-12-18', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Brad_Pitt_2019_by_Glenn_Francis.jpg/800px-Brad_Pitt_2019_by_Glenn_Francis.jpg'),
    ('Johnny Depp', 'Johnny Depp é um ator, produtor e músico americano. Ele é conhecido por seus papéis em filmes como "Piratas do Caribe", "Edward Mãos de Tesoura" e "A Fantástica Fábrica de Chocolate".', '1963-06-09', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Johnny_Depp_2018.jpg/800px-Johnny_Depp_2018.jpg'),
    ('Denzel Washington', 'Denzel Washington é um ator, diretor e produtor americano. Ele é conhecido por seus papéis em filmes como "Dia de Treinamento", "Malcolm X" e "Hurricane - O Furacão".', '1954-12-28', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Denzel_Washington_by_Gage_Skidmore.jpg/800px-Denzel_Washington_by_Gage_Skidmore.jpg'),
    ('Emma Stone', 'Emma Stone é uma atriz americana. Ela é conhecida por seus papéis em filmes como "La La Land", "Birdman" e "Histórias Cruzadas".', '1988-11-06', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Emma_Stone_at_2018_PaleyFest_La_La_Land_panel_%28cropped%29.jpg/800px-Emma_Stone_at_2018_PaleyFest_La_La_Land_panel_%28cropped%29.jpg'),
    ('Harrison Ford', 'Harrison Ford é um ator americano. Ele é conhecido por seus papéis em filmes como "Star Wars", "Indiana Jones" e "Blade Runner".', '1942-07-13', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Harrison_Ford_by_Gage_Skidmore_3_%28cropped%29.jpg/800px-Harrison_Ford_by_Gage_Skidmore_3_%28cropped%29.jpg'),
    ('Natalie Portman', 'Natalie Portman é uma atriz e cineasta americana. Ela é conhecida por seus papéis em filmes como "Cisne Negro", "V de Vingança" e "Star Wars".', '1981-06-09', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Natalie_Portman_Cannes_2015_5.jpg/800px-Natalie_Portman_Cannes_2015_5.jpg');
