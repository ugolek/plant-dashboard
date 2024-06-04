import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { Plant } from './plant.schema';

@Schema()
export class FertilizeHistory extends Document {
  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  type: string;

  @Prop({ type: Types.ObjectId, ref: Plant.name, required: true })
  plantId: Types.ObjectId;
}

export const FertilizeHistorySchema = SchemaFactory.createForClass(FertilizeHistory);
