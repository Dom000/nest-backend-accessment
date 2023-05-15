import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { Observable, from, map } from 'rxjs';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class TransactionsService {

  constructor(@InjectRepository(Transaction) private readonly transactionRepo: Repository<Transaction>) { }


  async create(createTransactionDto: CreateTransactionDto) {

    const createTransaction = this.transactionRepo.create(createTransactionDto)
    await this.transactionRepo.save(createTransaction)

    return {
      status: HttpStatus.CREATED,
      message: 'Transaction created',
      data: createTransaction
    };
  }

  findAll(options: IPaginationOptions): Observable<Pagination<Transaction>> {
    return from(paginate<Transaction>(this.transactionRepo, options, {
    })).pipe(
      map((blogEntries: Pagination<Transaction>) => blogEntries)
    )
  }



}
