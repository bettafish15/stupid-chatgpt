import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MessageDto, PostMessageDto } from './dto/post-message.dto';

@Controller('/questions')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  postMessage(@Body() messageDto: PostMessageDto): PostMessageDto[] {
    console.log(messageDto);
    return this.appService.processMessage(messageDto);
  }

  @Get()
  getMessage(): MessageDto[] {
    return this.appService.getMessages();
  }
}
