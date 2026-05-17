import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { AppointmentStatus } from '@prisma/client';

@Injectable()
export class AppointmentService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAppointmentDto) {
    // START OF TODAY
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    // END OF TODAY
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // FIND AVAILABLE DOCTOR
    const doctor = await this.prisma.doctor.findFirst({
      where: {
        specialization: dto.specialization,
        status: 'DUTY',
      },
    });

    if (!doctor) {
      throw new BadRequestException(
        'No doctor available for this specialization',
      );
    }

    // FIND LAST TOKEN
    const lastAppointment = await this.prisma.appointment.findFirst({
      where: {
        doctorId: doctor.id,
        appointmentDate: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      orderBy: {
        tokenNumber: 'desc',
      },
    });

    // NEXT TOKEN
    const nextToken = lastAppointment
      ? lastAppointment.tokenNumber + 1
      : 1;

    // CREATE APPOINTMENT
    const appointment = await this.prisma.appointment.create({
      data: {
        patientName: dto.patientName,
        phone: dto.phone,
        specialization: dto.specialization,
        doctorId: doctor.id,
        tokenNumber: nextToken,
        status: AppointmentStatus.WAITING,
        appointmentDate: new Date(),
      },
    });

    return appointment;
  }
async getQueueToday() {
  const now = new Date()

  // Get today's date in UTC-safe way
  const startOfDay = new Date(now)
  startOfDay.setUTCHours(0, 0, 0, 0)

  const endOfDay = new Date(now)
  endOfDay.setUTCHours(23, 59, 59, 999)

  const appointments = await this.prisma.appointment.findMany({
    where: {
      appointmentDate: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    orderBy: {
      tokenNumber: 'asc',
    },
  })

  return appointments
}
  async getQueue(doctorId: string) {
    return this.prisma.appointment.findMany({
      where: {
        doctorId,
      },
      orderBy: {
        tokenNumber: 'asc',
      },
    });
  }

  async updateStatus(id: string, status: AppointmentStatus) {
    return this.prisma.appointment.update({
      where: { id },
      data: { status },
    });
  }
}