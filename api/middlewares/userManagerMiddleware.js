const fetch = require('node-fetch');
const Users = require('../models/User');

const userManager = async function (req, res, next) {
    const {authorization} = req.headers;
    let systemUser = await getSystemUser(req);
    if (!systemUser) {
        let auth0User = await getAuth0User(authorization);
        systemUser = await createSystemUser(auth0User);
    }
    req.user = systemUser;
    next();
};

async function getSystemUser(req) {
    return Users.findOne({sub: req.user.sub}, function (err, user) {
        return user;
    })
}

async function getAuth0User(authorization) {
    const reqUrl = 'https://dev-0aed4z8b.eu.auth0.com/userinfo';
    const headers = {Authorization: authorization};
    return fetch(reqUrl, {headers}).then(res => res.json());
}

async function createSystemUser(auth0User) {
    const {sub, name, email} = auth0User;
    const user = {sub, name, email};
    return Users.create(user);
}

module.exports = userManager;