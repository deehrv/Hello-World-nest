import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { Postagem } from "../entities/postagem.entity";
import { PostagemService } from "../service/postagem.service";

@UseGuards(JwtAuthGuard)
@Controller('/postagens')
export class PostagemController{
    constructor(private readonly PostagemService: PostagemService){}

    @Get()
        @HttpCode(HttpStatus.OK)
             findAll(): Promise<Postagem[]> {
                return this.PostagemService.findAll()
    }

    @Get('/:id')
        @HttpCode(HttpStatus.OK)
            findById(@Param('id', ParseIntPipe) id: number): Promise<Postagem> {
                return this.PostagemService.findById(id)
    }

    @Get('/curtida/:curtida')
        @HttpCode(HttpStatus.OK)
            findByCurtida(@Param('curtida') curtida: string): Promise<Postagem[]>{
                return this.PostagemService.findByCurtida(curtida)
    }

    @Get('/n_compar/:n_compar')
        @HttpCode(HttpStatus.OK)
            findByCompar(@Param('n_compar') n_compar: string): Promise<Postagem[]>{
                return this.PostagemService.findByCompar(n_compar)
    }

    @Get('/data/:data')
        @HttpCode(HttpStatus.OK)
            findByData(@Param('data') data: string): Promise<Postagem[]>{
                return this.PostagemService.findByData(data)
    }

    @Post()
        @HttpCode(HttpStatus.CREATED)
            create(@Body() postagem: Postagem): Promise<Postagem>{
                return this.PostagemService.create(postagem)
    }

    @Put()
        @HttpCode(HttpStatus.OK)
            update(@Body() postagem: Postagem): Promise<Postagem>{
                return this.PostagemService.update(postagem)
    }

}