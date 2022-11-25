import { fire } from './firebase';
// TODO alterar 'app' e 'firebase'
export const global = {
  version: '0.0.2',
  app: {
    logo: './../assets/whiteLabel/logo.png',
  },
  notify: {
    base: 'https://onesignal.com/api/v1/notifications',
    apiKey: 'Basic ZDU4OWQzYTEtZWY5OC00YTg2LTkzZTgtMjM5MDk0MzU2NDk0',
  },
  firebase: fire.firebase,
  paths: {
    users: {
      myUser: 'myUser',
      allUsers: 'allUsers',
    },
    banner: 'banner',
    club: 'club',
    ads: 'ads',
    news: 'news',
    newsLength: 'news-length',
    update: 'update',
    remoteConfig: 'remoteConfig',
  },
};
