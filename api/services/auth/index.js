const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-0aed4z8b.eu.auth0.com/.well-known/jwks.json'
    }),
    audience: 'auth0-demo',
    issuer: 'https://dev-0aed4z8b.eu.auth0.com/',
    algorithms: ['RS256']
});

module.exports = jwtCheck;