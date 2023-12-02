import { IAvailableRecipeBase } from "./recipe.interface";

export interface ICollection {
    name:  string;
    id:      number;
    recipes: IAvailableRecipeBase[];
}

export interface ICollectionResponse {
    nomnre:  string;
    id:      number;
    recetas: {
        idreceta:          number;
        nombre:            string;
        descripcion:       string;
        descripcioncorta:  string;
        instrucciones:     string;
        tiempopreparacion: number;
        idcategoria:       number;
        imagen:            null;
        objCategoria:      {
            idcategoria: number;
            nombre:      string;
        };
    }[];
}

export interface ICollectionGetCollectionById {
    id: number;
}

export interface IParamsCollectionFetchDeleteOne {
    id: number
}

