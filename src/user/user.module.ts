import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user';
import { UserService } from './service/user.service';
import { RoleSchema } from './schemas/role';
import { RoleController } from './controller/role.controller';
import { RoleService } from './service/role.service';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'User', schema: UserSchema },
    { name: 'Role', schema: RoleSchema },
  ])],
  controllers: [UserController, RoleController],
  providers: [UserService, RoleService],
})
export class UserModule {
}
