import { Transaction } from 'src/modules/transactions/entities/transaction.entity';
import { TransactionRef } from 'src/modules/transactions/entities/transactionref.entity';
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, Entity, Column, OneToMany } from 'typeorm';

export enum UserRole {
    ADMIN = "admin",
    USER = "user",
}

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    first_name: string;

    @Column()
    last_name: string;


    @Column()
    address: string;

    @Column({
        unique: true,
    })
    email: string;

    @Column()
    password: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER,
    })
    role: UserRole

    @OneToMany(() => Transaction, transaction => transaction.user)
    transactions?: Transaction[];


    @OneToMany(() => TransactionRef, transactionref => transactionref.user)
    transactionref?: TransactionRef[];

    @CreateDateColumn({
        type: 'timestamp',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
    })
    updatedAt: Date;
}