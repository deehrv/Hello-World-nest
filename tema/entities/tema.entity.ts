import { IsNotEmpty } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";

@Entity({name: "tb_tema"})
    export class Tema{

        @PrimaryGeneratedColumn('increment')
        id: number
        
        @IsNotEmpty()
        @Column({length: 100, nullable: false})
        titulo: string

        @IsNotEmpty()
        @Column({length: 100, nullable: false})
        categoria: string

        @OneToMany( () => Postagem, (postagem) => postagem.tema)
        postagem: Postagem[]

        @OneToMany( () => Usuario, (usuario) => usuario.tema)
        usuario: Usuario[]
 }