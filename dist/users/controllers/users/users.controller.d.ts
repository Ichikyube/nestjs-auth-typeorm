import { CreateUserDto } from 'src/users/dto/users.dto';
import { UsersService } from 'src/users/users.service';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    root(): {};
    getUsers(): void;
    findUsersById(id: number): Promise<import("../../..").User>;
    createUsers(createUserDto: CreateUserDto): Promise<import("../../..").User>;
}
