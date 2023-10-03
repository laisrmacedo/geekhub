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

  public async createCommentsTable(): Promise<void> {
    try {
      const tableExists = await BaseDatabase.connection.schema.hasTable('comments');
      
      if (!tableExists) {
        const filePath = path.join(__dirname, 'geekhub.sql'); 
        const sql = fs.readFileSync(filePath, 'utf-8');
        await BaseDatabase.connection.raw(sql);
        console.log('Tabela "Comments" criada com sucesso.');
      }
    } catch (error) {
      console.error('Erro ao criar/verificar a tabela "Posts":', error);
    }
  }

  public async createPostVotesTable(): Promise<void> {
    try {
      const tableExists = await BaseDatabase.connection.schema.hasTable('post_upvote_downvote');
      
      if (!tableExists) {
        const filePath = path.join(__dirname, 'geekhub.sql'); 
        const sql = fs.readFileSync(filePath, 'utf-8');
        await BaseDatabase.connection.raw(sql);
        console.log('Tabela "post_upvote_downvote" criada com sucesso.');
      }
    } catch (error) {
      console.error('Erro ao criar/verificar a tabela "post_upvote_downvote":', error);
    }
  }

  public async createCommentVotesTable(): Promise<void> {
    try {
      const tableExists = await BaseDatabase.connection.schema.hasTable('comment_upvote_downvote');
      
      if (!tableExists) {
        const filePath = path.join(__dirname, 'geekhub.sql'); 
        const sql = fs.readFileSync(filePath, 'utf-8');
        await BaseDatabase.connection.raw(sql);
        console.log('Tabela "comment_upvote_downvote" criada com sucesso.');
      }
    } catch (error) {
      console.error('Erro ao criar/verificar a tabela "comment_upvote_downvote":', error);
    }
  }

  public async createFlagsTable(): Promise<void> {
    try {
      const tableExists = await BaseDatabase.connection.schema.hasTable('flags');
      
      if (!tableExists) {
        const filePath = path.join(__dirname, 'geekhub.sql'); 
        const sql = fs.readFileSync(filePath, 'utf-8');
        await BaseDatabase.connection.raw(sql);
        console.log('Tabela "flags" criada com sucesso.');
      }
    } catch (error) {
      console.error('Erro ao criar/verificar a tabela "flags":', error);
    }
  }
}
