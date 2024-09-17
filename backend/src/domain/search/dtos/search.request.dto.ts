import { IsEmail, IsOptional, IsString } from 'class-validator';

export class SearchRequestDTO {
  @IsString()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  number: string;
}
