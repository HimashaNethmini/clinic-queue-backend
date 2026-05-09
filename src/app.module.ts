import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServiceModule } from './doctor/service/service.module';
import { DoctorService } from './doctor/doctor.service';
import { DoctorController } from './doctor/doctor.controller';

@Module({
  imports: [ServiceModule],
  controllers: [AppController, DoctorController],
  providers: [AppService, DoctorService],
})
export class AppModule {}
