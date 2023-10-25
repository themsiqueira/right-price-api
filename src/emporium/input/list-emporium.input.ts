import { IsNumber, IsNotEmpty } from "class-validator";

export class ListEmporiumInput {
    @IsNumber()
    @IsNotEmpty()
    id: number;
}
