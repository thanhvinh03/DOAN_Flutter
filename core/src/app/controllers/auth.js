import { body, validationResult } from "express-validator";
import userRepository from "../repositories/userRepository.js";
import Result from "../common/Result.js";

const login = async (req, res) => {
	const err = validationResult(req);
	if (!err.isEmpty()) {
		res.status(400).json({
			message: `Has error`,
		});
	}
	const { email, password } = req.body;

	const userExists = await userRepository.login({ email, password });

	if (userExists) {
		res.status(200).json(
			new Result({ user: userExists }, "Login success", true)
		);
	} else {
		res.status(400).json(new Result(null, "Login failed", true));
	}
};

const register = async (req, res) => {
	const err = validationResult(req);
	if (!err.isEmpty()) {
		return res.status(400).json({
			message: `Has error`,
		});
	}
	const { email, username, password } = req.body;

	const userExists = await userRepository.getByEmail(email);
	if (userExists) {
		return res
			.status(400)
			.json(new Result(null, "This email has already used.", false));
	}
	const register = await userRepository.register({
		email,
		username,
		password,
	});

	if (register) {
		return res
			.status(200)
			.json(
				new Result(
					{ token: register.token },
					"Register successful !",
					true
				)
			);
	} else {
		return res.status(500).json(new Result(null, "Register failed", false));
	}
};

export default { login, register };
