import { IsEmail, MinLength, IsNotEmpty, IsOptional } from 'class-validator';
import { EmailIsUnique } from '../validation/email-is-unique.validator';

export class UpdateUserDTO {
  @IsNotEmpty({ message: 'Name cannot be empty.' })
  @IsOptional()
  name: string;

  @IsEmail({}, { message: 'Invalid email.' })
  @IsNotEmpty({ message: 'Email cannot be empty.' })
  @EmailIsUnique({ message: 'A user with this email already exists.' })
  @IsOptional()
  email: string;

  @MinLength(6, { message: 'Password must be at least 6 characters.' })
  @IsOptional()
  password: string;
}
