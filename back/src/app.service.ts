import { Injectable } from "@nestjs/common"

@Injectable()
export class AppService {
  getInfo(): string {
    return "<p>There is nothing here</p>"
  }
}
