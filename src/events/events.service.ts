import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Event } from '@prisma/client';
import { CreateEventDto } from './dtos/create-event.dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateEventDto): Promise<Event> {
    const { categoryId } = data;

    const existingCategory = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!existingCategory) {
      throw new NotFoundException(`Category with id: ${categoryId} not found`);
    }

    return this.prisma.event.create({
      data: {
        ...data,
      },
    });
  }

  async findAll(): Promise<Event[]> {
    return this.prisma.event.findMany();
  }

  async findOne(id: number): Promise<Event | null> {
    return this.prisma.event.findUnique({
      where: { id },
    });
  }
}
