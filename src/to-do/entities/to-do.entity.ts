import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ToDo {

    @PrimaryGeneratedColumn()
    id: string;

    title: string;

    description: string;

    dateOfCreation: Date;

    dueDate: Date;

    label: string[];
}
