import { AppService } from './app.service';
import { Response } from 'express';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    login(res: Response): Promise<void>;
    index(req: any): {
        message: any;
    };
    getHome(req: any): {
        user: any;
    };
    getProfile(req: any): {
        user: any;
    };
    logout(req: any, res: Response): any;
    getHello(req: any): string;
}
