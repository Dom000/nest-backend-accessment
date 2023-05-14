import { faker as Faker } from '@faker-js/faker';
import { define } from "typeorm-seeding";
import { User } from "../../modules/users/entities/user.entity"
import { Transaction } from '../../modules/transactions/entities/transaction.entity';
import { TransactionRef } from 'src/modules/transactions/entities/transactionref.entity';

define(User, (faker: typeof Faker) => {
    const user = new User();
    user.first_name = faker.lorem.sentence();
    user.last_name = faker.lorem.sentence();
    user.email = faker.internet.email();
    user.password = faker.internet.password();


    return user;
})