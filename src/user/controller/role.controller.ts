import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { RoleService } from '../service/role.service';

@Controller('role')
export class RoleController {

  constructor(private readonly roleService: RoleService) {}

  @Get()
  getAll(@Req() request: Request, @Res() res: Response) {
      this.roleService.findAll(res);
    }

    @Post()
    register(@Req() request: Request, @Res() res: Response) {
      this.roleService.create(request.body, res);
    }
}
