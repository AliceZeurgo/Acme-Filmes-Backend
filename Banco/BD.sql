create database db_acme_filmes_turma_ab;

use db_acme_filmes_turma_ab;

create table  tbl_filme (
id int not null auto_increment primary key,
nome varchar (80) not null,
sinopse text not null,
duracao time not null,
data_lancamento date not null,
data_relacamento date,
foto_capa varchar (200) not null,
valor_unitario float,

unique index (id),
unique key (id)
);

insert into tbl_filme 
(nome,
 sinopse, 
 duracao, 
 data_lancamento, 
 data_relacamento, 
 foto_capa, 
 valor_unitario) values
('Todos Menos Você',
'Em Todos Menos Você Bea (Sydney Sweeney) e Ben (Glen Powell), combinam um encontro após se esbarrar nos corredores da faculdade em que estudam. Em uma noite quase perfeita, o jovem casal possui tudo para manter o contato: química, uma boa conversa e um incrível desejo um pelo outro. Mas o encontro acaba ficando de escanteio, e a relação dos dois esfriando. Anos depois, eles são convidados para o mesmo casamento na Austrália e fazem um trato de fingir ser um casal para todos, mas a tarefa se torna difícil quando a antipatia que nutrem um pelo outro fica nítida.',
'1:44:00',
'2024-01-25',
 null,
'https://br.web.img3.acsta.net/c_310_420/pictures/23/10/19/16/00/5781108.jpg',
'60.00'
);

insert into tbl_filme 
(nome, 
sinopse,
 duracao, 
 data_lancamento,
 data_relacamento, 
 foto_capa,
 valor_unitario) values
('Mergulho Noturno',
'Uma família se muda para a casa dos sonhos, mas o lugar esconde um segredo sombrio que pode colocar suas vidas em risco.',
'1:39:00',
'2024-01-18',
 null,
'https://br.web.img3.acsta.net/c_310_420/pictures/23/12/11/16/20/5047728.jpg',
'50.00'
);

show tables; 

drop table tbl_teste;

