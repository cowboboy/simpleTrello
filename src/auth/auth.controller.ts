import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @ApiOperation({ summary: "authorization" })
    @ApiResponse({ status: HttpStatus.OK, description: "Success", type: typeof {access_token: String}})
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
    login(@Body() loginUserDto: LoginUserDto) {
        return this.authService.signIn(loginUserDto);
    }

    @Post('registration')
    register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);
    }
}
