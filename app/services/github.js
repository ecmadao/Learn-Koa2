import config from 'config';
import request from 'request';

const clientId = config.get('githubConfig.clientId');
const clientSecret = config.get('githubConfig.clientSecret');
const appName = config.get('githubConfig.appName');

export const getGithubToke = (code) => {
  return new Promise((resolve, reject) => {
    request.post(`https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`, (err, httpResponse, body) => {
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
    request.get(`https://api.github.com/user?access_token=${token}`, {
      headers: {
        'User-Agent': appName
      }
    }, (err, httpResponse, body) => {
      if (httpResponse.statusCode === 200 && body) {
        resolve(body);
      } else {
        reject(false);
      }
    });
  });
};
