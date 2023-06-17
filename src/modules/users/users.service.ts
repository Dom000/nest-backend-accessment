import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as argon from "argon2"
import { Request } from 'express';
import { TransactionRef } from "../transactions/entities/transactionref.entity"
import { FundWalletDto } from './dto/fundwallet.dto';
import { TransactionsService } from '../transactions/transactions.service';
import * as os from "os"
@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>, @InjectRepository(TransactionRef) private readonly transactionrefRepo: Repository<TransactionRef>, private transactionService: TransactionsService) { }
  async create(createUserDto: CreateUserDto) {
    os.homedir()
    try {
      // CHECK IF USER EMAIL OR PHONE ALREADY EXIST
      const checkEmail = await this.userRepo.findOne({
        where: {
          email: createUserDto.email,
        }
      })

      if (checkEmail) {
        return {
          status: HttpStatus.CONFLICT,
          message: "Email already exists kindly login"
        }
      }

      const hashedPassword = await argon.hash(createUserDto.password);
      const user = this.userRepo.create({
        address: createUserDto.address,
        email: createUserDto.email,
        password: hashedPassword,
        first_name: createUserDto.first_name,
        last_name: createUserDto.last_name,
        role: createUserDto.role
      })
      await this.userRepo.save(user);

      return {
        status: HttpStatus.CREATED,
        message: "User created successfully",
      }
    } catch (error) {

    }

  }

  async findOne(req: Request) {

    const data = await this.userRepo.findOne({
      where: { id: req.user['id'] }, relations: {
        transactionref: true,
        transactions: true
      }
    })
    delete data.password
    return data;
  }


  async findAll() {
    const data = await this.userRepo.find()
    data.forEach((item) => {
      delete item.password

    })
    return data;
  }




  async generateRef(req: Request) {

    // refs to last only for 30 seconds ,15sec is too small for testing purposes
    const validitydate = new Date()
    validitydate.setSeconds(validitydate.getSeconds() + 30)
    const username = req.user["first_name"]


    const generateref = () => {
      const date = new Date()
      return username.slice(0, 3) + date.toISOString()
    }

    const ref = generateref()
    const refToCreate = this.transactionrefRepo.create({
      user: req.user['id'], refowner: req.user['id'], ref: ref, validiy: validitydate.toISOString(), reciever: req.user["first_name"]
    });
    await this.transactionrefRepo.save(refToCreate);


    return {
      status: HttpStatus.CREATED,
      message: "ref created",
      ref: ref
    }

  }

  async update(req: Request, updateUserDto: UpdateUserDto) {

    const updateuser = await this.userRepo.update(req.user["id"], {
      address: updateUserDto.address
    });

    return {
      status: HttpStatus.OK,
      message: "address updated"
    }
  }


  async fundwallet(req: Request, fundwalletdto: FundWalletDto) {

    const user = await this.userRepo.findOne({
      where: {
        id: req.user['id']
      }, relations: {
        transactionref: true
      }
    })





    const userRefs = user.transactionref.map((refs) => { return refs.ref })


    // checking senders account ballnce is not 0 or less than what his sendin
    if (req.user['wallet'] < fundwalletdto.amount
    ) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: "insufficient balance"
      }
    } else if
      // making sure you are not sending to your own ref from your account
      (userRefs.includes(fundwalletdto.ref)) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: "This ref belongs to you, send to another ref or let someone send to you "
      }
    } else {

      // find ref in db
      const findRefOwnerRef = await this.transactionrefRepo.findOne({
        where: {
          ref: fundwalletdto.ref
        }
      })


      // checking if ref exists
      if (!findRefOwnerRef) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: "This ref does not exist"
        }
      }

      const date = new Date()
      date.toISOString()

      // checking if ref is still valid
      if (findRefOwnerRef.validiy < date) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: "This ref is expired"
        }
      }

      // check if ref has already been used

      if (findRefOwnerRef.expired) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: "This ref has already been used"
        }
      }

      // find the ref owner to add his balance
      const findRefOwner = await this.userRepo.findOne({
        where: {
          id: findRefOwnerRef.refowner
        }
      })


      // updating ref owners balance after finding him
      const addRefOwnerBalance = await this.userRepo.update(findRefOwner.id, {
        wallet: fundwalletdto.amount + findRefOwner.wallet
      })

      await this.userRepo.save(addRefOwnerBalance.raw)


      // update the senders balance 
      const updateSenderBalance = await this.userRepo.update(user.id, {
        wallet: user.wallet - fundwalletdto.amount
      })

      await this.userRepo.save(updateSenderBalance.raw)

      //   update ref as used
      const updateOwnerRef = await this.transactionrefRepo.update(findRefOwnerRef.id, {
        expired: true
      })
      await this.transactionrefRepo.save(updateOwnerRef.raw)

      //   create transactions

      const transaction1 = await this.transactionService.create({
        amount: fundwalletdto.amount, reciever: findRefOwner.id, transaction_ref: fundwalletdto.ref, sender: req.user['id'], user: req.user['id']
      })
      const transaction2 = await this.transactionService.create({
        amount: fundwalletdto.amount, reciever: findRefOwner.id, transaction_ref: fundwalletdto.ref, sender: req.user['id'], user: findRefOwner.id
      })

      // await this.transactionService.save(createTransaction.raw)




      return {
        status: HttpStatus.OK,
        message: "Ref funded successfully",
        reciever: findRefOwner.first_name + " " + findRefOwner.last_name
      };

    }


  }


  async getwalletbalance(req: Request) {
    const user = await this.userRepo.findOne({
      where: {
        id: req.user["id"]
      }
    })

    return {
      status: HttpStatus.OK,
      message: "Wallet balance",
      balance: user.wallet
    }
  }
}
