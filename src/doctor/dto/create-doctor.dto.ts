import { DoctorStatus, Specialization } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsString,
} from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  phone!: string;

  @IsEnum(Specialization)
  specialization!: Specialization;

  @IsString()
  availableTime!: string;

  @IsEnum(DoctorStatus)
  status!: DoctorStatus;
}