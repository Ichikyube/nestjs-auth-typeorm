"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../entities/user.entity");
const typeorm_2 = require("typeorm");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async createUser(request) {
        const newUser = this.userRepository.create({
            email: request.email,
            password: request.password,
            username: request.username,
        });
        return this.userRepository.save(newUser);
    }
    getUsers() {
        throw new common_1.BadRequestException('Error doong');
    }
    findUsersById(userId) {
        return this.userRepository.findOne({
            where: {
                id: userId,
            },
        });
    }
    async updateUser(userId, request) {
        const userExist = await this.userRepository.findOne({
            where: {
                id: userId,
            },
        });
        if (userExist) {
            throw new common_1.BadRequestException('data user tidak ditemukan');
        }
        userExist.email = request.email;
        userExist.password = request.password;
        userExist.username = request.username;
        return this.userRepository.save(userExist);
    }
    async deleteUser(userId) {
        const user = await this.userRepository.findOne({
            where: {
                id: userId,
            },
        });
        if (!user) {
            throw new common_1.BadRequestException('user tidak ditemukan');
        }
        this.userRepository.remove(user);
    }
    async findOne(name) {
        return await this.userRepository.findOne({ where: { username: name } });
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map