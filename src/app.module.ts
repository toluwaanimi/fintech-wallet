import { Module } from '@nestjs/common';
import { V1Module } from './modules/v1.module';
import { EventsModule } from './events/events.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { DB_URL } from './config/env.config';

const SnakeNamingStrategy =
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('typeorm-naming-strategies').SnakeNamingStrategy;

@Module({
  imports: [
    V1Module,
    EventsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: DB_URL,
      logging: false,
      namingStrategy: new SnakeNamingStrategy(),
      synchronize: true,
      migrationsRun: true,
      entities: [join(__dirname, '../dist/models/**.js')],
      migrations: [join(__dirname, '../dist/migrations/**.js')],
      subscribers: [join(__dirname, '../dist/subscribers/**.js')],
      extra: {
        ssl:
          process.env.NODE_ENV === 'production' ||
          process.env.NODE_ENV === 'staging' ||
          process.env.NODE_ENV === 'development',
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
