import { arrayBuffer } from "stream/consumers";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'toDo'})
export class ToDo {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    title: string;

    @Column('text')
    description: string;

    @Column('date')
    createdAt: Date;

    @Column('date')
    dueDate: Date;

    @Column('bool', {
        default: true
    })
    isActive: boolean

    @Column('text', {
        array: true
    })
    label: string[];
}
