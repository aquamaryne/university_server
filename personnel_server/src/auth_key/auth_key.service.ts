import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth_Key } from 'src/entity/key';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthKeyService {
    constructor(
        @InjectRepository(Auth_Key) 
        private authKeyRepository: Repository<Auth_Key>,
        private jwtService: JwtService,
    ){}

    async create(authKey: string): Promise<Auth_Key>{
        try{
            console.log('Attempting to create new auth key: ', authKey);
            const newAuthKey = this.authKeyRepository.create({ auth_key: authKey });
            return this.authKeyRepository.save(newAuthKey);
        } catch (error){
            if (error.code === '23505'){
                throw new ConflictException('Auth key already exists');
            } else if (error.code === 'ER_DUP_ENTRY'){
                throw new ConflictException('Auth key alreay exists');
            } else {
                console.error('Error creating auth key', error);
                throw new InternalServerErrorException('Failed create auth key');
            }
        }
    }

    async validateAuthKey(authKey: string): Promise<boolean>{
        try{
            console.log('Validating auth key: ', authKey);
            const existingAuthKey = await this.authKeyRepository.findOne({
                where: { auth_key: authKey },
            });
    
            return !!existingAuthKey;
        } catch (error){
            console.error('Error validating auth key', error);
            throw new InternalServerErrorException('Failed to validate key');
        }
    }

    generateToken(authkey: Auth_Key): string{
        const payload = { id: authkey.id };
        return this.jwtService.sign(payload);
    }
}
