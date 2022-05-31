import { Controller, Get } from "@nestjs/common";
import { HttpService } from '@nestjs/common';

@Controller()
export class AppController {

  constructor(private readonly http: HttpService) { }


  @Get('customer-app/min-version')
  customerAppMinVersion() {
    return {
      status: 'success',
      data: global['config'].CUSTOMER_APP_MIN_VER
    }
  }


  @Get('survey-app/min-version')
  surveyAppMinVersion() {
    return {
      status: 'success',
      data: global['config'].SURVEY_APP_MIN_VER
    };
  }
}