/* eslint-disable no-undef */
/* eslint-disable no-throw-literal */
//import fp from "mudash/fp";
import _ from "mudash";

//getter functions
const getIngredientById = (catelog, id) => {
  return _.get(catelog, ["ingredientsById", id]);
};

const getRecipeById = (catelog, id) => {
  return _.get(catelog, ["recipesById", id]);
};

const getMealPlanById = (catelog, id) => {
  return _.get(catelog, ["mealPlansById", id]);
};
//info blocks functions
const ingredientQuantityInfo = (catelog, recipe) => {
  var ingredientIds = _.get(recipe, "ingredientIds");
  var ingredientQuantities = _.get(recipe, "ingredientQuantities");
  var ingredientInfo = _.map(ingredientIds, function (ingredientId, index) {
    return {
      [_.get(catelog, ["ingredientsById", ingredientId, "name"])]: _.get(
        ingredientQuantities,
        [index, "quantity"]
      ),
    };
  });
  return ingredientInfo;
};

const recipeInfo = (catelog, recipe) => {
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

const mealPlanInfo = (catelog, mealPlan) => {
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
//search functions
const searchIngredientsByName = (catelog, query) => {
  let ingredients = _.get(catelog, "ingredientsById");
  let queryLowerCase = query.toLowerCase();
  let matchingIngredients = _.filter(ingredients, (ingredient) => {
    return _.get(ingredient, "name").toLowerCase().includes(queryLowerCase);
  });
  if (matchingIngredients.length === 0) {
    return [];
  }
  return matchingIngredients;
};

const searchRecipesByName = (catelog, name) => {
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

const searchRecipesByNameJSON = (appData, querry) => {
  let results = searchRecipesByName(_.get(appData, "catelogData"), querry);
  let resultsJSON = JSON.stringify(results);
  return resultsJSON;
};

const searchMealPlansByName = (catelog, name) => {
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

const searchMealPlansByNameJSON = (appData, querry) => {
  let results = searchMealPlansByName(_.get(appData, "catelogData"), querry);
  let resultsJSON = JSON.stringify(results);
  return resultsJSON;
};

//system state functions and classes
class SystemState {
  systemState;
  previousSystemState;
  // initialise is here temporarily until there is a backend to supply initial state
  static initialise(appData) {
    this.systemState = appData;
    this.previousSystemState = undefined;
  }

  static get() {
    return this.systemState;
  }
  static commit(previous, next) {
    let systemStateBeforeUpdate = this.systemState;
    let nextStateData = SystemConsistency.reconcile(
      this.systemState,
      previous,
      next
    );
    /* commented out until implemented
    if (!SystemValidity.validate(previous, nextStateData)) {
      throw "The System data to be commited is not valid!";
    }*/
    this.systemState = nextStateData;
    this.previousSystemState = systemStateBeforeUpdate;
  }

  static undoLastCommit() {
    this.systemState = this.previousSystemState;
  }
}

//System Consistency functions and classes

const informationPaths = (obj, path = []) => {
  return _.reduce(
    obj,
    function (acc, v, k) {
      if (_.isObject(v)) {
        return _.concat(acc, informationPaths(v, _.concat(path, k)));
      }
      return _.concat(acc, [_.concat(path, k)]); // <1>
    },
    []
  );
};

//the results of informationPaths has to be spread into _.intersection otherwise it returns false even when the inputs were identical with different references
const havePathInCommon = (diff1, diff2) => {
  return !_.isEmpty(
    _.intersection(...informationPaths(diff1), ...informationPaths(diff2))
  );
};

const diffObjects = (data1, data2) => {
  var emptyObject = _.isArray(data1) ? [] : {}; // <1>
  if (data1 === data2) {
    return emptyObject;
  }
  var keys = _.union(_.keys(data1), _.keys(data2)); // <2>
  return _.reduce(
    keys,
    function (acc, k) {
      var res = diff(_.get(data1, k), _.get(data2, k));
      if (
        (_.isObject(res) && _.isEmpty(res)) || // <3> <4>
        res === "no-diff"
      ) {
        // <5>
        return acc;
      }
      return _.set(acc, [k], res);
    },
    emptyObject
  );
};

const diff = (data1, data2) => {
  if (_.isObject(data1) && _.isObject(data2)) {
    // <4>
    return diffObjects(data1, data2);
  }
  if (data1 !== data2) {
    return data2;
  }
  return "no-diff"; // <5>
};
//This doesn't do anything in plain JavaScript, but it's here to show that it would be used in a concurrent system if you are taking a optimistic approach
class SystemConsistency {
  //This is a cool algirothim that unfortunately doesn't work in JavaScript because of the way it handles parrallel processes i.e. it doesn't since its single threaded and controlled by the event loop
  static threeWayMerge(current, previous, next) {
    let previousToCurrent = diff(previous, current);
    let previousToNext = diff(previous, next);
    if (!havePathInCommon(previousToCurrent, previousToNext)) {
      return _.merge(current, previousToNext);
    }
    throw "Conflicting concurrent mutations!";
  }

  static reconcile(current, previous, next) {
    if (current === previous) {
      return next;
    }
    return SystemConsistency.threeWayMerge(current, previous, next);
  }
}

//user management
const isAdmin = (userManagementData, email) => {
  return _.has(_.get(userManagementData, "adminsById"), email);
};

const isEditor = (userManagementData, email) => {
  return _.get(userManagementData, ["usersById", email, "isEditor"]) === true;
};

const addUserUM = (userManagementData, user) => {
  let email = _.get(user, "email");
  let infoPath = ["usersById", email];
  if (_.has(userManagementData, infoPath)) {
    throw "User already exists";
  }
  let nextUserManagementData = _.set(userManagementData, infoPath, user);
  return nextUserManagementData;
};

const addUserAD = (appData, user) => {
  let currentUserManagementData = _.get(appData, "userManagementData");
  let nextUserManagementData = addUserUM(currentUserManagementData, user);
  let nextAppData = _.set(
    appData,
    "userManagementData",
    nextUserManagementData
  );
  return nextAppData;
};

const addUserSys = (user) => {
  let previous = SystemState.get();
  let next = addUserAD(previous, user);
  SystemState.commit(previous, next);
};

const addAdminUM = (userManagementData, user) => {
  let email = _.get(user, "email");
  let infoPath = ["adminsById", email];
  if (_.has(userManagementData, infoPath)) {
    throw "Admin already exists";
  }
  let nextUserManagementData = _.set(userManagementData, infoPath, user);
  return nextUserManagementData;
};

const addAdminAD = (appData, user) => {
  let currentUserManagementData = _.get(appData, "userManagementData");
  let nextUserManagementData = addAdminUM(currentUserManagementData, user);
  let nextAppData = _.set(
    appData,
    "userManagementData",
    nextUserManagementData
  );
  return nextAppData;
};

const addAdminSys = (user) => {
  let previous = SystemState.get();
  let next = addAdminAD(previous, user);
  SystemState.commit(previous, next);
};

//catelogData management
const addIngredientCD = (catelogData, ingredient) => {
  let id = _.get(ingredient, "id");
  let infoPath = ["ingredientsById", id];
  if (_.has(catelogData, infoPath)) {
    throw "Ingredient already exists";
  }
  let nextCatelogData = _.set(catelogData, infoPath, ingredient);
  return nextCatelogData;
};

const addIngredientAD = (appData, ingredient) => {
  let currentCatelogData = _.get(appData, "catelogData");
  let nextCatelogData = addIngredientCD(currentCatelogData, ingredient);
  let nextAppData = _.set(appData, "catelogData", nextCatelogData);
  return nextAppData;
};

const addIngredientSys = (ingredient) => {
  let previous = SystemState.get();
  let next = addIngredientAD(previous, ingredient);
  SystemState.commit(previous, next);
};

const addRecipeCD = (catelogData, recipe) => {
  let id = _.get(recipe, "id");
  let infoPath = ["recipesById", id];
  if (_.has(catelogData, infoPath)) {
    throw "Recipe already exists";
  }
  let nextCatelogData = _.set(catelogData, infoPath, recipe);
  return nextCatelogData;
};

const addRecipeAD = (appData, recipe) => {
  let currentCatelogData = _.get(appData, "catelogData");
  let nextCatelogData = addRecipeCD(currentCatelogData, recipe);
  let nextAppData = _.set(appData, "catelogData", nextCatelogData);
  return nextAppData;
};

const addRecipeSys = (recipe) => {
  let previous = SystemState.get();
  let next = addRecipeAD(previous, recipe);
  SystemState.commit(previous, next);
};

const addMealPlanCD = (catelogData, mealPlan) => {
  let id = _.get(mealPlan, "id");
  let infoPath = ["mealPlansById", id];
  if (_.has(catelogData, infoPath)) {
    throw "Meal plan already exists";
  }
  let nextCatelogData = _.set(catelogData, infoPath, mealPlan);
  return nextCatelogData;
};

const addMealPlanAD = (appData, mealPlan) => {
  let currentCatelogData = _.get(appData, "catelogData");
  let nextCatelogData = addMealPlanCD(currentCatelogData, mealPlan);
  let nextAppData = _.set(appData, "catelogData", nextCatelogData);
  return nextAppData;
};

const addMealPlanSys = (mealPlan) => {
  let previous = SystemState.get();
  let next = addMealPlanAD(previous, mealPlan);
  SystemState.commit(previous, next);
};

//export for all functions
module.exports = {
  SystemState,
  SystemConsistency,
  diffObjects,
  diff,
  havePathInCommon,
  informationPaths,
  addMealPlanSys,
  addMealPlanAD,
  addMealPlanCD,
  addRecipeSys,
  addRecipeAD,
  addRecipeCD,
  addIngredientSys,
  addIngredientAD,
  addIngredientCD,
  addAdminSys,
  addAdminAD,
  addAdminUM,
  addUserSys,
  addUserAD,
  addUserUM,
  isEditor,
  isAdmin,
  searchMealPlansByNameJSON,
  searchMealPlansByName,
  searchRecipesByNameJSON,
  searchRecipesByName,
  searchIngredientsByName,
  mealPlanInfo,
  recipeInfo,
  ingredientQuantityInfo,
  getMealPlanById,
  getRecipeById,
  getIngredientById,
};
