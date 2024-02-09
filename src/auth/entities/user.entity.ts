import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { MinLength, Min } from 'class-validator';

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('text')
    fullName: string;

    @Column('text', {
        unique: true,
    })
    email: string;

    @Column('text')
    password: string

}
