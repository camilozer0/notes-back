import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { MinLength, Min } from 'class-validator';

@Entity('Users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('text')
    fullName: string;

    @Column('text', {
        unique: true,
    })
    email: string;

    // Con la opcion select en false, me aseguro que nunca retorne el password en las request
    @Column('text', {
        select: false
    })
    password: string

}
