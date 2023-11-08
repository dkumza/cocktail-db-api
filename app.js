const printToDOM = (drink) => {
   document.querySelector(".result").innerHTML = `
            <div class="col-6">
                <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" />
            </div>
            <div class="col-6">
                <h2>${drink.strDrink}</h2>
                <p>${drink.strInstructions}</p>
                <ul>
                    <li> Type: <button class="btn btn-outline-primary btn-sm"> ${
                       drink.strAlcoholic
                    }</button></li>
                    <li>Category: <button class="btn btn-outline-primary btn-sm"> ${
                       drink.strCategory
                    } </button></li>
                    <li>Glass Type: <button class="btn btn-outline-primary btn-sm"> ${
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
   const ibaItem = document.querySelector(".iba");
   !drink.strIBA
      ? ibaItem.classList.add("hide")
      : ibaItem.classList.remove("hide");

   const imgAtr = document.querySelector(".img-atr");
   !drink.strImageAttribution
      ? imgAtr.classList.add("hide")
      : imgAtr.classList.remove("hide");
};

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
            <div class="cocktail col-4 mb-3" onclick="showCocktail(${
               drink.idDrink
            })">
                <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" />
                <h3>${drink.strDrink}</h3>
                <div class="d-flex justify-content-between">
                    <span>${drink.dateModified ? drink.dateModified : ""}</span>
                    <span>${drink.strAlcoholic}</span>
                </div>
            </div>
        `
            )
            .join("");
      });
}

function showCocktail(id) {
   fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + id)
      .then((resp) => resp.json())
      .then((resp) => {
         const drink = resp.drinks[0];
         const ingredients = [];

         for (let i = 1; i <= 15; i++) {
            if (drink["strIngredient" + i]) {
               const measure = drink["strMeasure" + i]
                  ? drink["strMeasure" + i]
                  : "";
               ingredients[ingredients.length] = `
                    <li>${drink["strIngredient" + i]} ${measure}</li>
                `;
            }
         }
         printToDOM(drink);
      });
}

const btnLucky = document.querySelector(".btn-lucky");

// * i'm lucky option
function imLucky() {
   fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
      .then((resp) => resp.json())
      .then((resp) => {
         if (!resp.drinks) return;
         console.log(resp.drinks);

         const drink = resp.drinks[0];
         const ingredients = [];

         for (let i = 1; i <= 15; i++) {
            if (drink["strIngredient" + i]) {
               const measure = drink["strMeasure" + i]
                  ? drink["strMeasure" + i]
                  : "";
               ingredients[ingredients.length] = `
                    <li>${drink["strIngredient" + i]} ${measure}</li>
                `;
            }
         }

         document.querySelector(".result").innerHTML = `
            <div class="col-6">
                <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" />
            </div>
            <div class="col-6">
                <h2>${drink.strDrink}</h2>
                <p>${drink.strInstructions}</p>
                <ul>
                    <li> Type: <button class="btn btn-outline-primary btn-sm"> ${
                       drink.strAlcoholic
                    }</button></li>
                    <li>Category: <button class="btn btn-outline-primary btn-sm"> ${
                       drink.strCategory
                    } </button></li>
                    <li>Glass Type: <button class="btn btn-outline-primary btn-sm"> ${
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
         const ibaItem = document.querySelector(".iba");
         !drink.strIBA
            ? ibaItem.classList.add("hide")
            : ibaItem.classList.remove("hide");

         const imgAtr = document.querySelector(".img-atr");
         !drink.strImageAttribution
            ? imgAtr.classList.add("hide")
            : imgAtr.classList.remove("hide");
      });
}

btnLucky.addEventListener("click", (e) => {
   e.preventDefault;
   imLucky();
});
