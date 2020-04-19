const Users = require('../models/User');
const fetch = require('node-fetch');

const getSystemUser = async (sub) => {
    return Users.findOne({sub});
};

const userManager = async (req, res, next) => {
    const {authorization} = req.headers;
    let user = await getSystemUser(req.user.sub);
    if (!user) {
        let auth0User = await getAuth0User(authorization);
        user = await createUser(auth0User);
    }
    req.user = user;
    next();
};

const getAuth0User = async (token) => {
    const url = 'https://dev-0aed4z8b.eu.auth0.com/userinfo';
    const headers = {Authorization: token};
    return fetch(url, {headers}).then(res => res.json());
};

const createUser = async (data) => {
    return Users.create(data);
};

module.exports = userManager;
