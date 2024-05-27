import { Schema, model } from 'mongoose';

const recipeSchema = new Schema(
  {
    recipeName: {
      type: String,
      required: true,
    },
    recipeImage: {
      type: String,
      required: true,
    },
    recipeDetails: {
      type: String,
      required: true,
    },
    embeddedVideoCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    creatorEmail: {
      type: String,
      required: true,
    },
    watchCount: {
      type: Number,
      default: 0,
    },
    purchased_by: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Recipe = model('Recipe', recipeSchema);
