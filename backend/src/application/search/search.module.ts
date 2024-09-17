import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchUseCase } from 'src/use-cases/search/search.use-case';

@Module({
  controllers: [SearchController],
  providers: [SearchUseCase],
})
export class SearchModule {}
