import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ConfigModule.forRoot(),UsersModule,TypeOrmModule.forRoot({
    type: 'postgres', 
    host: 'localhost', 
    port: 5432, 
    username: 'postgres', 
    password: 'sandeep16', 
    database: 'document_dashboard', 
    entities:[__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true, 
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
