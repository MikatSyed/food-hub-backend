import { Schema, model } from 'mongoose';

const reviewSchema = new Schema(
  {
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: 'Service',  // Assuming you have a 'Service' model
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',  // Assuming you have a 'User' model
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Review = model('Review', reviewSchema);
