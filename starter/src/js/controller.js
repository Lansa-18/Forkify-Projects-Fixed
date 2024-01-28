import * as model from './model.js';
import recipeView from './views/recipeView.js';
import SearchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

// import icons from '../img/icons.svg'; // Parcel 1
import 'core-js/stable'; // polyfilling everything else
import 'regenerator-runtime/runtime'; // polyfilling async/await

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);

    if (!id) return;
    recipeView.renderSpinner();

    // 1.  Loading recipe
    await model.loadRecipe(id);

    // 2. Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async () => {
  try{
    resultsView.renderSpinner();
    // 1. Get search query
    const query = SearchView.getQuery();
    if(!query) return;

    // 2. loading Search results
    await model.loadSearchResults(query);

    // 3. Render results
    resultsView.render(model.getSearchResultsPage(2));

    // 4. Render initial pagination buttons
    paginationView.render(model.state.search);

  } catch(err){
    console.error(err);
  }
}

const controlPagination = (goToPage) => {
  // 5. Render NEW RESULTS
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 6. Render NEW pagination buttons
  paginationView.render(model.state.search);
}


const init = (goToPage) => {
  recipeView.addHandlerRender(controlRecipes);
  SearchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
