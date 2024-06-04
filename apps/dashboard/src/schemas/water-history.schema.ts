import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { Plant } from './plant.schema';

@Schema()
export class WaterHistory extends Document {
  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  amount: string;

  @Prop({ type: Types.ObjectId, ref: Plant.name, required: true })
  plantId: Types.ObjectId;
}

export const WaterHistorySchema = SchemaFactory.createForClass(WaterHistory);
