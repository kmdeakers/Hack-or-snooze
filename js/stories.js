"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <i id="empty-star" class="bi bi-star hidden"></i>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}
//expand doc string
/** Create new story from form data. Create new story markup and 
 * append to "#all-stories-list"
 */

async function createStoryAndAddToPage(event) {
  event.preventDefault();
  console.debug("createStoryAndAddToPage");

  const storyDataInput = {
    author: $('#create-author').val(),
    title: $('#create-title').val(),
    url: $('#create-url').val()
  }

  const newStory = await storyList.addStory(currentUser, storyDataInput);
  const newStoryMarkup = generateStoryMarkup(newStory);
  $("#all-stories-list").prepend(newStoryMarkup)
  console.log("storyList", storyList);

  $submitForm.hide();

  // putStoriesOnPage();

}
// pass new Story instance in generateStoryMarkup
//TODO: updated .stories-container 
$('#submit-form').on('submit', createStoryAndAddToPage); 
