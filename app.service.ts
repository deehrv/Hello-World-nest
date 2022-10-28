import { Injectable } from '@nestjs/common';
import { syncBuiltinESMExports } from 'module';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Blog pessoal do Gustavo!';
  }
}
