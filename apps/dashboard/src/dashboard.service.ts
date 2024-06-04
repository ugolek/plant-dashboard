import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreatePlantDto } from './dto/create-plant.request.dto';
import { CreateFertilizeHistoryDto } from './dto/create-fertilize-history.dto';
import { CreateGrowHistoryDto } from './dto/create-grow-history.dto';
import { CreateNeighborsDto } from './dto/create-neighbors.dto';
import { CreateWaterHistoryDto } from './dto/create-water-history.dto';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel('Plant') private readonly plantModel: Model<any>,
    @InjectModel('GrowHistory') private readonly growHistoryModel: Model<any>,
    @InjectModel('Neighbors') private readonly neighborsModel: Model<any>,
    @InjectModel('WaterHistory') private readonly waterHistoryModel: Model<any>,
    @InjectModel('FertilizeHistory') private readonly fertilizeHistoryModel: Model<any>,
  ) {}

  async createPlant(createPlantDto: CreatePlantDto): Promise<any> {
    const createdPlant = new this.plantModel(createPlantDto);
    return createdPlant.save();
  }

  async createGrowHistory(createGrowHistoryDto: CreateGrowHistoryDto): Promise<any> {
    const createdGrowHistory = new this.growHistoryModel(createGrowHistoryDto);
    return createdGrowHistory.save();
  }

  async createNeighbors(createNeighborsDto: CreateNeighborsDto): Promise<any> {
    const createdNeighbors = new this.neighborsModel(createNeighborsDto);
    return createdNeighbors.save();
  }

  async createWaterHistory(createWaterHistoryDto: CreateWaterHistoryDto): Promise<any> {
    const createdWaterHistory = new this.waterHistoryModel(createWaterHistoryDto);
    return createdWaterHistory.save();
  }

  async createFertilizeHistory(createFertilizeHistoryDto: CreateFertilizeHistoryDto): Promise<any> {
    const createdFertilizeHistory = new this.fertilizeHistoryModel(createFertilizeHistoryDto);
    return createdFertilizeHistory.save();
  }

  async getPlantById(id: string): Promise<any> {
    return this.plantModel.findById(id).exec();
  }

  async getGrowHistoryByPlantId(plantId: string): Promise<any> {
    return this.growHistoryModel.find({ plantId }).exec();
  }

  async getAllPlantData (id: string): Promise<any> {
    const plant = await this.plantModel.findById(id).exec();
    const growHistory = await this.growHistoryModel.find({ plantId: id }).exec();
    const neighbors = await this.neighborsModel.find({ plantId: id }).exec();
    const waterHistory = await this.waterHistoryModel.find({ plantId: id }).exec();
    const fertilizeHistory = await this.fertilizeHistoryModel.find({ plantId: id }).exec();
    return { plant, growHistory, neighbors, waterHistory, fertilizeHistory };
  }


  // Add similar methods for getting neighbors, water history, and fertilize history by plantId
}
