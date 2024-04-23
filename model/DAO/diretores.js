const bancoDeDados = require('./bancoDeDados');

const buscarDiretoresPorFilmeId = async (id_filme) => {
    try {
        const query = `select tbl_diretor.nome from tbl_diretor inner join tbl_filme_diretor on tbl_diretor.id = tbl_filme_diretor.id_diretor where tbl_filme_diretor.id_filme = ${id_filme}`;
        return await db.$queryRawUnsafe(query);
    } catch (error) {
        console.error("Erro ao buscar diretores por ID do filme:", error);
        return false;
    }
};

const buscarTodosDiretores = async () => {
    try {
        return await db.$queryRawUnsafe('select * from tbl_diretor');
    } catch (error) {
        console.error("Erro ao buscar todos os diretores:", error);
        return false;
    }
};

const buscarDiretorPorId = async (id) => {
    try {
        return await db.$queryRawUnsafe(`select * from tbl_diretor where id = ${id}`);
    } catch (error) {
        console.error("Erro ao buscar diretor por ID:", error);
        return false;
    }
};

const buscarUltimoIdDiretor = async () => {
    try {
        return await db.$queryRawUnsafe('select cast(id as decimal) from tbl_diretor order by id desc limit 1');
    } catch (error) {
        console.error("Erro ao buscar o ID do último diretor:", error);
        return false;
    }
};

const inserirDiretor = async ({ nome, biografia, data_nascimento, foto_url, id_sexo }) => {
    try {
        const query = `insert into tbl_diretor (nome, biografia, data_nascimento, foto_url, id_sexo) values ('${nome}', '${biografia}', '${data_nascimento}', '${foto_url || ''}', ${id_sexo})`;
        return !!(await db.$executeRawUnsafe(query));
    } catch (error) {
        console.error("Erro ao inserir um novo diretor:", error);
        return false;
    }
};

const deletarDiretor = async (id) => {
    try {
        const query = `delete from tbl_diretor where id = ${id}`;
        return await db.$queryRawUnsafe(query);
    } catch (error) {
        console.error("Erro ao deletar diretor:", error);
        return false;
    }
};

const atualizarDiretor = async ({ id, nome, biografia, data_nascimento, foto_url, id_sexo }) => {
    try {
        const query = `update tbl_diretor set nome = '${nome}', biografia = '${biografia}', data_nascimento = '${data_nascimento}', foto_url = '${foto_url || ''}', id_sexo = ${id_sexo} where id = ${id}`;
        return !!(await db.$executeRawUnsafe(query));
    } catch (error) {
        console.error("Erro ao atualizar diretor:", error);
        return false;
    }
};

module.exports = {
    buscarDiretoresPorFilmeId,
    buscarTodosDiretores,
    buscarDiretorPorId,
    buscarUltimoIdDiretor,
    inserirDiretor,
    deletarDiretor,
    atualizarDiretor
};