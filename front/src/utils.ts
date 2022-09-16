import jwtDecode from "jwt-decode"

export function decodeTokenCredentials() {
  return jwtDecode<any>(window.localStorage.getItem("token") as string)
}
