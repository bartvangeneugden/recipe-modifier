export type InstructionStep = {
    order: number,
    description: string
};

export type Nutrition = {
    kcal: number
    protein: number
    carbohydrates: number
    fat: number
    fibre?: number
};

export type Portion = {
    amount: number // e.g. 1 
    name: string // e.g. Banana, gram, ...
    gramWeight: number
};

export type Food = {
    name: string
    portions: Portion[]
    nutrition: Nutrition
};

export type Ingredient = {  
    id: number
    food: Food
    quantity: number
    portion: Portion
};

export type Recipe = {
    name: string
    portions: number
    description: string
    instructions: InstructionStep[]
    ingredients: Ingredient[]
};