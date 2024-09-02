import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: createCategoryDto,
    });
  }

  async findAll() {
    return this.prisma.category.findMany();
  }

  async findOne(id: number) {
    return this.prisma.category.findUnique({
      where: { id },
    });
  }

  async remove(id: number) {
    return this.prisma.category.delete({
      where: { id },
    });
  }
}
