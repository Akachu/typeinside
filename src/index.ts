import auth from './modules/auth';

auth.getAppId()
.then(appId => {
    console.log(appId);
});