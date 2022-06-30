import { User } from '../../models/user.entity';
import { JWT_SECRET } from '../../config/env.config';
import { sign } from 'jsonwebtoken';
import { JwtPayload } from '../interfaces/jwt.interface';

export class JwtHelper {
  static async signToken(user: User) {
    const payload: JwtPayload = {
      id: user.id,
    };
    return sign(payload, JWT_SECRET, { expiresIn: '1hr' });
  }

  static async refreshJWT(user: User) {
    const token = await this.signToken(user);
    return {
      token,
    };
  }
}
