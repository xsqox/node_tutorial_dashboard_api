import { App } from './app';
import { LoggerService } from './logger/logger.service';
import { UsersController } from './users/users.controller';
import { ExceptionFilter } from './errors/exception.filter';

async function bootstrap() {
    const logger = new LoggerService();
    const app = new App(logger, new UsersController(logger), new ExceptionFilter(logger)); // simple dependency injection through a constructo
    await app.init();
}

bootstrap();
