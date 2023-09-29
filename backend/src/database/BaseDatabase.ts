import { knex } from 'knex'
import dotenv from 'dotenv'
import * as fs from 'fs';
import * as path from 'path';

dotenv.config()

export class BaseDatabase {
  protected static connection = knex({
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    pool: {
      min: 0,
      max: 1,
      afterCreate: (conn: any, cb: any) => {
        conn.query('SET timezone="UTC";', (err: any) => {
          cb(err, conn);
        });
      },
    },
  });

  public async createUsersTable(): Promise<void> {
    try {
      const tableExists = await BaseDatabase.connection.schema.hasTable('users');

      if (!tableExists) {
        const filePath = path.join(__dirname, 'geekhub.sql'); // Caminho completo para o arquivo
        const sql = fs.readFileSync(filePath, 'utf-8'); // Ler o conteúdo do arquivo
        await BaseDatabase.connection.raw(sql); // Executar o SQL para criar a tabela
        console.log('Tabela "Users" criada com sucesso.');
      }
    } catch (error) {
      console.error('Erro ao criar/verificar a tabela "Users":', error);
    }
  }

  public async createPostsTable(): Promise<void> {
    try {
      const tableExists = await BaseDatabase.connection.schema.hasTable('posts');
      
      if (!tableExists) {
        const filePath = path.join(__dirname, 'geekhub.sql'); 
        const sql = fs.readFileSync(filePath, 'utf-8');
        await BaseDatabase.connection.raw(sql);
        console.log('Tabela "Posts" criada com sucesso.');
      }
    } catch (error) {
      console.error('Erro ao criar/verificar a tabela "Posts":', error);
    }
  }
}
