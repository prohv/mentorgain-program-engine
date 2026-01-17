import { Module } from '@nestjs/common';
import { ProgramService } from './program.service';
import { ProgramController } from './program.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [ProgramController],
  providers: [ProgramService],
  imports: [PrismaModule],
})
export class ProgramModule {}
