const bcrypt = require('bcrypt');
// ==============================
const { User } = require('../db/mongo');
const TokenService = require('./token-service');

class AuthService {
	async registration(fullName, email, password) {
		const person = await User.findOne({ email });
		if (person) throw new Error('This user already exists');
		const user = await User.create({ fullName, email, password });
		console.log('New user is: -----------------', user);
		const tokens = TokenService.generateTokens({ email });

    const userId = user._id

    await TokenService.saveToken(userId, tokens.refreshToken)

    return {
      ...tokens,
      user: {
        id: userId,
        email
      }
    }
	}

  
}

module.exports = new AuthService();
