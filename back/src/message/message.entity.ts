import { CreateMessageDto } from "./create-message.dto"

const USERNAME_LENGTH = 64
const CONTENT_LENGTH = 512

export class Message {
  uuid: string
  picture: string
  username: string
  email: string
  content: string
  vu: boolean
  date: Date

  constructor(createMessageDto: CreateMessageDto, date: Date, uuid: string) {
    this.picture = createMessageDto.picture
    this.username = createMessageDto.username
    this.email = createMessageDto.email
    this.content = createMessageDto.content
    this.vu = false
    this.date = date
    this.uuid = uuid
  }

  check() {
    return (
      typeof this.uuid === "string" &&
      typeof this.picture === "string" &&
      typeof this.username === "string" &&
      typeof this.email === "string" &&
      typeof this.content === "string" &&
      typeof this.vu === "boolean" &&
      this.username.length <= USERNAME_LENGTH &&
      this.content.length <= CONTENT_LENGTH
    )
  }
}
