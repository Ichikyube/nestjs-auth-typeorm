import { ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
export declare class AuthExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void;
}
