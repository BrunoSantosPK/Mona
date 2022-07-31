import { FormWords } from "./FormWords";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity({ name: "Forms" })
export class Forms {

    @PrimaryGeneratedColumn({ name: "Id" })
    Id: number;

    @Column({ type: "varchar", name: "Name" })
    Name: string;

    @OneToMany(() => FormWords, formWord => formWord.FormId)
    FormWords: FormWords[];

}