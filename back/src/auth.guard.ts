import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { OAuth2Client } from "google-auth-library"
import * as dotenv from "dotenv"

dotenv.config()

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const wsClient = context.switchToWs().getClient()
    const token = wsClient.request.headers.authorization || ""
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
    try {
      await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      })
    } catch (error) {
      console.error(error)
      wsClient.emit("logout", { reason: "Invalid token" })
      return false
    }
    return true
  }
}
