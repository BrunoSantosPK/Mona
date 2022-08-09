import { Traits } from "./Trait";
import { FormWords } from "./FormWords";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";

@Entity({ name: "Words" })
export class Words {

    @PrimaryGeneratedColumn({ name: "Id" })
    Id: number;

    @ManyToOne(() => Traits, trait => trait.Words)
    @JoinColumn({ name: "TraitId" })
    TraitId: Traits;

    @Column({ type: "varchar", name: "Name" })
    Name: string;

    @Column({ type: "bool", name: "Positive" })
    Positive: boolean;

    @OneToMany(() => FormWords, formWord => formWord.WordId)
    FormWords: FormWords[];

}