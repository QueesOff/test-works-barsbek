import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Book } from '../../books/book.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || '5432',
      database: process.env.DB_NAME_DEVELOPMENT || 'bars',
      models: [Book],
      autoLoadModels: true,
    }),
  ],
})
export class DatabaseModule {}
