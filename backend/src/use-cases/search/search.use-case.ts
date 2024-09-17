import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';
import { SearchRequestDTO } from 'src/domain/search/dtos/search.request.dto';

@Injectable()
export class SearchUseCase {
  async execute(dto: SearchRequestDTO) {
    const path = join(__dirname, '../../../src/infrastructure/data/data.json');
    const stream = fs.createReadStream(path, { encoding: 'utf8' });

    let data = '';

    stream.on('data', (chunk) => {
      data += chunk;
    });

    const result: any[] = await new Promise((resolve) => {
      stream.on('end', () => {
        const jsonData = JSON.parse(data);

        if (Array.isArray(jsonData)) {
          const res = jsonData.filter((el: SearchRequestDTO) => {
            if (dto?.number) {
              return dto.number === el.number;
            }
            return dto.email === el.email;
          });

          resolve(res);
        }
      });
    });

    if (!result.length)
      throw new HttpException('Not found', HttpStatus.BAD_REQUEST);
    return result;
  }
}
