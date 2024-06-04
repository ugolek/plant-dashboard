import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { Plant } from './plant.schema';

@Schema()
export class Neighbors extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  relation: string;

  @Prop({ type: Types.ObjectId, ref: Plant.name, required: true })
  plantId: Types.ObjectId;
}

export const NeighborsSchema = SchemaFactory.createForClass(Neighbors);
