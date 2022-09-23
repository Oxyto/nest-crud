export interface MessageModelRequest {
  picture: string
  username: string
  email: string
  content: string
}

export interface MessageModel extends MessageModelRequest {
  uuid: string
  date: string
  vu: boolean
}
