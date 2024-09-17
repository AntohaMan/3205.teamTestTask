import { Body, Controller, Post } from '@nestjs/common';
import { SearchRequestDTO } from 'src/domain/search/dtos/search.request.dto';
import { SearchUseCase } from 'src/use-cases/search/search.use-case';

@Controller('search')
export class SearchController {
  constructor(private searchUseCase: SearchUseCase) {}
  private timeoutId: NodeJS.Timeout;

  @Post()
  async getData(@Body() dto: SearchRequestDTO) {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    const result = await new Promise((resolve) => {
      this.timeoutId = setTimeout(() => {
        resolve(this.searchUseCase.execute(dto));
      }, 5000);
    });

    return result;
  }
}
