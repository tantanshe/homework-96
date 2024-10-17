export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
  role: string;
  displayName?: string;
  avatar?: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface Ingredient {
  name: string;
  amount: string;
}

export interface Cocktail {
  _id?: string;
  name: string;
  recipe: string;
  ingredients: Ingredient[];
  image: string | null;
  isPublished: boolean;
}