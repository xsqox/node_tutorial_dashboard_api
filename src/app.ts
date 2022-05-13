import express, { Express } from 'express';
import { Server } from 'http';
import {UsersController} from "./users/users.controller";
import {ExceptionFilter} from "./errors/exception.filter";
import {ILogger} from "./logger/logger.interface";
import {inject, injectable} from "inversify";
import {TYPES} from "./types";

// must be marked as injectable
@injectable()
export class App {
    app: Express;
    server: Server;
    port: number;

    // injecting dependencies
    constructor(@inject(TYPES.ILogger) private logger: ILogger,
                @inject(TYPES.IUsersController) private userController: UsersController,
                @inject(TYPES.ExceptionFilter) private exceptionFilter: ExceptionFilter) {
        this.app = express();
        this.port = 7979;
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
