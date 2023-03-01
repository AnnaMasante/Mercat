import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  private saltRounds = 10;

  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  checkPassword(password, hashedPassword): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
