import { Controller, Get, Post } from '@nestjs/common';
import { HttpService } from '@nestjs/common';

const fs = require('fs');
const path = require('path');

@Controller()
export class AppController {
  constructor(
    private readonly http: HttpService,
  ) {}

}


