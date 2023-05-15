import { User } from '../../users/entities/user.entity';
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, Entity, Column, ManyToOne } from 'typeorm';
@Entity("transactions")

export class Transaction {


    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    sender: string;

    @Column()
    reciever: string;

    @Column()
    amount: number;


    @Column()
    transaction_ref: string;

    @ManyToOne(() => User, (user) => user.transactions)
    user?: string

    @CreateDateColumn({
        type: 'timestamp',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
    })
    updatedAt: Date;

}
