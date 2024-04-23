import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService){}

    async createToken(userId: number): Promise<string>{
        const payload = { userId };
        return this.jwtService.signAsync(payload);
    }

    async validateUser(token: string): Promise<any>{
        try{
            const decoded = this.jwtService.verify(token);
            return decoded;
        } catch(error){
            return null;
        }
    }
}
