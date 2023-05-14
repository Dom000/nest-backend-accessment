import { Factory, Seeder } from "typeorm-seeding";
import { DataSource, getManager } from "typeorm";
import { User, UserRole } from "./../../modules/users/entities/user.entity"


export class UsersTableSeeder implements Seeder {
    public async run(factory: Factory, connection: DataSource): Promise<void> {
        // await getManager().query('TRUNCATE users');

        await factory(User)().create({
            first_name: 'dev', last_name: "Admin", role: UserRole.ADMIN, address: "admin@dev.com street",
            email: ' admin@dev.com',
            password: 'devAdmin123',

        });


    }
}