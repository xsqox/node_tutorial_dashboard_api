import { BaseController } from '../common/base.controller';
import { Request, Response, NextFunction } from 'express';
import { HTTPError } from '../errors/http.error';
import {inject, injectable} from "inversify";
import {TYPES} from "../types";
import {ILogger} from "../logger/logger.interface";
import {IUsersController} from "./users.controller.interface";

@injectable()
export class UsersController extends BaseController implements IUsersController  {
    constructor(@inject(TYPES.ILogger) loggerService: ILogger) {
        super(loggerService);
        this.bindRoutes([
            {
                path: '/register',
                method: 'post',
                func: this.register,
            },
            {
                path: '/login',
                method: 'post',
                func: this.login,
            },
        ]);
    }

    login(req: Request, res: Response, next: NextFunction) {
        next(new HTTPError(401, 'Authentication error'));
    }

    register(req: Request, res: Response, next: NextFunction) {
        this.ok(res, 'register');
    }
}
