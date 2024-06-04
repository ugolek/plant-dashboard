import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

import { CreateFertilizeHistoryDto } from './dto/create-fertilize-history.dto';
import { CreateGrowHistoryDto } from './dto/create-grow-history.dto';
import { CreateNeighborsDto } from './dto/create-neighbors.dto';
import { CreateWaterHistoryDto } from './dto/create-water-history.dto';
import { CreatePlantDto } from './dto/create-plant.request.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'libs/common/src';


@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Post('plant')
  async createPlant(@Body() createPlantDto: CreatePlantDto) {
    return this.dashboardService.createPlant(createPlantDto);
  }

  @Post('grow-history')
  async createGrowHistory(@Body() createGrowHistoryDto: CreateGrowHistoryDto) {
    return this.dashboardService.createGrowHistory(createGrowHistoryDto);
  }

  @Post('neighbors')
  async createNeighbors(@Body() createNeighborsDto: CreateNeighborsDto) {
    return this.dashboardService.createNeighbors(createNeighborsDto);
  }

  @Post('water-history')
  async createWaterHistory(@Body() createWaterHistoryDto: CreateWaterHistoryDto) {
    return this.dashboardService.createWaterHistory(createWaterHistoryDto);
  }

  @Post('fertilize-history')
  async createFertilizeHistory(@Body() createFertilizeHistoryDto: CreateFertilizeHistoryDto) {
    return this.dashboardService.createFertilizeHistory(createFertilizeHistoryDto);
  }

  @Get('plant/:id')
  async getPlant(@Param('id') id: string) {
    return this.dashboardService.getAllPlantData(id);
  }

  @Get('grow-history/:plantId')
  async getGrowHistory(@Param('plantId') plantId: string) {
    return this.dashboardService.getGrowHistoryByPlantId(plantId);
  }

  // Add similar endpoints for neighbors, water history, and fertilize history
}
