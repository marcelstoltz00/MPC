// apps/backend/src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { validate } from './env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        autoLoadEntities: true,

        synchronize: configService.get<string>('NODE_ENV') === 'development',
      }),
    }),
  ],
})
export class AppModule {}
