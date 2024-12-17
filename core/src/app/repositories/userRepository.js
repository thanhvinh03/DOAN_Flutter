import User from "../models/User.js";

import bycrypt from "bcrypt";

import jwt from "jsonwebtoken";

import JwtManage from "../../util/JwtManage.js";

const getByEmail = async function (email) {
	const userExists = await User.findOne({
		email,
	});

	return userExists ? new UserDTO(userExists) : null;
};

const getById = async function (id) {
	const userExists = await User.findById(id);
	userExists.password = "";

	return userExists ? new UserDTO(userExists) : null;
};

const getAll = async function () {
	let userExists = await User.find();
	return userExists ?? null;
};

const login = async function ({ email, password }) {
	try {
		const userExists = await User.findOne({
			email,
		});

		const isMatched = bycrypt.compare(password, userExists.password);

		if (isMatched) {
			const token = JwtManage.generateToken(userExists);
			userExists.password = "";
			return {
				userExists,
				token,
			};
		}
		return null;
	} catch (exception) {
		return null;
	}
};

const register = async function ({ email, username, password }) {
	const hashedPass = (
		await bycrypt.hash(password, parseInt(process.env.SALT_ROUND))
	).toString();
	try {
		const newUser = new User({
			email,
			username,
			password: hashedPass,
		});
		await newUser.save();
		let token = JwtManage.generateToken(newUser);
		newUser.password = "";

		return {
			newUser,
			token,
		};
	} catch (err) {
		return err;
	}
};

const updateImages = async function () {};

export default {
	getByEmail,
	getById,
	getAll,
	register,
	login,
};
