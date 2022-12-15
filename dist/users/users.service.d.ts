import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/users.dto';
import { Repository } from 'typeorm';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    createUser(request: CreateUserDto): Promise<User>;
    getUsers(): void;
    findUsersById(userId: number): Promise<User>;
    updateUser(userId: number, request: CreateUserDto): Promise<User>;
    deleteUser(userId: number): Promise<void>;
    findOne(name: string): Promise<User>;
}
