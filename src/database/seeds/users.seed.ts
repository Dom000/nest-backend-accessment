import { Factory, Seeder } from "typeorm-seeding";
import { DataSource, getManager } from "typeorm";
import { User, UserRole } from "./../../modules/users/entities/user.entity"
import * as argon from "argon2";


export class UsersTableSeeder implements Seeder {


    public async run(factory: Factory, connection: DataSource): Promise<void> {
        // await getManager().query('TRUNCATE users');
        const hashedpassword = await argon.hash('devAdmin123')

        await factory(User)().create({
            first_name: 'dev', last_name: "Admin", role: UserRole.ADMIN, address: "admin@dev.com street",
            email: ' admin@dev.com',
            password: hashedpassword.toLocaleLowerCase(),
            wallet: 1000000

        });


    }
}