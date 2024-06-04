import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'libs/common/src';
import mongoose from 'mongoose';

@Schema()
export class Plant extends AbstractDocument {  
  @Prop({ required: true })
  type: string;

  @Prop({ required: true, type: [Number] })
  coordinate: [number, number];
}

export const PlantSchema = SchemaFactory.createForClass(Plant);
