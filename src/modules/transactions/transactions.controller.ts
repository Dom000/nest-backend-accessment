import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, DefaultValuePipe, ParseIntPipe, Req } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { JwtGuard } from '../auth/Guard/Jwt.guard';
import { RolesGuard } from '../auth/Guard/Role.guard';
import { UserRole } from '../users/entities/user.entity';
import { Roles } from '../auth/Decorator/Role.decorator';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Transaction } from './entities/transaction.entity';
import { query } from 'express';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Transaction functions")
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) { }

  // @Post("create")
  // create(@Body() createTransactionDto: CreateTransactionDto) {
  //   return this.transactionsService.create(createTransactionDto);
  // }

  @Get("all")
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async findAll(@Req() req: Request, @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10) {
    limit = limit > 100 ? 100 : limit;

    // console.log(`${req.protocol}://${req.host}:${process.env.PORT || 3000}${req.url}`);

    return this.transactionsService.findAll({
      page: page,
      limit: limit,
      route: `${req.protocol}://${req.hostname}:${process.env.PORT || 3000}${req.url}`
    })

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //   return this.transactionsService.findOne(+id);
    // }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    //   return this.transactionsService.update(+id, updateTransactionDto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //   return this.transactionsService.remove(+id);
    // }
  }
}
