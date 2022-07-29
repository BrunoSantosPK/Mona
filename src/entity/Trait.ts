import { Words } from "./Words";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity({ name: "Traits" })
export class Traits {

    @PrimaryGeneratedColumn({ name: "Id" })
    Id: number;

    @Column({ type: "varchar", name: "Name" })
    Name: string;

    @Column({ type: "varchar", name: "TranslateName" })
    TranslateName: string;

    @OneToMany(() => Words, word => word.TraitId)
    Words: Words[];

}