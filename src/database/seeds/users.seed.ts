import { Factory, Seeder } from "typeorm-seeding";
import { DataSource } from "typeorm";
import { User, UserRole } from "./../../modules/users/entities/user.entity"
import { Transaction } from "src/modules/transactions/entities/transaction.entity";
import { TransactionRef } from "src/modules/transactions/entities/transactionref.entity";

export class UsersTableSeeder implements Seeder {
    public async run(factory: Factory, connection: DataSource): Promise<void> {
        await factory(User)().create({
            first_name: 'dev', last_name: "Admin", role: UserRole.ADMIN, address: "admin@dev.com street",
            email: ' admin@dev.com',
            password: 'devAdmin123',
        });
        // await factory(User)().create();
        await factory(Transaction)().create()
        await factory(TransactionRef)().create()

    }
}