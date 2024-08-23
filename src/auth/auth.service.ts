import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async signIn(loginUserDto: LoginUserDto) {
        const user = await this.usersService.findOneByEmail(loginUserDto.email)
        if (!user) {
            throw new ForbiddenException('The user with this email doesnt exist')
        }
        const isMatchPassword = await bcrypt.compare(loginUserDto.password, user.password)
        if (!isMatchPassword) {
            throw new UnauthorizedException('Wrong password')
        }
  
        const payload = { sub: user.id, email: user.email }
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async register(createUserDto: CreateUserDto) {
        const user = await this.usersService.findOneByEmail(createUserDto.email)
        if (user) {
            throw new ForbiddenException('The user with this email is already exists')
        }
        const hash = await bcrypt.hash(createUserDto.password, 10)
        return await this.usersService.create({...createUserDto, password: hash})
    }
}
