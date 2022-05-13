import { App } from './app';
import { LoggerService } from './logger/logger.service';
import { UsersController } from './users/users.controller';
import { ExceptionFilter } from './errors/exception.filter';
import { Container, ContainerModule, interfaces } from 'inversify';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { IExceptionFilter } from './errors/exception.filter.interface';
import 'reflect-metadata'; // 1 time import on highest level

// dependency injection through constructor
// async function bootstrap() {
//     const logger = new LoggerService();
//     const app = new App(logger, new UsersController(logger), new ExceptionFilter(logger)); // simple dependency injection through a constructo
//     await app.init();
// }

// bootstrap();

// bind all dependencies per module
export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService);
	bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
	bind<UsersController>(TYPES.IUsersController).to(UsersController);
	bind<App>(TYPES.Application).to(App);
});

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

function bootstrap(): IBootstrapReturn {
	// Dependency injection with Inversify
	// bind all deps to container
	const appContainer = new Container();
	appContainer.load(appBindings);
	// get app instance from container
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { appContainer, app };
}

export const { app, appContainer } = bootstrap();
