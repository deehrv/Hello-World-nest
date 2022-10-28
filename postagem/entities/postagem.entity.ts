import { MaxLength } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tema } from "../../tema/entities/tema.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";

@Entity({name: "tb_postagem"})
    export class Postagem{

        @PrimaryGeneratedColumn('increment')
        id: number

        @UpdateDateColumn()
        data: string
        
        @MaxLength(100)
        @Column({length: 100, nullable: true})
        n_compar: string

        @MaxLength(100)
        @Column({length: 100, nullable: true})
        curtida: string

        @MaxLength(100)
        @Column({length: 100, nullable: true})
        leituras: string

        @ManyToOne(() => Tema, (tema) => tema.postagem, {
            onDelete: "CASCADE"
        })
        tema: Tema

        @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
            onDelete: "CASCADE"
        })
        usuario: Usuario
    }