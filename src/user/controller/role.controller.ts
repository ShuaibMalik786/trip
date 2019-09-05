import { Controller, Get, Post, Req, Res, Body, Delete, Param, Put } from '@nestjs/common';
import { Request, Response } from 'express';
import { RoleService } from '../service/role.service';
import { RoleDto } from '../class-validator/role';

@Controller('api/role')
export class RoleController {

  constructor(private readonly roleService: RoleService) { }

  @Get()
  getAll(@Req() request: Request, @Res() res: Response) {
    this.roleService.findAll(res);
  }

  @Get(':id')
  getOne(@Req() request: Request, @Param('id') id) {
    const role = this.roleService.findOne(id);
    return role
  }


  @Post()
  register(@Req() request: Request, @Res() res: Response, @Body() role: RoleDto) {
    this.roleService.create(request.body, res);
  }

  @Put(':id')
  updateRole(@Body() role: RoleDto, @Param('id') id) {
    const emp = this.roleService.updateRole(id, role);
    return emp;
  }

  @Delete(':id')
  deleteRole(@Param('id') id) {
    const role = this.roleService.deleteRole(id);
    return role;
  }
}
