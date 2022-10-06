import * as m from "./model";
import { appData } from "./data.js";

describe("model", () => {
  //catelog variables
  const ingredientMatch1 = appData.catelogData.ingredientsById.sugar;
  const ingredientMatch2 = appData.catelogData.ingredientsById.eggs;

  const recipeMatch1 = appData.catelogData.recipesById.fryedeggs;
  const recipeMatch2 = appData.catelogData.recipesById.sweetomlette;

  const mealPlanMatch1 = appData.catelogData.mealPlansById.mealplan1;
  const mealPlanMatch2 = appData.catelogData.mealPlansById.mealplan2;

  const recipeInfoMatch1 = m.recipeInfo(
    appData.catelogData,
    appData.catelogData.recipesById.fryedeggs
  );
  const recipeInfoMatch2 = m.recipeInfo(
    appData.catelogData,
    appData.catelogData.recipesById.sweetomlette
  );

  const mealPlanInfoMatch1 = m.mealPlanInfo(
    appData.catelogData,
    appData.catelogData.mealPlansById.mealplan1
  );
  const mealPlanInfoMatch2 = m.mealPlanInfo(
    appData.catelogData,
    appData.catelogData.mealPlansById.mealplan2
  );

  const newIngredient = {
    id: "apple",
    name: "Apple",
    calories: 100,
    protein: 10,
    fat: 3,
    carbs: 30,
    fiber: 1,
    sugar: 1,
    sodium: 1,
    salt: 0.5,
  };

  const newRecipe = {
    id: "applepie",
    name: "Apple Pie",
    ingredientIds: ["apple"],
    ingredientQuantities: [{ id: "apple", quantity: 2 }],
    calories: 200,
    servingSize: 1,
    cookTime: 10,
    prepTime: 5,
    directions: [
      "Heat pan to high temprature",
      "Crack the egg on the pan",
      "Fry the egg until the yellow has solidified",
    ],
    notes: "the instructions are for a fried egg",
  };

  const newMealPlan = {
    id: "mealplan3",
    name: "Meal Plan 3",
    recipeIds: ["applepie"],
    recipeQuantities: [{ id: "applepie", quantity: 21 }],
    totalIngredients: [{ id: "apple", quantity: 42 }],
    schedule: [
      { breakfast: "applepie", lunch: "applepie", dinner: "applepie" },
      { breakfast: "applepie", lunch: "applepie", dinner: "applepie" },
      { breakfast: "applepie", lunch: "applepie", dinner: "applepie" },
      { breakfast: "applepie", lunch: "applepie", dinner: "applepie" },
      { breakfast: "applepie", lunch: "applepie", dinner: "applepie" },
      { breakfast: "applepie", lunch: "applepie", dinner: "applepie" },
      { breakfast: "applepie", lunch: "applepie", dinner: "applepie" },
    ],
  };

  //user management variables
  const newUser = {
    email: "alice",
    encryptedPassword: "bXlwYXNzd29yZA==",
    isEditor: false,
    isBlocked: false,
    currentMealPlanId: "mealplan1",
  };
  const existingUser = {
    email: "john@email.com",
    encryptedPassword: "c2VjcmV0",
    isBlocked: false,
    currentMealPlanId: "mealplan1",
  };
  const existingAdmin = {
    email: "martins2309@gmail.com",
    encryptedPassword: "bXlwYXNzd29yZA==",
  };

  describe("getters", () => {
    describe("getIngredientById", () => {
      it("should return the ingredient with the given id", () => {
        const ingredient = m.getIngredientById(appData.catelogData, "sugar");
        expect(ingredient).toEqual(ingredientMatch1);
      });
      it("should return another ingredient with the given id", () => {
        const ingredient = m.getIngredientById(appData.catelogData, "eggs");
        expect(ingredient).toEqual(ingredientMatch2);
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
        const mealPlan = m.getMealPlanById(appData.catelogData, "mealplan1");
        expect(mealPlan).toEqual(mealPlanMatch1);
      });
      it("should return another meal plan with the given id", () => {
        const mealPlan = m.getMealPlanById(appData.catelogData, "mealplan2");
        expect(mealPlan).toEqual(mealPlanMatch2);
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
    describe("searchIngredientsByName", () => {
      it("should return an array of the ingredient with the given name", () => {
        const ingredient = m.searchIngredientsByName(appData.catelogData, "Eg");
        expect(ingredient).toEqual([appData.catelogData.ingredientsById.eggs]);
      });
      it("should return an array of another ingredient with the given name", () => {
        const ingredient = m.searchIngredientsByName(appData.catelogData, "Mi");
        expect(ingredient).toEqual([appData.catelogData.ingredientsById.milk]);
      });
      it("should return an empty array if the ingredient does not exist", () => {
        const ingredient = m.searchIngredientsByName(
          appData.catelogData,
          "doesNotExist"
        );
        expect(ingredient).toEqual([]);
      });
    });
    describe("searchRecipesByName", () => {
      it("should return the recipe with a given incomplete name", () => {
        const recipe = m.searchRecipesByName(appData.catelogData, "Fried");
        expect(recipe).toEqual([recipeInfoMatch1]);
      });
      it("should return another recipe with a given incomplete name", () => {
        const recipe = m.searchRecipesByName(appData.catelogData, "Omlette");
        expect(recipe).toEqual([recipeInfoMatch2]);
      });
      it("should return multiple recipes with a given common incomplete name", () => {
        const recipe = m.searchRecipesByName(appData.catelogData, "e");
        expect(recipe).toEqual([recipeInfoMatch1, recipeInfoMatch2]);
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
      it("should return the recipe with a given incomplete name", () => {
        const recipe = m.searchRecipesByNameJSON(appData, "Fried");
        expect(recipe).toEqual(JSON.stringify([recipeInfoMatch1]));
      });
      it("should return another recipe with a given incomplete name", () => {
        const recipe = m.searchRecipesByNameJSON(appData, "Omlette");
        expect(recipe).toEqual(JSON.stringify([recipeInfoMatch2]));
      });
      it("should return multiple recipes with a given common incomplete name", () => {
        const recipe = m.searchRecipesByNameJSON(appData, "e");
        expect(recipe).toEqual(
          JSON.stringify([recipeInfoMatch1, recipeInfoMatch2])
        );
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
      it("should return the meal plan with a given name", () => {
        const mealPlan = m.searchMealPlansByName(
          appData.catelogData,
          "Original"
        );
        expect(mealPlan).toEqual([mealPlanInfoMatch1]);
      });
      it("should return another meal plan with a given name", () => {
        const mealPlan = m.searchMealPlansByName(
          appData.catelogData,
          "Alternative"
        );
        expect(mealPlan).toEqual([mealPlanInfoMatch2]);
      });
      it("should return multiple meal plans with a given common name", () => {
        const mealPlan = m.searchMealPlansByName(
          appData.catelogData,
          "Breakfast"
        );
        expect(mealPlan).toEqual([mealPlanInfoMatch1, mealPlanInfoMatch2]);
      });
      it("should return an empty array if the meal plan does not exist", () => {
        const mealPlan = m.searchMealPlansByName(appData.catelogData, "zx");
        expect(mealPlan).toEqual([]);
      });
    });
    describe("searchMealPlansByNameJSON", () => {
      it("should return the meal plan with a given name", () => {
        const mealPlan = m.searchMealPlansByNameJSON(appData, "Original");
        expect(mealPlan).toEqual(JSON.stringify([mealPlanInfoMatch1]));
      });
      it("should return another meal plan with a given name", () => {
        const mealPlan = m.searchMealPlansByNameJSON(appData, "Alternative");
        expect(mealPlan).toEqual(JSON.stringify([mealPlanInfoMatch2]));
      });
      it("should return multiple meal plans with a given common name", () => {
        const mealPlan = m.searchMealPlansByNameJSON(appData, "Breakfast");
        expect(mealPlan).toEqual(
          JSON.stringify([mealPlanInfoMatch1, mealPlanInfoMatch2])
        );
      });
      it("should return an empty array if the meal plan does not exist", () => {
        const mealPlan = m.searchMealPlansByNameJSON(appData, "zx");
        expect(mealPlan).toEqual(JSON.stringify([]));
      });
    });
  });

  describe("user management", () => {
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

    describe("addUser", () => {
      describe("addUserUM", () => {
        it("should return a new userManagementData with a new user added to the user management data", () => {
          expect(appData.userManagementData.usersById).not.toContain("alice");
          const newUserManagement = m.addUserUM(
            appData.userManagementData,
            newUser
          );
          expect(newUserManagement.usersById.alice).toBe(newUser);
        });

        it("should throw an error if the user already exists", () => {
          expect(() => {
            m.addUserUM(appData.userManagementData, existingUser);
          }).toThrowError("User already exists");
        });
      });

      describe("addUserAD", () => {
        it("should return a new appData with a new user added to the app data", () => {
          expect(appData.userManagementData.usersById).not.toContain("alice");
          const newAppData = m.addUserAD(appData, newUser);
          expect(newAppData.userManagementData.usersById.alice).toBe(newUser);
        });

        it("should throw an error if the user already exists", () => {
          expect(() => {
            m.addUserAD(appData, existingUser);
          }).toThrowError("User already exists");
        });
      });
    });

    describe("addAdmin", () => {
      describe("addAdminUM", () => {
        it("should return a new userManagementData with a new admin added to the user management data", () => {
          expect(appData.userManagementData.adminsById).not.toContain("alice");
          const newUserManagement = m.addAdminUM(
            appData.userManagementData,
            newUser
          );
          expect(newUserManagement.adminsById.alice).toBe(newUser);
        });

        it("should throw an error if the user already exists", () => {
          expect(() => {
            m.addAdminUM(appData.userManagementData, existingAdmin);
          }).toThrowError("Admin already exists");
        });
      });

      describe("addAdminAD", () => {
        it("should return a new appData with a new admin added to the app data", () => {
          expect(appData.userManagementData.adminsById).not.toContain("alice");
          const newAppData = m.addAdminAD(appData, newUser);
          expect(newAppData.userManagementData.adminsById.alice).toBe(newUser);
        });

        it("should throw an error if the user already exists", () => {
          expect(() => {
            m.addAdminAD(appData, existingAdmin);
          }).toThrowError("Admin already exists");
        });
      });
    });
  });

  describe("catelog management", () => {
    describe("addIngredient", () => {
      describe("addIngredientCD", () => {
        it("should return a new catelogData with a new ingredient added to the catelog data", () => {
          expect(appData.catelogData.ingredientsById).not.toContain(
            newIngredient.id
          );
          const newCatelogData = m.addIngredientCD(
            appData.catelogData,
            newIngredient
          );
          expect(newCatelogData.ingredientsById.apple).toBe(newIngredient);
        });

        it("should throw an error if the ingredient already exists", () => {
          expect(() => {
            m.addIngredientCD(appData.catelogData, ingredientMatch1);
          }).toThrowError("Ingredient already exists");
        });
      });

      describe("addIngredientAD", () => {
        it("should return a new appData with a new ingredient added to the app data", () => {
          expect(appData.catelogData.ingredientsById).not.toContain(
            newIngredient.id
          );
          const newAppData = m.addIngredientAD(appData, newIngredient);
          expect(newAppData.catelogData.ingredientsById.apple).toBe(
            newIngredient
          );
        });

        it("should throw an error if the ingredient already exists", () => {
          expect(() => {
            m.addIngredientAD(appData, ingredientMatch1);
          }).toThrowError("Ingredient already exists");
        });
      });
    });

    describe("addRecipe", () => {
      describe("addRecipeCD", () => {
        it("should return a new catelogData with a new recipe added to the catelog data", () => {
          expect(appData.catelogData.recipesById).not.toContain(newRecipe.id);
          const newCatelogData = m.addRecipeCD(appData.catelogData, newRecipe);
          expect(newCatelogData.recipesById.applepie).toBe(newRecipe);
        });

        it("should throw an error if the recipe already exists", () => {
          expect(appData.catelogData.recipesById.fryedeggs).toBe(recipeMatch1);
          expect(() => {
            m.addRecipeCD(appData.catelogData, recipeMatch1);
          }).toThrowError("Recipe already exists");
        });
      });

      describe("addRecipeAD", () => {
        it("should return a new appData with a new recipe added to the app data", () => {
          expect(appData.catelogData.recipesById).not.toContain(newRecipe.id);
          const newAppData = m.addRecipeAD(appData, newRecipe);
          expect(newAppData.catelogData.recipesById.applepie).toBe(newRecipe);
        });

        it("should throw an error if the recipe already exists", () => {
          expect(appData.catelogData.recipesById.fryedeggs).toBe(recipeMatch1);
          expect(() => {
            m.addRecipeAD(appData, recipeMatch1);
          }).toThrowError("Recipe already exists");
        });
      });
    });

    describe("addMealPlan", () => {
      describe("addMealPlanCD", () => {
        it("should return a new catelogData with a new meal plan added to the catelog data", () => {
          expect(appData.catelogData.mealPlansById).not.toContain(
            newMealPlan.id
          );
          const newCatelogData = m.addMealPlanCD(
            appData.catelogData,
            newMealPlan
          );
          expect(newCatelogData.mealPlansById.mealplan3).toBe(newMealPlan);
        });

        it("should throw an error if the meal plan already exists", () => {
          expect(() => {
            m.addMealPlanCD(appData.catelogData, mealPlanMatch1);
          }).toThrowError("Meal plan already exists");
        });
      });

      describe("addMealPlanAD", () => {
        it("should return a new appData with a new meal plan added to the app data", () => {
          expect(appData.catelogData.mealPlansById).not.toContain(
            newMealPlan.id
          );
          const newAppData = m.addMealPlanAD(appData, newMealPlan);
          expect(newAppData.catelogData.mealPlansById.mealplan3).toBe(
            newMealPlan
          );
        });

        it("should throw an error if the meal plan already exists", () => {
          expect(() => {
            m.addMealPlanAD(appData, mealPlanMatch1);
          }).toThrowError("Meal plan already exists");
        });
      });
    });
  });

  describe("SystemState class", () => {
    new m.SystemState();
    it("should return appData state after initialisation", () => {
      m.SystemState.initialise(appData);
      expect(m.SystemState.get()).toEqual(appData);
    });
    it("should be able to commit the state", () => {
      m.SystemState.commit(m.SystemState.get(), "test");
      expect(m.SystemState.get()).toEqual("test");
    });
    it("should be able to undo Last Commit", () => {
      expect(m.SystemState.get()).toEqual("test");
      m.SystemState.commit(m.SystemState.get(), "test2");
      expect(m.SystemState.get()).toEqual("test2");
      m.SystemState.undoLastCommit();
      expect(m.SystemState.get()).toEqual("test");
    });

    describe("addUserSys", () => {
      m.SystemState.initialise(appData);
      it("should take a new user and add it to System state", () => {
        expect(appData.userManagementData.usersById).not.toContain("alice");
        m.addUserSys(newUser);
        expect(m.SystemState.get().userManagementData.usersById.alice).toBe(
          newUser
        );
      });

      it("should throw an error if the user already exists", () => {
        expect(m.SystemState.get().userManagementData.usersById.alice).toBe(
          newUser
        );
        expect(() => {
          m.addUserSys(newUser);
        }).toThrowError("User already exists");
      });
    });

    describe("addAdminSys", () => {
      m.SystemState.initialise(appData);
      it("should take a new admin and add it to System state", () => {
        expect(appData.userManagementData.adminsById).not.toContain("alice");
        m.addAdminSys(newUser);
        expect(m.SystemState.get().userManagementData.adminsById.alice).toBe(
          newUser
        );
      });

      it("should throw an error if the admin already exists", () => {
        expect(m.SystemState.get().userManagementData.adminsById.alice).toBe(
          newUser
        );
        expect(() => {
          m.addAdminSys(newUser);
        }).toThrowError("Admin already exists");
      });
    });

    describe("addIngredientSys", () => {
      m.SystemState.initialise(appData);
      it("should take a new ingredient and add it to System state", () => {
        expect(appData.catelogData.ingredientsById).not.toContain(
          "newIngredient"
        );
        m.addIngredientSys(newIngredient);
        expect(m.SystemState.get().catelogData.ingredientsById.apple).toBe(
          newIngredient
        );
      });
      it("should throw an error if the ingredient already exists", () => {
        expect(m.SystemState.get().catelogData.ingredientsById.apple).toBe(
          newIngredient
        );
        expect(() => {
          m.addIngredientSys(newIngredient);
        }).toThrowError("Ingredient already exists");
      });
    });

    describe("addRecipeSys", () => {
      m.SystemState.initialise(appData);
      it("should take a new recipe and add it to System state", () => {
        expect(appData.catelogData.recipesById).not.toContain("newRecipe");
        m.addRecipeSys(newRecipe);
        expect(m.SystemState.get().catelogData.recipesById.applepie).toBe(
          newRecipe
        );
      });
      it("should throw an error if the recipe already exists", () => {
        expect(m.SystemState.get().catelogData.recipesById.applepie).toBe(
          newRecipe
        );
        expect(() => {
          m.addRecipeSys(newRecipe);
        }).toThrowError("Recipe already exists");
      });
    });

    describe("addMealPlanSys", () => {
      m.SystemState.initialise(appData);
      it("should take a new meal plan and add it to System state", () => {
        expect(appData.catelogData.mealPlansById).not.toContain("newMealPlan");
        m.addMealPlanSys(newMealPlan);
        expect(m.SystemState.get().catelogData.mealPlansById.mealplan3).toBe(
          newMealPlan
        );
      });
      it("should throw an error if the meal plan already exists", () => {
        expect(m.SystemState.get().catelogData.mealPlansById.mealplan3).toBe(
          newMealPlan
        );
        expect(() => {
          m.addMealPlanSys(newMealPlan);
        }).toThrowError("Meal plan already exists");
      });
    });
  });
});
