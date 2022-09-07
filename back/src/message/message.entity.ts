import { CreateMessageDto } from "./create-message.dto"

export class Message {
  username: string
  content: string
  date: Date

  constructor(createMessageDto: CreateMessageDto, date: Date) {
    this.username = createMessageDto.username
    this.content = createMessageDto.content
    this.date = date
  }

  check() {
    return typeof this.username === "string" && typeof this.content === "string"
  }
}
