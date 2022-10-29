import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import { Recipe, Ingredient, Nutrition, Food } from "../model";
import { PayloadAction } from "../node_modules/@reduxjs/toolkit/dist/createAction";

export interface RecipeState {
    recipeState: Recipe;
}

export interface ChangeIngredientAmount {
  id: number,
  newAmount: number
}

const initialState: RecipeState = {
    recipeState: {
        name: "Protein Pancakes",
        portions: 2,
        description: "Delicious pancakes to fit your active lifestyle",
        instructions: [
          { order: 0, description: "Add all the ingredients to a blender. Blend on high speed until smooth" },
          { order: 1, description: "Heat a small amount of oil or butter in a non-stick pan" },
          { order: 2, description: "Cook the pancakes about 2 minutes on each side until brown and cooked through" },
          { order: 3, description: "Serve topped with yoghurt, nut butter or fruits" }
        ],
        ingredients: [
          {
            id: 1,
            food: {
              name: "Oats",
              portions: [
                { amount: 1, name: "g", gramWeight: 1 },
                { amount: 100, name: "g", gramWeight: 100 }
              ],
              nutrition: {
                kcal: 371,
                protein: 11,
                carbohydrates: 64,
                fat: 5.8,
                fibre: 8.3
              }
            },
            quantity: 100,
            portion: { name: "g", amount: 1, gramWeight: 1 }
          },
          {
            id: 2,
            food: {
              name: "Egg",
              portions: [
                { amount: 1, name: "Medium", gramWeight: 55 },
                { amount: 1, name: "Large", gramWeight: 65 }
              ],
              nutrition: {
                kcal: 131,
                protein: 12.6,
                carbohydrates: 0,
                fat: 9
              }
            },
            quantity: 3,
            portion: { amount: 1, name: "Medium", gramWeight: 55 }
          },
          {
            id: 3,
            food: {
            name: "Optimum Nutrition Gold Standard protein powder",
            portions: [
              { amount: 1, name: "Scoop", gramWeight: 30 },
              { amount: 1, name: "g", gramWeight: 1 }
            ],
            nutrition: {
              kcal: 374,
              protein: 82,
              carbohydrates: 4.2,
              fat: 4.7
            }
          },
            quantity: 2,
            portion: { amount: 1, name: "Scoop", gramWeight: 30 }
        },
          {
            id: 4,
            food: {
            name: "Banana",
            portions: [
              { amount: 1, name: "Medium", gramWeight: 118 },
              { amount: 1, name: "g", gramWeight: 1 }
            ],
            nutrition: {
              kcal: 89,
              protein: 1.1,
              carbohydrates: 23,
              fat: 0.3,
              fibre: 2.6
            }
          },
            quantity: 3,
            portion: { amount: 1, name: "Medium", gramWeight: 118 }
        }
        ]
    }
}

export const recipeSlice = createSlice({
    name: "recipe",
    initialState,
    reducers: {
        setIngredientAmount(state: RecipeState, action: PayloadAction<ChangeIngredientAmount>) {
          state.recipeState.ingredients
            .filter(ingredient => ingredient.id == action.payload.id)
            .map(ingredient => ingredient.quantity = action.payload.newAmount);
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.auth,
            };
        },
    },
})

export const { setIngredientAmount } = recipeSlice.actions;

export const selectRecipeState = (state: AppState) => state.recipe.recipeState;

export default recipeSlice.reducer;