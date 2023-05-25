import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public healthCheck(): string {
    return 'Hello World!';
  }
}
