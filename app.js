// * fetch by alcoholic or non alcoholic or optional alcohol
function searchByAlcoholType() {
   const val = document.querySelector("input").value;

   fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + val)
      .then((resp) => resp.json())
      .then((resp) => {
         if (!resp.drinks) return;

         document.querySelector(".result").innerHTML = resp.drinks
            .map(
               (drink) => `
            <div class="cocktail col-4  border rounded p-4 hover" onclick="showCocktail(${drink.idDrink})">
                <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" />
               
                <div class="d-flex justify-content-between align-content-center align-items-center mt-2">
                    <h3 class="mb-0">${drink.strDrink}</h3>   
                    <h6 class="mb-0">${drink.strAlcoholic}</h6>
                </div>
            </div>
        `
            )
            .join("");
      });
}

// * function to create single cocktail item to DOM
const printToDOM = (drink, ingredients) => {
   document.querySelector(".result").innerHTML = `
            <div class="col-6">
                <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" />
            </div>
            <div class="col-6">
                <h2>${drink.strDrink}</h2>
                <p>${drink.strInstructions}</p>
                <ul>
                    <li> Type: <button class="btn-type btn btn-outline-success btn-sm"> ${
                       drink.strAlcoholic
                    }</button></li>
                    <li>Category: <button class="btn-cat btn btn-outline-success btn-sm"> ${
                       drink.strCategory
                    } </button></li>
                    <li>Glass Type: <button class="btn-glass btn btn-outline-success btn-sm"> ${
                       drink.strGlass
                    }</button></li>
                    <li class="iba">IBA: ${drink.strIBA}</li>
                    <li class="img-atr">Image Atribution: ${
                       drink.strImageAttribution
                    }</li>
                </ul>
                <h4>Ingredients:</h4>
                <ul>
                    ${ingredients.join("")}
                </ul>
            </div>
        `;

   //   * if drink."items" are null display none
   const ibaItem = document.querySelector(".iba");
   !drink.strIBA
      ? ibaItem.classList.add("hide")
      : ibaItem.classList.remove("hide");

   const imgAtr = document.querySelector(".img-atr");
   !drink.strImageAttribution
      ? imgAtr.classList.add("hide")
      : imgAtr.classList.remove("hide");

   //   * select buttons to filter cocktails  by pressing filters
   const btnType = document.querySelector(".btn-type");
   btnType.addEventListener("click", (e) => {
      let alcValue = e.target.innerText;
      alcValue = alcValue.replace(/\s+/g, "_");
      console.log(alcValue);

      fetch(
         "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=" + alcValue
      )
         .then((resp) => resp.json())
         .then((resp) => {
            if (!resp.drinks) return;

            document.querySelector(".result").innerHTML = resp.drinks
               .map(
                  (drink) => `
                  <div class="cocktail col-4  border rounded p-4 hover" onclick="showCocktail(${drink.idDrink})">
                     <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" />
                     <div class="d-flex justify-content-between align-content-center align-items-center mt-2">
                        <h3 class="mb-0">${drink.strDrink}</h3>   
                        
                     </div>
                  </div> `
               )
               .join("");
         });
   });
};

// * function to work with ingredients from API
const drinkIngredients = (drink, ingredients) => {
   for (let i = 1; i <= 15; i++) {
      if (drink["strIngredient" + i]) {
         const measure = drink["strMeasure" + i] ? drink["strMeasure" + i] : "";
         ingredients[ingredients.length] = `
              <li>${drink["strIngredient" + i]} ${measure}</li>
          `;
      }
   }
};

// * fetches data from API to display as search results to DOM
function searchCocktails(e) {
   e.preventDefault();

   const val = document.querySelector("input").value;

   fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + val)
      .then((resp) => resp.json())
      .then((resp) => {
         if (!resp.drinks) return;

         document.querySelector(".result").innerHTML = resp.drinks
            .map(
               (drink) => `
            <div class="cocktail col-4  border rounded p-4 hover" onclick="showCocktail(${drink.idDrink})">
                <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" />
               
                <div class="d-flex justify-content-between align-content-center align-items-center mt-2">
                    <h3 class="mb-0">${drink.strDrink}</h3>   
                    <h6 class="mb-0">${drink.strAlcoholic}</h6>
                </div>
            </div>
        `
            )
            .join("");
      });
}

// * show cocktail by id, by clicking on single searched cocktail item
function showCocktail(id) {
   fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + id)
      .then((resp) => resp.json())
      .then((resp) => {
         const drink = resp.drinks[0];
         const ingredients = [];

         drinkIngredients(drink, ingredients);

         printToDOM(drink, ingredients);
      });
}

const btnLucky = document.querySelector(".btn-lucky");

// * i'm lucky option
function imLucky() {
   fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
      .then((resp) => resp.json())
      .then((resp) => {
         if (!resp.drinks) return;

         const drink = resp.drinks[0];
         const ingredients = [];

         drinkIngredients(drink, ingredients);

         printToDOM(drink, ingredients);
      });
}

// * i'm lucky button eventlistener
btnLucky.addEventListener("click", (e) => {
   e.preventDefault();
   imLucky();
});
