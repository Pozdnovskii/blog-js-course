const body = document.querySelector('body');
const header = document.createElement('h1');
header.classList.add('article_header');
const text = document.createElement('p');
text.classList.add('article_text');
const commentsList = document.createElement('ul');
body.append(header);
body.append(text);
body.append(commentsList);

const id = window.location.search.substring(1);

async function createArticleObject() {
  const response = await fetch(`https://gorest.co.in/public/v2/posts/${id}`);
  const articleObject = await response.json();
  createArticleElement(articleObject)
}

function createArticleElement(object) {
  header.textContent = object.title;
  text.textContent = object.body;
}

async function createCommentsArray() {
  const response = await fetch(`https://gorest.co.in/public/v2/comments?post_id=${id}`);
  const commentsArray = await response.json();
  commentsArray.forEach(commentObject => createCommentElements(commentObject));
}

function createCommentElements(object) {
  const commentElement = document.createElement('li');
  commentElement.classList.add('comment');
  const commentAuthor = document.createElement('address');
  commentElement.textContent = object.body;
  commentAuthor.textContent = object.name;
  commentsList.append(commentElement);
  commentElement.append(commentAuthor);
}

createArticleObject();
createCommentsArray();
