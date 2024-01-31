import * as moment from "moment";
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsDate } from 'class-validator';

@Entity({ name: 'todo'})
export class ToDo {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    title: string;

    @Column('text')
    description: string;

    @Column('date', {
        transformer: {
            to(value: Date) {
                return moment(value).format('YYYY-MM-DD');
            },
            from(value: Date) {
                return moment(value).format('YYYY-MM-DD');
            },
        },
    })
    dueDate: Date;

    @Column('bool', {
        default: true
    })
    isActive: boolean

    @Column('text', {
        array: true
    })
    tags: string[];


    
}
