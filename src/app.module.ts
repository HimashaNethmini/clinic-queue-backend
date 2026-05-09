import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DoctorService } from './doctor/doctor.service';
import { DoctorModule } from './doctor/doctor.module';
import { DoctorController } from './doctor/doctor.controller';
import { PrismaModule } from 'prisma/prisma.module';


@Module({
  imports: [DoctorModule, PrismaModule],
  controllers: [AppController, DoctorController],
  providers: [AppService, DoctorService],
})
export class AppModule {}
