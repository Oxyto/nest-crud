import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { CreateMessageDto } from "./dto/create-message.dto"
import { Message } from "./entities/message.entity"
import db from "../database/config"

@Injectable()
export class MessagesService {
  async create(createMessageDto: CreateMessageDto) {
    const message = new Message(createMessageDto, new Date())

    if (!message.check())
      throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST)
    await db.insert(message).into("messages")
  }

  async findAll() {
    const msg_list = await db
      .select("*")
      .from("messages")
      .orderBy("id", "desc")
      .limit(5)
    return msg_list.reverse()
  }
}
