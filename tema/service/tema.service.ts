import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { Tema } from "../entities/tema.entity";

@Injectable()
export class TemaService{
    constructor(
        @InjectRepository(Tema)
        private temaRepository: Repository<Tema>
        ) { }
        
        async findAll(): Promise<Tema[]>{
        return await this.temaRepository.find()
    }
        
        async findById(id: number): Promise<Tema>{
            let tema = await this.temaRepository.findOne({
                where: {
                    id
                },
                relations:{
                    postagem: true
                }
            })
            if(!tema)
            throw new HttpException('Tema não existe', HttpStatus.NOT_FOUND)
            return tema
        }
        
        async findByTitulo(titulo: string): Promise<Tema[]>{
            return await this.temaRepository.find({
                where: {
                    titulo: ILike(`%${titulo}%`)
                },
                relations:{
                    postagem: true
                }
            })
        }
        
        async findByCategoria(categoria: string): Promise<Tema[]>{
            return await this.temaRepository.find({
                where: {
                    categoria: ILike(`%${categoria}%`)
                },
                relations:{
                    postagem: true
                }
            })
        }
        
        async create(tema: Tema): Promise<Tema>{
            return await this.temaRepository.save(tema)
        }
        
        async update(tema: Tema): Promise<Tema>{
            let buscarTema = await this.findById(tema.id)
            if(!buscarTema || !tema.id)
            throw new HttpException('Tema não existe', HttpStatus.NOT_FOUND)
            return await this.temaRepository.save(tema)
        }

}
