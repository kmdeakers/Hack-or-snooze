"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  evt.preventDefault();
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  evt.preventDefault();
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navSubmit.show();
  $navFavorites.show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

/** When a user clicks submit, show the submit form. */

function showSubmitFormOnSubmitClick() {
  console.debug("showSubmitFormOnSubmitClick");
  $submitForm.show();
}

$body.on("click", "#nav-submit", showSubmitFormOnSubmitClick);


/** When a user is logged in, shows stars next to stories */

function addStarsToUI() {
  console.debug("addFavoriteStars");
  $(".bi-star").show();
}

async function getAndShowFavorites() {
  console.debug("getAndShowFavorites");
  $allStoriesList.empty();

  const favoriteStories = currentUser.favorites;
  
  for (let story of favoriteStories) {
    const $story = generateStoryMarkup(story);

    $allStoriesList.append($story);
  }
  $allStoriesList.show();
}


$navFavorites.on('click', getAndShowFavorites);
