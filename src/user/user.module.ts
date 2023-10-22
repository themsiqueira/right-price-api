import { Module } from '@nestjs/common'

import { CreateUser } from '@app/user/usecases/create-user'
import { DeleteUser } from '@app/user/usecases/delete-user'
import { GetUser } from '@app/user/usecases/get-user'
import { ListUser } from '@app/user/usecases/list-user'
import { Login } from '@app/user/usecases/login'
import { UpdateUser } from '@app/user/usecases/update-user'

@Module({
  imports: [],
  providers: [CreateUser, DeleteUser, GetUser, ListUser, Login, UpdateUser],
  exports: [CreateUser, DeleteUser, GetUser, ListUser, Login, UpdateUser]
})
export class UserModule {}
