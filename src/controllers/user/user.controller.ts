import { JsonController, Get, Post, Body, Res } from 'routing-controllers'
import { User } from '../../data/models/user.model'
import { Response } from 'express'

@JsonController('/api/users')
export class UserController {
  @Get()
  getAll() {
    return ['user lists']
  }

  @Post('/signup')
  async signup(@Body() body) {
    let user = new User({ ...body })
    user = await user.signupByEmailPassword()

    return user.toObject()
  }

  @Post('/login')
  async login(@Body() body, @Res() res: Response) {
    let user = new User({ ...body })
    if (await user.loginByEmailPassword()) {
      return res.json({ message: 'login success' })
    } else {
      return res.status(403).json({ message: 'login failed' })
    }
  }
}
