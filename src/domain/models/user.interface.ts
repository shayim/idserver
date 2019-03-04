import { IUserInfo } from './userInfo.interface'

export interface IUser {
  username: string
  email: string
  password: string
  userInfo: IUserInfo
}
