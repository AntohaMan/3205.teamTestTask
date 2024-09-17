import { Module } from '@nestjs/common';
import { SearchModule } from './search/search.module';

@Module({
  controllers: [],
  imports: [SearchModule],
})
export class ApplicationModule {}
