import { arrayBuffer } from "stream/consumers";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'todo'})
export class ToDo {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    title: string;

    @Column('text')
    description: string;

    @CreateDateColumn({
        update: false,
    })
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
    tags: string[];
}
