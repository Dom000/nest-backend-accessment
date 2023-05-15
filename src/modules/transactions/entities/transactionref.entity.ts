import { User } from '../../users/entities/user.entity';
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, Entity, Column, ManyToOne } from 'typeorm';
@Entity("transactionref")

export class TransactionRef {


    @PrimaryGeneratedColumn()
    id: string;

    @Column({ unique: true })
    ref: string;

    @Column()
    reciever: string;


    @Column()
    validiy: Date;


    @Column({ default: false })
    expired: boolean;


    @Column()
    refowner: string;


    @ManyToOne(() => User, (user) => user.transactionref)
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
