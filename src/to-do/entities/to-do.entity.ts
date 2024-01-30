import { arrayBuffer } from "stream/consumers";
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'todo'})
export class ToDo {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    title: string;

    @Column('text')
    description: string;

    @CreateDateColumn({ name: 'createdAt' })
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

    @BeforeInsert()
    dateConvesion() {
        this.createdAt.getDate();
    }
    
}
