import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from './books/book.model';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Book)
    private bookModel: typeof Book,
  ) {}

  async getBooks(): Promise<Book[]> {
    return this.bookModel.findAll();
  }
}
