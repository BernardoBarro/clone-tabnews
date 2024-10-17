import { Client } from "pg";

async function query(queryObject) {
  let client;
  try {
    client = await getNewClient();
    const result = await client.query(queryObject); //assincrono realiza a query enviada para a função
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await client.end(); //finaliza a sessão do banco de dados
  }
}

async function getNewClient() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: process.env.NODE_ENV === "production" ? true : false,
  }); //sincrono cria uma instancia de um Client

  await client.connect(); //assincrono, estamos requisitando uma conexão ao banco de dados
  return client;
}

const database = {
  query,
  getNewClient,
};

export default database;
