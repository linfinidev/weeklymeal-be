import { ApiProperty } from '@nestjs/swagger';
import { RecipeListItemResponseDto } from './response-recipe-list-item.dto';
import { PaginatedDto } from '@/common/dtos/api-paginated.dto';

export class RecipeListResponseDto extends PaginatedDto<RecipeListItemResponseDto> {
  @ApiProperty({ type: () => RecipeListItemResponseDto, isArray: true })
  declare items: RecipeListItemResponseDto[];
}
