import * as m from "./model";
import { appData } from "./data.js";

describe("model", () => {
  describe("getters", () => {
    describe("getIngredientById", () => {
      it("should return the ingredient with the given id", () => {
        const ingredientMatch = appData.catelogData.ingredientsById.sugar;
        const ingredient = m.getIngredientById(appData.catelogData, "sugar");
        expect(ingredient).toEqual(ingredientMatch);
      });
      it("should return another ingredient with the given id", () => {
        const ingredientMatch = appData.catelogData.ingredientsById.eggs;
        const ingredient = m.getIngredientById(appData.catelogData, "eggs");
        expect(ingredient).toEqual(ingredientMatch);
      });
      it("should return undefined if the ingredient does not exist", () => {
        const ingredient = m.getIngredientById(
          appData.catelogData,
          "doesNotExist"
        );
        expect(ingredient).toEqual(undefined);
      });
    });

    describe("getRecipeById", () => {
      const recipeMatch1 = appData.catelogData.recipesById.fryedeggs;
      const recipeMatch2 = appData.catelogData.recipesById.sweetomlette;
      it("should return the recipe with the given id", () => {
        const recipe = m.getRecipeById(appData.catelogData, "fryedeggs");
        expect(recipe).toEqual(recipeMatch1);
      });
      it("should return another recipe with the given id", () => {
        const recipe = m.getRecipeById(appData.catelogData, "sweetomlette");
        expect(recipe).toEqual(recipeMatch2);
      });
      it("should return undefined if the recipe does not exist", () => {
        const recipe = m.getRecipeById(appData.catelogData, "doesNotExist");
        expect(recipe).toEqual(undefined);
      });
    });

    describe("getMealPlanById", () => {
      it("should return the meal plan with the given id", () => {
        const mealPlanMatch = appData.catelogData.mealPlansById.mealplan1;
        const mealPlan = m.getMealPlanById(appData.catelogData, "mealplan1");
        expect(mealPlan).toEqual(mealPlanMatch);
      });
      it("should return another meal plan with the given id", () => {
        const mealPlanMatch = appData.catelogData.mealPlansById.mealplan2;
        const mealPlan = m.getMealPlanById(appData.catelogData, "mealplan2");
        expect(mealPlan).toEqual(mealPlanMatch);
      });
      it("should return undefined if the meal plan does not exist", () => {
        const mealPlan = m.getMealPlanById(appData.catelogData, "doesNotExist");
        expect(mealPlan).toEqual(undefined);
      });
    });
  });
  describe("info blocks", () => {
    describe("ingredientQuantityInfo", () => {
      it("should return the ingredient collection of the supplied recipe", () => {
        const recipe = m.ingredientQuantityInfo(
          appData.catelogData,
          appData.catelogData.recipesById.fryedeggs
        );
        expect(recipe).toEqual([{ Eggs: 2 }]);
      });
      it("should return another ingredient collection of the supplied recipe", () => {
        const recipe = m.ingredientQuantityInfo(
          appData.catelogData,
          appData.catelogData.recipesById.sweetomlette
        );
        expect(recipe).toEqual([{ Eggs: 1 }, { Milk: 1 }, { Sugar: 1 }]);
      });
      it("should return an empty array if the recepie does not exist", () => {
        const recipe = m.ingredientQuantityInfo(appData.catelogData, undefined);
        expect(recipe).toEqual([]);
      });
    });
    describe("recipeInfo", () => {
      it("should return the recipe summary info map of the supplied recipe", () => {
        const recipe = m.recipeInfo(
          appData.catelogData,
          appData.catelogData.recipesById.fryedeggs
        );
        expect(recipe).toEqual({
          name: "Fried Eggs",
          ingredients: [{ Eggs: 2 }],
          calories: 200,
          servingSize: 1,
        });
      });
      it("should return another recipe summary info map of the supplied recipe", () => {
        const recipe = m.recipeInfo(
          appData.catelogData,
          appData.catelogData.recipesById.sweetomlette
        );
        expect(recipe).toEqual({
          name: "Sweet Omlette",
          ingredients: [{ Eggs: 1 }, { Milk: 1 }, { Sugar: 1 }],
          calories: 400,
          servingSize: 2,
        });
      });
      it("should return an empty object if the recipe does not exist", () => {
        const recipe = m.recipeInfo(appData.catelogData, undefined);
        expect(recipe).toEqual({});
      });
    });

    describe("mealPlanInfo", () => {
      it("should return the meal plan summary info map of the supplied meal plan", () => {
        const mealPlan = m.mealPlanInfo(
          appData.catelogData,
          appData.catelogData.mealPlansById.mealplan1
        );
        expect(mealPlan).toEqual({
          name: "Original Breakfast all week",
          recipes: [
            {
              name: "Fried Eggs",
              ingredients: [{ Eggs: 2 }],
              calories: 200,
              servingSize: 1,
            },
            {
              name: "Sweet Omlette",
              ingredients: [{ Eggs: 1 }, { Milk: 1 }, { Sugar: 1 }],
              calories: 400,
              servingSize: 2,
            },
          ],
        });
      });
      it("should return another meal plan summary info map of the supplied meal plan", () => {
        const mealPlan = m.mealPlanInfo(
          appData.catelogData,
          appData.catelogData.mealPlansById.mealplan2
        );
        expect(mealPlan).toEqual({
          name: "Alternative Breakfast all week",
          recipes: [
            {
              name: "Fried Eggs",
              ingredients: [{ Eggs: 2 }],
              calories: 200,
              servingSize: 1,
            },
            {
              name: "Sweet Omlette",
              ingredients: [{ Eggs: 1 }, { Milk: 1 }, { Sugar: 1 }],
              calories: 400,
              servingSize: 2,
            },
          ],
        });
      });
      it("should return an empty object if the meal plan does not exist", () => {
        const mealPlan = m.mealPlanInfo(appData.catelogData, undefined);
        expect(mealPlan).toEqual({});
      });
    });
  });
  describe("search", () => {
    describe("searchRecipesByName", () => {
      const recipeMatch1 = m.recipeInfo(
        appData.catelogData,
        appData.catelogData.recipesById.fryedeggs
      );
      const recipeMatch2 = m.recipeInfo(
        appData.catelogData,
        appData.catelogData.recipesById.sweetomlette
      );
      it("should return the recipe with a given incomplete name", () => {
        const recipe = m.searchRecipesByName(appData.catelogData, "Fried");
        expect(recipe).toEqual([recipeMatch1]);
      });
      it("should return another recipe with a given incomplete name", () => {
        const recipe = m.searchRecipesByName(appData.catelogData, "Omlette");
        expect(recipe).toEqual([recipeMatch2]);
      });
      it("should return multiple recipes with a given common incomplete name", () => {
        const recipe = m.searchRecipesByName(appData.catelogData, "e");
        expect(recipe).toEqual([recipeMatch1, recipeMatch2]);
      });
      it("should return an empty array if the recipe does not exist", () => {
        const recipe = m.searchRecipesByName(
          appData.catelogData,
          "doesNotExist"
        );
        expect(recipe).toEqual([]);
      });
    });
    describe("searchRecipesByNameJSON", () => {
      const recipeMatch1 = m.recipeInfo(
        appData.catelogData,
        appData.catelogData.recipesById.fryedeggs
      );
      const recipeMatch2 = m.recipeInfo(
        appData.catelogData,
        appData.catelogData.recipesById.sweetomlette
      );
      it("should return the recipe with a given incomplete name", () => {
        const recipe = m.searchRecipesByNameJSON(appData, "Fried");
        expect(recipe).toEqual(JSON.stringify([recipeMatch1]));
      });
      it("should return another recipe with a given incomplete name", () => {
        const recipe = m.searchRecipesByNameJSON(appData, "Omlette");
        expect(recipe).toEqual(JSON.stringify([recipeMatch2]));
      });
      it("should return multiple recipes with a given common incomplete name", () => {
        const recipe = m.searchRecipesByNameJSON(appData, "e");
        expect(recipe).toEqual(JSON.stringify([recipeMatch1, recipeMatch2]));
      });
      it("should return an empty array if the recipe does not exist", () => {
        const recipe = m.searchRecipesByNameJSON(
          appData.catelogData,
          "doesNotExist"
        );
        expect(recipe).toEqual(JSON.stringify([]));
      });
    });

    describe("searchMealPlansByName", () => {
      const mealPlanMatch1 = m.mealPlanInfo(
        appData.catelogData,
        appData.catelogData.mealPlansById.mealplan1
      );
      const mealPlanMatch2 = m.mealPlanInfo(
        appData.catelogData,
        appData.catelogData.mealPlansById.mealplan2
      );
      it("should return the meal plan with a given name", () => {
        const mealPlan = m.searchMealPlansByName(
          appData.catelogData,
          "Original"
        );
        expect(mealPlan).toEqual([mealPlanMatch1]);
      });
      it("should return another meal plan with a given name", () => {
        const mealPlan = m.searchMealPlansByName(
          appData.catelogData,
          "Alternative"
        );
        expect(mealPlan).toEqual([mealPlanMatch2]);
      });
      it("should return multiple meal plans with a given common name", () => {
        const mealPlan = m.searchMealPlansByName(
          appData.catelogData,
          "Breakfast"
        );
        expect(mealPlan).toEqual([mealPlanMatch1, mealPlanMatch2]);
      });
      it("should return an empty array if the meal plan does not exist", () => {
        const mealPlan = m.searchMealPlansByName(appData.catelogData, "zx");
        expect(mealPlan).toEqual([]);
      });
    });
    describe("searchMealPlansByNameJSON", () => {
      const mealPlanMatch1 = m.mealPlanInfo(
        appData.catelogData,
        appData.catelogData.mealPlansById.mealplan1
      );
      const mealPlanMatch2 = m.mealPlanInfo(
        appData.catelogData,
        appData.catelogData.mealPlansById.mealplan2
      );
      it("should return the meal plan with a given name", () => {
        const mealPlan = m.searchMealPlansByNameJSON(appData, "Original");
        expect(mealPlan).toEqual(JSON.stringify([mealPlanMatch1]));
      });
      it("should return another meal plan with a given name", () => {
        const mealPlan = m.searchMealPlansByNameJSON(appData, "Alternative");
        expect(mealPlan).toEqual(JSON.stringify([mealPlanMatch2]));
      });
      it("should return multiple meal plans with a given common name", () => {
        const mealPlan = m.searchMealPlansByNameJSON(appData, "Breakfast");
        expect(mealPlan).toEqual(
          JSON.stringify([mealPlanMatch1, mealPlanMatch2])
        );
      });
      it("should return an empty array if the meal plan does not exist", () => {
        const mealPlan = m.searchMealPlansByNameJSON(appData, "zx");
        expect(mealPlan).toEqual(JSON.stringify([]));
      });
    });
  });
  describe("userManagement", () => {
    describe("isAdmin", () => {
      it("should return true if the user is an admin", () => {
        const user = m.isAdmin(
          appData.userManagementData,
          "martins2309@gmail.com"
        );
        expect(user).toEqual(true);
      });
      it("should return false if the user is not an admin", () => {
        const user = m.isAdmin(appData.userManagementData, "harry@email.com");
        expect(user).toEqual(false);
      });
    });
    describe("isEditor", () => {
      it("should return true if the user is an editor", () => {
        const user = m.isEditor(appData.userManagementData, "harry@email.com");
        expect(user).toEqual(true);
      });
      it("should return false if the user is not an editor", () => {
        const user = m.isEditor(appData.userManagementData, "john@email.com");
        expect(user).toEqual(false);
      });
    });
  });
});
