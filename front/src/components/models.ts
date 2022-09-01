export interface MessageModelRequest {
  username: string
  content: string
}

export interface MessageModel extends MessageModelRequest {
  date: string | Date
}
