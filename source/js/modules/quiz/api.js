const url = './json/data-quiz.json';

const getJson = (cb) => {
  fetch(url).then((response) => {
    return response.json();
  }).then((json) => {
    cb(json);
  });
};

export {getJson};
