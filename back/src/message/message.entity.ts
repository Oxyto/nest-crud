import { CreateMessageDto } from "./create-message.dto"

const USERNAME_LENGTH = 64
const CONTENT_LENGTH = 512

export class Message {
  picture: string
  username: string
  content: string
  date: Date

  constructor(createMessageDto: CreateMessageDto, date: Date) {
    this.picture = createMessageDto.picture
    this.username = createMessageDto.username
    this.content = createMessageDto.content
    this.date = date
  }

  check() {
    return (
      typeof this.picture === "string" &&
      typeof this.username === "string" &&
      typeof this.content === "string" &&
      this.username.length <= USERNAME_LENGTH &&
      this.content.length <= CONTENT_LENGTH
    )
  }
}
