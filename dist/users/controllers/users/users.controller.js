"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_dto_1 = require("../../dto/users.dto");
const users_service_1 = require("src/users/services/users/users.service");
let UsersController = class UsersController {
};
UsersController = __decorate([
    (0, common_1.Controller)('users')
], UsersController);
exports.UsersController = UsersController;
constructor(private, readonly, userService, users_service_1.UsersService);
{ }
root();
{
    return {};
}
getUsers();
{
    return this.userService.getUsers();
}
findUsersById();
id: number;
{
    return this.userService.findUsersById(id);
}
createUsers();
createUserDto: users_dto_1.CreateUserDto;
{
    return this.userService.createUser(createUserDto);
}
//# sourceMappingURL=users.controller.js.map