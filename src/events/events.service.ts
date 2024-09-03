import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Event } from '@prisma/client';
import { CreateEventDto } from './dtos/create-event.dto';
import { UpdateEventDto } from './dtos/update-even.dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateEventDto): Promise<Event> {
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

  async getRecommendations(id: number) {
    const event = await this.prisma.event.findUnique({
      where: { id },
    });

    console.log('event: ', event);

    if (!event) {
      throw new NotFoundException(`Event with id: ${id} not found`);
    }

    let recommendations = await this.prisma.event.findMany({
      where: {
        OR: [
          { category: event.category },
          { date: event.date },
          { location: event.location },
        ],
        NOT: { id: event.id },
      },
      take: 3,
    });

    if (recommendations.length === 0) {
      recommendations = await this.prisma.event.findMany({
        where: { id: { not: event.id } },
        orderBy: { date: 'desc' },
        take: 3,
      });
    }

    return recommendations;
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    return this.prisma.event.update({
      where: { id },
      data: updateEventDto,
    });
  }

  async remove(id: number) {
    return this.prisma.event.delete({
      where: { id },
    });
  }
}
