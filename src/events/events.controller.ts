import { UpdateEventDto } from './dtos/update-even.dto';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dtos/create-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @Get('/recommendations/:id')
  getRecommendations(@Param('id') id: string) {
    return this.eventsService.getRecommendations(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(+id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }
}
