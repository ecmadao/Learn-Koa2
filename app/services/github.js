import {githubConfig} from 'config-lite';
import request from 'request';

export const getGithubToke = (code) => {
  return new Promise((resolve, reject) => {
    request.post(`https://github.com/login/oauth/access_token?client_id=${githubConfig.clientId}&client_secret=${githubConfig.clientSecret}&code=${code}`, (err, httpResponse, body) => {
      if (httpResponse.statusCode === 200 && body) {
        resolve(body);
      } else {
        reject(false);
      }
    });
  });
};

export const getGithubUser = (token) => {
  return new Promise((resolve, reject) => {
    request.get(`https://api.github.com/user?access_token=${token}`)
    .on('response', (response) => {
      console.log(response.statusCode)
      resolve(response.toJSON());
    })
    .on('error', (error) => {
      reject(false);
    });
  });
};
