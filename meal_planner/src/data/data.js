export let appData = {
  catelogData: {
    ingredientsById: {
      milk: {
        id: "milk",
        name: "Milk",
        calories: 100,
        protein: 10,
        fat: 3,
        carbs: 30,
        fiber: 1,
        sugar: 1,
        sodium: 1,
        salt: 0.5,
      },
      eggs: {
        id: "eggs",
        name: "Eggs",
        calories: 200,
        protein: 20,
        fat: 5,
        carbs: 20,
        fiber: 2,
        sugar: 2,
        sodium: 2,
        salt: 1,
      },
      sugar: {
        id: "sugar",
        name: "Sugar",
        calories: 100,
        protein: 0,
        fat: 0,
        carbs: 100,
        fiber: 0,
        sugar: 100,
        sodium: 0,
        salt: 0,
      },
    },
    recipesById: {
      fryedeggs: {
        id: "fryedeggs",
        name: "Fried Eggs",
        ingredientIds: ["eggs"],
        ingredientQuantities: [{ id: "eggs", quantity: 2 }],
        calories: 200,
        servingSize: 1,
        cookTime: 10,
        prepTime: 5,
        directions: [
          "Heat pan to high temprature",
          "Crack the egg on the pan",
          "Fry the egg until the yellow has solidified",
        ],
        notes: "Fried eggs are a great way to start your day",
      },
      sweetomlette: {
        id: "sweetomlette",
        name: "Sweet Omlette",
        ingredientIds: ["eggs", "milk", "sugar"],
        ingredientQuantities: [
          { id: "eggs", quantity: 1 },
          { id: "milk", quantity: 1 },
          { id: "sugar", quantity: 1 },
        ],
        calories: 400,
        servingSize: 2,
        cookTime: 15,
        prepTime: 10,
        directions: [
          "Heat pan to high temprature",
          "Mix the Eggs, Milk and Sugar in a bowl",
          "Cook the mixture for 10 minutes on the pan",
        ],
        notes:
          "Sweet omlette will surprise everyone and is great way to start your day",
      },
    },
    mealPlansById: {
      mealplan1: {
        id: "mealplan1",
        name: "Original Breakfast all week",
        description: "My First Meal Plan for a week of nothing but eggs",
        recipeIds: ["fryedeggs", "sweetomlette"],
        recipeQuantities: [
          { id: "fryedeggs", qty: 7 },
          { id: "sweetomlette", qty: 14 },
        ],
        totalIngredients: [
          { id: "eggs", qty: 21 },
          { id: "milk", qty: 14 },
          { id: "sugar", qty: 14 },
        ],
        schedule: [
          {
            breakfast: "fryedeggs",
            lunch: "sweetomlette",
            dinner: "sweetomlette",
          },
          {
            breakfast: "fryedeggs",
            lunch: "sweetomlette",
            dinner: "sweetomlette",
          },
          {
            breakfast: "fryedeggs",
            lunch: "sweetomlette",
            dinner: "sweetomlette",
          },
          {
            breakfast: "fryedeggs",
            lunch: "sweetomlette",
            dinner: "sweetomlette",
          },
          {
            breakfast: "fryedeggs",
            lunch: "sweetomlette",
            dinner: "sweetomlette",
          },
          {
            breakfast: "fryedeggs",
            lunch: "sweetomlette",
            dinner: "sweetomlette",
          },
          {
            breakfast: "fryedeggs",
            lunch: "sweetomlette",
            dinner: "sweetomlette",
          },
        ],
      },
      mealplan2: {
        id: "mealplan2",
        name: "Alternative Breakfast all week",
        description: "My Second Meal Plan for a week of nothing but eggs",
        recipeIds: ["fryedeggs", "sweetomlette"],
        recipeQuantities: [
          { id: "fryedeggs", qty: 14 },
          { id: "sweetomlette", qty: 7 },
        ],
        totalIngredients: [
          { id: "eggs", qty: 35 },
          { id: "milk", qty: 7 },
          { id: "sugar", qty: 7 },
        ],
        schedule: [
          {
            breakfast: "fryedeggs",
            lunch: "sweetomlette",
            dinner: "fryedeggs",
          },
          {
            breakfast: "fryedeggs",
            lunch: "sweetomlette",
            dinner: "fryedeggs",
          },
          {
            breakfast: "fryedeggs",
            lunch: "sweetomlette",
            dinner: "fryedeggs",
          },
          {
            breakfast: "fryedeggs",
            lunch: "sweetomlette",
            dinner: "fryedeggs",
          },
          {
            breakfast: "fryedeggs",
            lunch: "sweetomlette",
            dinner: "fryedeggs",
          },
          {
            breakfast: "fryedeggs",
            lunch: "sweetomlette",
            dinner: "fryedeggs",
          },
          {
            breakfast: "fryedeggs",
            lunch: "sweetomlette",
            dinner: "fryedeggs",
          },
        ],
      },
    },
  },
  userManagementData: {
    adminsById: {
      "martins2309@gmail.com": {
        email: "martins2309@gmail.com",
        encryptedPassword: "bXlwYXNzd29yZA==",
      },
    },
    usersById: {
      "john@email.com": {
        email: "john@email.com",
        encryptedPassword: "c2VjcmV0",
        isBlocked: false,
        currentMealPlanId: "mealplan1",
      },
      "harry@email.com": {
        email: "harry@email.com",
        encryptedPassword: "c2VjcmV0",
        isBlocked: false,
        currentMealPlanId: "mealplan2",
        isEditor: true,
      },
    },
  },
};
