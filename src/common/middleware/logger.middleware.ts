import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class RouteLogger implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const currentTime = new Date().toDateString();
    const colors = {
      reset: '\x1b[0m',
      red: '\x1b[31m',
      green: '\x1b[32m',
      blue: '\x1b[34m',
    };
    console.log(
      `${colors.blue}Visited route: ${req.method} ${req.path} at ${currentTime}${colors.reset}`,
    );
    next();
  }
}
