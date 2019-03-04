import { Document, model, Model, Schema } from 'mongoose'
import { hash, compare } from 'bcrypt'
import { get } from 'config'
import { IUser } from '../../domain/models/user.interface'

export interface IUserDocument extends Document, IUser {
  signupByEmailPassword: () => Promise<IUserDocument>
  loginByEmailPassword: () => Promise<boolean>
}
export interface IUserModel extends Model<IUserDocument> {}

const UserSchema = new Schema({
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true },
})

UserSchema.methods.signupByEmailPassword = async function() {
  // TODO validate
  const saltRounds = get<number>('password.saltRounds')
  this.password = await hash(this.password, saltRounds)
  const user = await this.save()

  return user as IUserDocument
}

UserSchema.methods.loginByEmailPassword = async function() {
  // TODO validate
  const user: IUserDocument = await this.model('User').findOne({
    email: this.email,
  })

  if (user && (await compare(this.password, user.password))) {
    return true
  } else {
    return false
  }
}

export const User = model<IUserDocument, IUserModel>('User', UserSchema)
