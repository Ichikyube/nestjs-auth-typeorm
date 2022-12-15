import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/users.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(request: CreateUserDto) {
    const newUser = this.userRepository.create({
      email: request.email,
      password: request.password,
      username: request.username,
    });
    return this.userRepository.save(newUser);
  }
  getUsers() {
    throw new BadRequestException('Error doong');
  }

  findUsersById(userId: number) {
    return this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
  }

  async updateUser(userId: number, request: CreateUserDto) {
    const userExist = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (userExist) {
      throw new BadRequestException('data user tidak ditemukan');
    }

    userExist.email = request.email;
    userExist.password = request.password;
    userExist.username = request.username;
    //update pakai typeorm
    return this.userRepository.save(userExist);
    //update pakai querybuilder
    //return this.userRepository
    //  .createQueryBuilder()
    //  .update(userExist)
    //  .where('id = :userid', { userid: userId })
    //.getQuery();
  }
  async deleteUser(userId: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new BadRequestException('user tidak ditemukan');
    }
    this.userRepository.remove(user);
  }

  async findOne(name: string) {
    return await this.userRepository.findOne({ where: { username: name } });
  }
}

// This should be a real class/interface representing a user entity
// export type User = {
//   userId: number;
//   username: string;
//   password: string;
// };

//@Injectable()
// export class UsersService {
//   private readonly users: User[] = [
//     {
//       userId: 1,
//       username: 'john',
//       password: 'changeme',
//     },
//     {
//       userId: 2,
//       username: 'maria',
//       password: 'guess',
//     },
//   ];

//   async findOne(username: string): Promise<User | undefined> {
//     return this.users.find((user) => user.username === username);
//   }
// }
