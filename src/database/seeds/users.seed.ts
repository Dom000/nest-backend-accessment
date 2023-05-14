import { Factory, Seeder } from "typeorm-seeding";
import { DataSource } from "typeorm";
import { User, UserRole } from "./../../modules/users/entities/user.entity"

export class UsersTableSeeder implements Seeder {
    public async run(factory: Factory, connection: DataSource): Promise<void> {
        await factory(User)().create({
            first_name: 'dev', last_name: "Admin", role: UserRole.ADMIN, address: "admin@dev.com street",
            email: ' admin@dev.com',
            password: 'devAdmin123',
        });
        await factory(User)().create();
    }
}