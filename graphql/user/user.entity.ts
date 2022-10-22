import { User } from "@prisma/client";

export class UserEntity implements User {
  id!: number;
  email!: string;
  password!: string;
  createdAt!: Date;
  updatedAt!: Date;
  roleId: number = 1;
  is_active: boolean = false;
  is_deleted: boolean = false;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  } 
}
