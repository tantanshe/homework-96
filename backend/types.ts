export interface UserFields {
  email: string;
  password: string;
  token: string;
  role: string;
  displayName: string;
  googleID?: string;
  avatar: string;
}

export interface Ingredient {
  name: string;
  amount: string;
}

export interface CocktailMutation {
  name: string;
  image: string | null;
  recipe: string;
  ingredients: Ingredient[];
  isPublished: boolean;
  user: string,
}