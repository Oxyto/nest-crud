export interface MessageModelRequest {
  uuid: string
  picture: string
  username: string
  content: string
}

export interface MessageModel extends MessageModelRequest {
  date: string
}
