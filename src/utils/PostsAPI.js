import 'whatwg-fetch';
let token = localStorage.token;
const api = 'http://localhost:3001';

if (!token) {
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);
}

const headers = {
  Accept: 'application/json',
  Authorization: token
};

export const CTG_ALL = 'all';

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => {
      data.categories &&
        data.categories.unshift({
          name: CTG_ALL,
          path: CTG_ALL
        });
      return data;
    });

export const getPosts = category => {
  const url =
    category && category !== CTG_ALL
      ? `${api}/${category}/posts`
      : `${api}/posts`;
  return fetch(url, { headers: headers })
    .then(res => res.json())
    .then(data => data);
};

export const addPosts = post => {
  var random =
    Math.random()
      .toString(36)
      .split('.')[1] +
    Math.random()
      .toString(36)
      .split('.')[1];
  if (!post) {
    post = {
      id: random,
      timestamp: Date.now(),
      title: `This is a title ${random}`,
      body: `This is body ${random}`,
      owner: `lzg${random.substr(0, 6)}`,
      author: `lzg${random.substr(0, 6)}`,
      category: 'react'
    };
  }
  return fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(res => res.json());
};
