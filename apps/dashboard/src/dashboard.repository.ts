
import { Inject, Injectable, Logger } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { Plant } from "./schemas/plant.schema";
import { AbstractRepository } from "libs/common/src";


@Injectable()
export class DashboardRepository extends AbstractRepository<Plant> {
    protected readonly logger = new Logger(DashboardRepository.name);

    constructor(
        @InjectModel(Plant.name) orderModel: Model<Plant>,
        @InjectConnection() connection: Connection
    ) {
        super(orderModel, connection);
    }
}