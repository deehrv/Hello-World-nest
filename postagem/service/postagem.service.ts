import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { Postagem } from "../entities/postagem.entity";

@Injectable()
export class PostagemService {
    constructor(
        @InjectRepository(Postagem)
        private PostagemRepository: Repository<Postagem>
    ) { }

    async findAll(): Promise<Postagem[]> {
        return await this.PostagemRepository.find({
            relations:{
                usuario: true,
                tema: true
            }
        })
    }

    async findById(id: number):Promise<Postagem> {

            let postagem = await this.PostagemRepository.findOne({
                where: { 
                    id
                },
                relations:{
                    usuario: true,
                    tema: true
                }
            })

        if (!postagem)
            throw new HttpException('Postagem não existe', HttpStatus.NOT_FOUND)

        return postagem
    }

    async findByCurtida(curtida: string): Promise<Postagem[]> {
        return await this.PostagemRepository.find({
            where: {
                curtida: ILike(`%${curtida}%`)
            },
            relations:{
                usuario: true,
                tema: true
            }
        })
    }

    async findByCompar(n_compar: string): Promise<Postagem[]> {
        return await this.PostagemRepository.find({
            where: {
                n_compar: ILike(`%${n_compar}%`)
            },
            relations:{
                usuario: true,
                tema: true
            }
        })
    }

    async findByData(data: string): Promise<Postagem[]> {
        return await this.PostagemRepository.find({
            where: {
                data: ILike(`%${data}%`)
            },
            relations:{
                usuario: true,
                tema: true
            }
        })
    }

    async create(postagem: Postagem): Promise<Postagem>{
        return await this.PostagemRepository.save(postagem)
    }

    async update(postagem: Postagem): Promise<Postagem>{
        let buscarPostagem = await this.findById(postagem.id)
    
        if(!buscarPostagem || !postagem.id)
            throw new HttpException('A postagem não existe', HttpStatus.NOT_FOUND)

            return await this.PostagemRepository.save(postagem)
    }

}