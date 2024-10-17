import mongoose, {Schema} from 'mongoose';

const CocktailSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  recipe: {
    type: String,
    required: true,
  },
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
  ingredients: [
    {
      name: String,
      quantity: String,
    }
  ],
});

const Cocktail = mongoose.model('Cocktail', CocktailSchema);
export default Cocktail;
