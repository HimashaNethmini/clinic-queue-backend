import { DoctorStatus, Specialization } from '@prisma/client';

export class CreateDoctorDto {
  name!: string;

  email!: string;

  phone!: string;

  specialization!: Specialization;

  availableTime!: string;

  status?: DoctorStatus;
}