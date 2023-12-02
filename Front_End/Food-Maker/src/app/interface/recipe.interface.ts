import { ICategory } from "./category.interface"

export interface IAvailableRecipeIngredient {
    id?:            number;
    name:          string;
    description:   string;
    quantity:      number;
}

export interface IAvailableRecipeReceta {
    idreceta:          number;
    nombre:            string;
    descripcion:       string;
    descripcioncorta:  string;
    instrucciones:     string;
    tiempopreparacion: number;
    idcategoria:       number;
    imagen:            null;
    objCategoria: {
        idcategoria: number;
        nombre:      string;
    };
}

export interface IAvailableRecipeResponseBase {
    receta: IAvailableRecipeReceta;
    ingredientes: {
        idingrediente?: number;
        nombre:        string;
        descripcion:   string;
        cantidad:      number;
    }[];
}

export interface IAvailableRecipeResponse extends IAvailableRecipeResponseBase {
    cantidadCoincidencias: number;
}

export interface IAvailableRecipeBase {
    id:          number;
    name:            string;
    description:       string;
    shortDescription:  string;
    instruction:     string;
    cookingTime: number;
    categoryId:       number;
    image:            string;
    category: ICategory;
}

export interface IAvailableRecipes extends IAvailableRecipeBase {
    ingredients: IAvailableRecipeIngredient[]
}

export interface IParamFetchAvailableRecipes {
    cookingTime: number
}

export interface IFetchAvailableRecipesBody {
    tiempodecocina: number
}

export interface IParamFetchAvailableRecipesByCategory {
    categoryId: number
}

export interface IParamFetchAddRecipeBody {
    recipes: IAvailableRecipes
}