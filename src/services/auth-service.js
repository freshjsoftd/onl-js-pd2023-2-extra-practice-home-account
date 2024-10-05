const bcrypt = require('bcrypt');
// ==============================
const { User } = require('../db/mongo');
const TokenService = require('./token-service');
const AuthError = require('../errors/auth-error');

class AuthService {
	async registration(fullName, email, password) {
		const person = await User.findOne({ email });
		if (person) throw AuthError.badRequest('This user already exists');
		const user = await User.create({ fullName, email, password });
		console.log('New user is: -----------------', user);
		const tokens = TokenService.generateTokens({ email });

		const userId = user._id;
		// const uId = await User.findOne({email}, {_id: 1})
		// console.log('Id from user', userId)
		// console.log('Id from mongo', uId)

		await TokenService.saveToken(userId, tokens.refreshToken);

		return {
			...tokens,
			user: {
				id: userId,
				email,
			},
		};
	}

	async login(email, password) {
		const user = await User.findOne({ email });
		if (!user) throw AuthError.unAuthorizedError();

		const isPassRight = await bcrypt.compare(password, user.password);

		if (!isPassRight) throw AuthError.unAuthorizedError();

		const tokens = TokenService.generateTokens({ email });

		const userId = user._id;

		await TokenService.saveToken(userId, tokens.refreshToken);

		return {
			...tokens,
			user: {
				id: userId,
				email,
			},
		};
	}

	async logout(refreshToken) {
		const token = await TokenService.deleteToken(refreshToken);

		return token;
	}

	async refresh(refreshToken) {
		if (!refreshToken) throw AuthError.unAuthorizedError();

		const data = TokenService.validateRefreshToken(refreshToken);

		const dbToken = await TokenService.findToken(refreshToken);

		if (!data || !dbToken) throw AuthError.unAuthorizedError();

		console.log('Data refresh is:------', data);

		const { email } = data;

		const userId = await User.findOne({ email }, { _id: 1 });

		const tokens = TokenService.generateTokens({ email });

		await TokenService.saveToken(userId, tokens.refreshToken);

		return {
			...tokens,
			user: {
				id: userId,
				email,
			},
		};
	}

	async getAllUsers() {
		const users = await User.find();
		return users;
	}
}

module.exports = new AuthService();
