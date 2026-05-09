import { Injectable, UnauthorizedException } from '@nestjs/common';

import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    if (username === 'admin' && password === 'admin123') {
      return {
        success: true,
        message: 'Login successful',
      };
    }

    throw new UnauthorizedException('Invalid credentials');
  }
}