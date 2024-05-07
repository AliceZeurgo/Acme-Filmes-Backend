const { PrismaClient } = require('@prisma/client')


const prisma = new PrismaClient()

// ALICE QUE FEZ

const buscarTodosUsuarios = async function(){
    try {

        let sql = `SELECT * FROM tbl_usuario`
        let rsUsuarios = await prisma.$queryRawUnsafe(sql)
        return rsUsuarios

    } catch (error) {

        return false
    }
};

const buscarUsuarioPorId = async (id) => {
    try {
        return await db.$queryRawUnsafe(`select * from tbl_usuario where id = ${id}`);
    } catch (error) {
        console.error("Erro ao buscar usuário por ID:", error);
        return false;
    }
};

const buscarUltimoIdUsuario = async () => {
    try {
        return await db.$queryRawUnsafe('select cast(id as decimal) from tbl_usuario order by id desc limit 1');
    } catch (error) {
        console.error("Erro ao buscar o ID do último usuário:", error);
        return false;
    }
};

const inserirUsuario = async ({ nome, foto_url, email, senha, administrador }) => {
    try {
        const sql = `insert into tbl_usuario (nome, foto_url, email, senha, administrador) values ('${nome}', '${foto_url || ''}', '${email}', '${senha}', ${!!administrador})`;
        return !!(await db.$executeRawUnsafe(sql));
    } catch (error) {
        console.error("Erro ao inserir um novo usuário:", error);
        return false;
    }
};

const deletarUsuario = async (id) => {
    try {
        const query = `delete from tbl_usuario where id = ${id}`;
        return await db.$queryRawUnsafe(query);
    } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        return false;
    }
};

const atualizarUsuario = async ({ id, nome, foto_url, email, senha, administrador }) => {
    try {
        const sql = `update tbl_usuario set nome = '${nome}', foto_url = '${foto_url || ''}', email = '${email}', senha = '${senha}', administrador = ${!!administrador} where id = ${id}`;
        return !!(await db.$executeRawUnsafe(sql));
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        return false;
    }
};

module.exports = {
    buscarTodosUsuarios,
    buscarUsuarioPorId,
    buscarUltimoIdUsuario,
    inserirUsuario,
    deletarUsuario,
    atualizarUsuario
};
