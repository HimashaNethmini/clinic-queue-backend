import { IsString, IsEnum } from 'class-validator';
import { Specialization} from '@prisma/client';
import { AppointmentStatus } from '@prisma/client';

export class CreateAppointmentDto {
  @IsString()
  patientName!: string;

  @IsString()
  phone!: string;

  @IsEnum(Specialization)
  specialization!: Specialization;
}

export class AppointmentResponseDto {
  id: string;
  patientName: string;
  phone: string;
  doctorId: string;
  tokenNumber: number;
  status: AppointmentStatus;
  date: Date;
}