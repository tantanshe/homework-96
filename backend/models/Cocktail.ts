import mongoose, {Schema} from 'mongoose';

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: String, required: true },
});

const CocktailSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
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
  ingredients: [ingredientSchema],
});

const Cocktail = mongoose.model('Cocktail', CocktailSchema);
export default Cocktail;
