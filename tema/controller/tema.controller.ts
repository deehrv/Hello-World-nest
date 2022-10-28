import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { Tema } from "../entities/tema.entity";
import { TemaService } from "../service/tema.service";

@UseGuards(JwtAuthGuard)
@Controller('/tema')
export class TemaCrontoller{
    constructor(private readonly temaService: TemaService){}

    @Get()
        @HttpCode(HttpStatus.OK)
             findAll(): Promise<Tema[]> {
                return this.temaService.findAll()
    }

    @Get('/:id')
        @HttpCode(HttpStatus.OK)
            findById(@Param('id', ParseIntPipe) id: number): Promise<Tema> {
                return this.temaService.findById(id)
    }

    @Get('/titulo/:titulo')
        @HttpCode(HttpStatus.OK)
            findByTitulo(@Param('titulo') titulo:string): Promise<Tema[]>{
                return this.temaService.findByTitulo(titulo)
    }

    @Post()
        @HttpCode(HttpStatus.CREATED)
            create(@Body() tema: Tema): Promise<Tema>{
                return this.temaService.create(tema)
    }

    @Put()
        @HttpCode(HttpStatus.OK)
            update(@Body() tema: Tema): Promise<Tema>{
                return this.temaService.update(tema)
    }

}