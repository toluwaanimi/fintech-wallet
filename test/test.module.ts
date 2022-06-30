import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { TEST_DB_URL } from '../src/config/env.config';
import { EventsModule } from '../src/events/events.module';
import { V1Module } from '../src/modules/v1.module';

const SnakeNamingStrategy =
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('typeorm-naming-strategies').SnakeNamingStrategy;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: TEST_DB_URL,
      logging: false,
      namingStrategy: new SnakeNamingStrategy(),
      synchronize: true,
      migrationsRun: true,
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      migrations: [join(__dirname, '../dist/migrations/**.js')],
      extra: {
        ssl:
          process.env.NODE_ENV === 'production' ||
          process.env.NODE_ENV === 'staging' ||
          process.env.NODE_ENV === 'development',
      },
    }),
    V1Module,
    EventsModule,
  ],
  controllers: [],
  providers: [],
})
export class TestModule {}
