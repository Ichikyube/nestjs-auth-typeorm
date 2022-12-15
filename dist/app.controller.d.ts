import { AppService } from './app.service';
import { Response } from 'express';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    index(req: any): {
        message: string;
    };
    login(res: Response): Promise<void>;
    getHome(req: any): {
        user: any;
    };
    root(): {};
    getProfile(req: any): {
        user: any;
    };
    logout(req: any, res: Response): any;
}
