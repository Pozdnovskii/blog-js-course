const body = document.querySelector('body');
const pagination = document.createElement('ul');
pagination.classList.add('pagination-list');
const articlesList = document.createElement('ul');
body.append(pagination);
body.append(articlesList);

const paginationPageNumber = window.location.search.substring(1);

function getResponse() {
  if (paginationPageNumber.length > 0) return fetch(`https://gorest.co.in/public/v2/posts?${paginationPageNumber}`)
  else return fetch(`https://gorest.co.in/public/v2/posts`);
}

function getArticlesArray(response) {
  return response.json();
}

function getPagesQuantity(response) {
  return response.headers.get('x-pagination-pages');
}

function createPagination(i) {
  const paginationNumber = document.createElement('li');
  paginationNumber.classList.add('pagination-item');
  paginationNumber.textContent = i;
  pagination.append(paginationNumber);

  paginationNumber.addEventListener('click', () => {
    if (i === 1) {
      window.location.assign(
        `${window.location.origin}${window.location.pathname}`
      )
    } else {
      window.location.assign(
        `${window.location.origin}${window.location.pathname}?page=${i}`
      )
    }
  });
}

function createArticleElement(articleObject) {
  const articleElement = document.createElement('li');
  articleElement.classList.add('article_item');
  const articleElementLink = document.createElement('a');
  articleElementLink.textContent = articleObject.title;
  articleElementLink.href = `./article.html?${articleObject.id}`;
  articlesList.append(articleElement);
  articleElement.append(articleElementLink);
}

async function createBlog() {
  const response = await getResponse();
  const articlesArray = await getArticlesArray(response);
  const pagesQuantity = await getPagesQuantity(response);

  for (let i = 1; i <= pagesQuantity; i++) createPagination(i);

  articlesArray.forEach(articleObject => createArticleElement(articleObject));
}

createBlog();
