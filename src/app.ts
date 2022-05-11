import express, { Express } from 'express';
import { Server } from 'http';
import {LoggerService} from "./logger/logger.service";
import {UsersController} from "./users/users.controller";
import {ExceptionFilter} from "./errors/exception.filter";

export class App {
    app: Express;
    server: Server;
    port: number;
    logger: LoggerService
    userController: UsersController
    exceptionFilter: ExceptionFilter

    constructor(logger: LoggerService, usersController: UsersController, exceptionFilter: ExceptionFilter) {
        this.app = express();
        this.port = 7979;
        this.logger = logger;
        this.userController = usersController
        this.exceptionFilter = exceptionFilter
    }

    useRoutes() {
        this.app.use('/users', this.userController.router);
    }

    useExceptionFilters() {
        this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    }

    public async init() {
        this.useRoutes();
        this.useExceptionFilters();
        this.server = this.app.listen(this.port);
        this.logger.log(`Listening on http://localhost:${this.port}`);
    }
}
