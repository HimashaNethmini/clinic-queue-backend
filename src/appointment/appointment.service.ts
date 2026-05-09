import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { AppointmentStatus } from '@prisma/client';

@Injectable()
export class AppointmentService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAppointmentDto) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 1. Find available doctor by specialization
    const doctor = await this.prisma.doctor.findFirst({
      where: {
        specialization: dto.specialization,
        status: 'DUTY',
      },
    });

    if (!doctor) {
      throw new Error('No doctor available');
    }

    // 2. Get last token for doctor today
    const lastAppointment = await this.prisma.appointment.findFirst({
      where: {
        doctorId: doctor.id,
        date: today,
      },
      orderBy: {
        tokenNumber: 'desc',
      },
    });

    const nextToken = lastAppointment ? lastAppointment.tokenNumber + 1 : 1;

    // 3. Create appointment
    const appointment = await this.prisma.appointment.create({
      data: {
        patientName: dto.patientName,
        phone: dto.phone,
        specialization: dto.specialization,
        doctorId: doctor.id,
        tokenNumber: nextToken,
        status: AppointmentStatus.WAITING,
        date: today,
      },
    });

    return appointment;
  }

  async getQueue(doctorId: string) {
    return this.prisma.appointment.findMany({
      where: { doctorId },
      orderBy: { tokenNumber: 'asc' },
    });
  }

  async updateStatus(id: string, status: AppointmentStatus) {
    return this.prisma.appointment.update({
      where: { id },
      data: { status },
    });
  }
}