import { Traits } from "./Trait";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity({ name: "GamerTypes" })
export class GamerTypes {

    @PrimaryGeneratedColumn({ name: "Id" })
    Id: number;

    @ManyToOne(() => Traits, trait => trait.Words)
    @JoinColumn({ name: "TraitId" })
    TraitId: Traits;

    @Column({ type: "bool", name: "Positive" })
    Positive: boolean;

    @Column({ type: "varchar", name: "Name" })
    Name: string;

    @Column({ type: "varchar", name: "Description" })
    Description: string;

}