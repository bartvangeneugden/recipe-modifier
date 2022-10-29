import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Columns from 'react-bootstrap/Column';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Ingredient, Nutrition, Recipe } from '../model';
import { setIngredientAmount } from "../store/recipeSlice";
import { useDispatch } from "react-redux";

function nutritionForGrams(nutrition: Nutrition, grams: number): Nutrition {
  var result: Nutrition = {
      kcal: nutrition.kcal / 100 * grams,
      protein: nutrition.protein / 100 * grams,
      carbohydrates: nutrition.carbohydrates / 100 * grams,
      fat: nutrition.fat / 100 * grams,
  }
  if (nutrition.fibre) {
      result.fibre = nutrition.fibre / 100 * grams;
  }
  return result;
}


function getNutritionForPortion(ingredient: Ingredient): Nutrition {
  return nutritionForGrams(ingredient.food.nutrition, ingredient.portion.gramWeight * ingredient.quantity);
}

function totalNutritionForRecipe(recipe: Recipe): Nutrition {
  return recipe.ingredients
      .map(ingredient => getNutritionForPortion(ingredient))
      .reduce((prev, curr) => {
          return {
              kcal: prev.kcal + curr.kcal,
              carbohydrates: prev.carbohydrates + curr.carbohydrates,
              protein: prev.protein + curr.protein,
              fat: prev.fat + curr.fat,
              fibre: prev?.fibre + curr?.fibre
          }
      });
}

function nutritionPerPortion(recipe: Recipe): Nutrition {
  var totalNutrition = totalNutritionForRecipe(recipe);
  return {
      kcal: totalNutrition.kcal / recipe.portions,
      carbohydrates: totalNutrition.carbohydrates / recipe.portions,
      protein: totalNutrition.protein / recipe.portions,
      fat: totalNutrition.fat / recipe.portions,
      fibre: totalNutrition.fibre / recipe.portions
  };
}

export default function RecipeCard(props: {recipeData: Recipe}) {
  var totalNutrition: Nutrition = {kcal: 0, carbohydrates: 0, protein: 0, fat: 0, fibre: 0};
  props.recipeData.ingredients.forEach(ingredient => {
    totalNutrition.kcal += ingredient.food.nutrition.kcal / 100 * ingredient.portion.gramWeight * ingredient.quantity;
    totalNutrition.carbohydrates += ingredient.food.nutrition.carbohydrates / 100 * ingredient.portion.gramWeight * ingredient.quantity;
    totalNutrition.protein += ingredient.food.nutrition.protein / 100 * ingredient.portion.gramWeight * ingredient.quantity;
    totalNutrition.fat += ingredient.food.nutrition.fat / 100 * ingredient.portion.gramWeight * ingredient.quantity;
    totalNutrition.fibre += ingredient.food.nutrition.fibre / 100 * ingredient.portion.gramWeight * ingredient.quantity;
  });
  return (
    <>
      <h1>{props.recipeData.name} <small className="text-muted">{props.recipeData.portions} portions</small></h1>
      <p className="lead">{props.recipeData.description}</p>
      <h2>Instructions</h2>
      <ul>
      {props.recipeData.instructions.map(instruction => <li key={instruction.order}>{instruction.description}</li> )}
      </ul>
      <h2>Ingredients</h2>
      <IngredientList ingredients={props.recipeData.ingredients} />
      <h2>Nutrition <small className='text-muted'>Per portion</small></h2>
      <NutritionCard nutrition={nutritionPerPortion(props.recipeData)} />
    </>
  );

  function IngredientList(props: {ingredients: Ingredient[]}) {
    return <div className='card'>
    <ul className='list-group list-group-flush'>
      {props.ingredients.map(ingredient => {
        return <IngredientCard ingredient={ingredient} key={ingredient.id} />
      })}
    </ul>
    </div>
  }

  function IngredientCard(props: {ingredient: Ingredient}) {
    const dispatch = useDispatch();
    var nutritionForPortion =  getNutritionForPortion(props.ingredient)
    return <li className='list-group-item'>
      <Row>
        <Col>
          {props.ingredient.quantity * props.ingredient.portion.amount} {props.ingredient.portion.name}  {props.ingredient.food.name}
          <small className='text-muted'>
            <span className='ms-2'>{Math.round(nutritionForPortion.kcal)} KCal</span>
            <span className='ms-2'>{Math.round(nutritionForPortion.carbohydrates)} Carbs</span>
            <span className='ms-2'>{Math.round(nutritionForPortion.protein)} Protein</span>
            <span className='ms-2'>{Math.round(nutritionForPortion.fat)} Fat</span>
          </small>
        </Col>
        <Col xs lg="1">
          <ButtonGroup>
            <Button onClick={() => dispatch(setIngredientAmount({id: props.ingredient.id, newAmount: props.ingredient.quantity + 1}))}>+</Button>
            <Button onClick={() => dispatch(setIngredientAmount({id: props.ingredient.id, newAmount: props.ingredient.quantity - 1}))}>-</Button>
          </ButtonGroup>
        </Col>
      </Row>
      
    </li>
  }

  function NutritionCard(props: {nutrition: Nutrition}) {
    return <div className='card'>
    <ul className='list-group list-group-flush'>
      <li className='list-group-item'>{Math.round(props.nutrition.kcal)} KCal</li>
      <li className='list-group-item'>{Math.round(props.nutrition.carbohydrates)}g carbohydrates</li>
      <li className='list-group-item'>{Math.round(props.nutrition.protein)}g protein</li>
      <li className='list-group-item'>{Math.round(props.nutrition.fat)}g fat</li>
    </ul>
  </div>
  }

}