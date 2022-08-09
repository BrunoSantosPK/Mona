import { Words } from "./Words";
import { Forms } from "./Forms";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity({ name: "FormWords" })
export class FormWords {

    @PrimaryGeneratedColumn({ name: "Id" })
    Id: number;

    @ManyToOne(() => Forms, form => form.FormWords)
    @JoinColumn({ name: "FormId" })
    FormId: number;

    @ManyToOne(() => Words, word => word.FormWords)
    @JoinColumn({ name: "WordId" })
    WordId: number;

    @Column({ type: "int", name: "Group" })
    Group: number;

}