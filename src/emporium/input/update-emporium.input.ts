import { UserEntity } from "@app/user/entities/user.entity";
import { IsNumber, IsNotEmpty, IsString, IsDate } from "class-validator";
import { Relation } from "typeorm";

export class UpdateEmporiumInput {
    @IsString()
    name: string;

    userId: Relation<UserEntity>;

    @IsString()
    address: string;

    @IsDate()
    expiresAt: Date;

    @IsString()
    @IsNotEmpty()
    id: string;
}
