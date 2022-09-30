const fp = require("lodash/fp");
const _ = fp.convert({
  cap: false,
  curry: false,
  fixed: false,
  immutable: true,
  rearg: false,
});

export const getIngredientById = (catelog, id) => {
  return _.get(catelog, ["ingredientsById", id]);
};

export const getRecipeById = (catelog, id) => {
  return _.get(catelog, ["recipesById", id]);
};

export const getMealPlanById = (catelog, id) => {
  return _.get(catelog, ["mealPlansById", id]);
};

export const ingredientQuantityInfo = (catelog, recipe) => {
  var ingredientIds = _.get(recipe, "ingredientIds");
  var ingredientQuantities = _.get(recipe, "ingredientQuantities");
  var ingredientInfo = _.map(ingredientIds, function (ingredientId, index) {
    return {
      [_.get(catelog, ["ingredientsById", ingredientId, "name"])]:
        ingredientQuantities[index].quantity,
    };
  });
  return ingredientInfo;
};

export const recipeInfo = (catelog, recipe) => {
  if (recipe === undefined || _.get(recipe, "name") === undefined) {
    return {};
  }
  let recipeInfo = {
    name: _.get(recipe, "name"),
    ingredients: ingredientQuantityInfo(catelog, recipe),
    calories: _.get(recipe, "calories"),
    servingSize: _.get(recipe, "servingSize"),
  };
  return recipeInfo;
};

export const mealPlanInfo = (catelog, mealPlan) => {
  if (mealPlan === undefined || _.get(mealPlan, "name") === undefined) {
    return {};
  }
  let mealPlanInfo = {
    name: _.get(mealPlan, "name"),
    recipes: _.get(mealPlan, "recipeIds").map((recipeId) => {
      return recipeInfo(catelog, getRecipeById(catelog, recipeId));
    }),
  };

  return mealPlanInfo;
};

export const searchRecipesByName = (catelog, name) => {
  let recipes = _.values(_.get(catelog, "recipesById"));
  let matchingRecipes = _.filter(recipes, (recipe) => {
    return _.get(recipe, "name").includes(name);
  });
  if (matchingRecipes.length === 0) {
    return [];
  }
  let recipeInfos = _.map(matchingRecipes, (recipe) => {
    return recipeInfo(catelog, recipe);
  });
  return recipeInfos;
};

export const searchRecipesByNameJSON = (appData, querry) => {
  let results = searchRecipesByName(_.get(appData, "catelogData"), querry);
  let resultsJSON = JSON.stringify(results);
  return resultsJSON;
};

export const searchMealPlansByName = (catelog, name) => {
  let mealPlans = _.values(_.get(catelog, "mealPlansById"));
  let matchingMealPlans = _.filter(mealPlans, (mealPlan) => {
    return _.get(mealPlan, "name").includes(name);
  });
  if (matchingMealPlans.length === 0) {
    return [];
  }
  let mealPlanInfos = _.map(matchingMealPlans, (mealPlan) => {
    return mealPlanInfo(catelog, mealPlan);
  });
  return mealPlanInfos;
};

export const searchMealPlansByNameJSON = (appData, querry) => {
  let results = searchMealPlansByName(_.get(appData, "catelogData"), querry);
  let resultsJSON = JSON.stringify(results);
  return resultsJSON;
};

export const isAdmin = (userManagementData, email) => {
  return _.has(_.get(userManagementData, "adminsById"), email);
};

export const isEditor = (userManagementData, email) => {
  return _.get(userManagementData, ["usersById", email, "isEditor"]) == true;
};
