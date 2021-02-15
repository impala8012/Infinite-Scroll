const BASE_URL = "https://api.github.com/users/impala8012";
const { REACT_APP_ID, REACT_APP_SECRETS } = process.env;

export const getRepos = (page) => {
    return fetch(`${BASE_URL}/repos?sort=pushed&per_page=4&page=${page}`, {
      headers: {
        authorization: `Basic ${btoa(`${REACT_APP_ID}:${REACT_APP_SECRETS}`)}`,
      },
    }).then((res) => res.json());
}

export const getMe = () => {
  return fetch(`${BASE_URL}`, {
    headers: {
      authorization: `Basic ${btoa(`${REACT_APP_ID}:${REACT_APP_SECRETS}`)}`,
    },
  }).then((res) => res.json());
};
