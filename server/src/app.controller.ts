// src/app.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { BooksService } from './books/books.service';
import { Book } from './books/book.model';

@Controller('books')
export class AppController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Book> {
    const book = await this.booksService.findById(id);
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return book;
  }

  @Post()
  async create(@Body() bookData: Partial<Book>): Promise<Book> {
    return this.booksService.create(bookData);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() bookData: Partial<Book>,
  ): Promise<Book> {
    await this.findById(id); // Check if the book exists
    await this.booksService.update(id, bookData);
    return this.booksService.findById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.findById(id); // Check if the book exists
    await this.booksService.delete(id);
  }
}
