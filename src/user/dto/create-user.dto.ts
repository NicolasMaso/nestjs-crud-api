import { IsEmail, MinLength, IsNotEmpty } from 'class-validator';
import { EmailIsUnique } from '../validation/email-is-unique.validator';

export class CreateUserDTO {
  @IsNotEmpty({ message: 'Name cannot be empty.' })
  name: string;

  @IsEmail({}, { message: 'Invalid email.' })
  @IsNotEmpty({ message: 'Email cannot be empty.' })
  @EmailIsUnique({ message: 'A user with this email already exists.' })
  email: string;

  @MinLength(6, { message: 'Password must be at least 6 characters.' })
  password: string;
}
