import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { Plant } from './plant.schema';

@Schema()
export class GrowHistory extends Document {
  @Prop({ required: true })
  size: string;

  @Prop({ required: true })
  photo: string;

  @Prop({ required: true })
  score: number;

  @Prop({ type: Types.ObjectId, ref: Plant.name, required: true })
  plantId: Types.ObjectId;
}

export const GrowHistorySchema = SchemaFactory.createForClass(GrowHistory);
