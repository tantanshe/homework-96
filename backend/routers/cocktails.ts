import express from 'express';
import mongoose from 'mongoose';
import Cocktail from '../models/Cocktail';
import {imagesUpload} from '../multer';
import {CocktailMutation} from '../types';
import auth, {RequestWithUser} from '../middleware/auth';
import permit from '../middleware/permit';

const cocktailsRouter = express.Router();

cocktailsRouter.get('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    const query = req.user?.role === 'admin' ? {} : {isPublished: true};
    const cocktails = await Cocktail.find(query);
    res.json(cocktails);
  } catch (error) {
    next(error);
  }
});

cocktailsRouter.get('/myCocktails', auth, async (req: RequestWithUser, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send({error: 'User not found.'});
    }

    const cocktails = await Cocktail.find({user: req.user._id});
    res.json(cocktails);
  } catch (error) {
    next(error);
  }
});

cocktailsRouter.get('/:id', async (req, res, next) => {
  try {
    const cocktail = await Cocktail.findById(req.params.id);
    if (!cocktail) {
      return res.status(404).send('Cocktail not found');
    }
    res.json(cocktail);
  } catch (error) {
    next(error);
  }
});

cocktailsRouter.post('/', auth, imagesUpload.single('image'), async (req: RequestWithUser, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send({error: 'User not found.'});
    }
    ``;
    const cocktailMutation: CocktailMutation = {
      name: req.body.name,
      image: req.file ? req.file.filename : null,
      recipe: req.body.recipe,
      ingredients: req.body.ingredients,
      isPublished: false,
      user: req.body.user,
    };

    const cocktail = new Cocktail(cocktailMutation);
    await cocktail.save();

    return res.send(cocktail);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

cocktailsRouter.delete('/:id', auth, permit('admin'), async (req: RequestWithUser, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send({error: 'User not found.'});
    }
    await Cocktail.deleteOne({_id: req.params.id});

    res.send({message: 'Cocktail deleted successfully'});
  } catch (error) {
    next(error);
  }
});

cocktailsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req: RequestWithUser, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send({error: 'User not found.'});
    }
    const cocktail = await Cocktail.findById(req.params.id);

    if (!cocktail) {
      return res.status(404).json({error: 'Cocktail not found'});
    }

    cocktail.isPublished = !cocktail.isPublished;
    await cocktail.save();

    res.json(cocktail);
  } catch (error) {
    next(error);
  }
});

export default cocktailsRouter;
