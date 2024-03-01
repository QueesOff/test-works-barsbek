import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from './book.model';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book)
    private readonly bookModel: typeof Book,
  ) {}

  async findAll(): Promise<Book[]> {
    return this.bookModel.findAll();
  }

  async findById(id: number): Promise<Book> {
    return this.bookModel.findByPk(id);
  }

  async create(bookData: Partial<Book>): Promise<Book> {
    return this.bookModel.create(bookData);
  }

  async update(id: number, bookData: Partial<Book>): Promise<number> {
    const [affectedCount] = await this.bookModel.update(bookData, {
      where: { id },
    });
    return affectedCount;
  }

  async delete(id: number): Promise<number> {
    return this.bookModel.destroy({ where: { id } });
  }
}
