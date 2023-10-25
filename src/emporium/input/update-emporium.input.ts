import { IsNumber, IsNotEmpty, IsString } from "class-validator";

export class UpdateEmporiumInput {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsNumber()
    @IsNotEmpty()
    id: number;
}
