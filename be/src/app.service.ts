import { Injectable } from '@nestjs/common';
import { MessageDto, PostMessageDto } from './dto/post-message.dto';

@Injectable()
export class AppService {
  conversation: MessageDto[] = [];
  processMessage(messageObject: PostMessageDto): PostMessageDto[] {
    const predefinedMessage = {
      'Who are you?': 'my name is Hung',
    };

    const newConversation: MessageDto = {
      id: this.conversation.length + 1,
      message: messageObject.message,
      answer: predefinedMessage[messageObject.message] ?? 'Unknown command',
    };

    this.conversation.push(newConversation);

    return this.conversation;
  }

  getMessages(): MessageDto[] {
    return this.conversation;
  }
}
