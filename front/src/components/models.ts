export interface MessageModelRequest {
  picture: string
  username: string
  content: string
}

export interface MessageModel extends MessageModelRequest {
  date: string | Date
}
