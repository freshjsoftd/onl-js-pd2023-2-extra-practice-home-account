const AuthError = require('../errors/auth-error');
const TokenService = require('../services/token-service');

module.exports.authHandler = (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader) {
			return next(AuthError.unAuthorizedError());
		}
		const accessToken = authHeader.split(' ')[1];
    if (!accessToken) {
			return next(AuthError.unAuthorizedError());
		}
    const data = TokenService.validateAccessToken(accessToken)
    console.log(data)
    if (!data) {
			return next(AuthError.unAuthorizedError());
		}
    req.user = data
    next()
	} catch (error) {
		return next(AuthError.unAuthorizedError());
	}
};
// Bearer gfgfgmfg
