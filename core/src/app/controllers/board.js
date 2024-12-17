import boardRepository from "../repositories/boardRepository.js";
import Result from "../common/Result.js";
const getAll = async function (req, res) {
	try {
		const listboard = await boardRepository.getAll();
		res.status(200).json(
			new Result(
				{
					list: listboard,
				},
				"GET All",
				true
			)
		);
	} catch (exception) {
		res.status(400).json(new Result(null, exception.message, false));
	}
};

const getAllByIdUser = async function (req, res) {
	try {
		const listboard = await boardRepository.getAllByIdUser(
			req.params?.idUser
		);
		res.status(200).json({
			message: "GET by ID User",
			data: {
				list: listboard,
			},
		});
	} catch (exception) {
		res.status(400).json({
			message: "Error",
			data: {},
		});
	}
};

const getById = async function (req, res) {
	try {
		const existsboard = await boardRepository.getById(req.params?.id);
		if (existsboard != null) {
			res.status(200).json({
				message: "success",
				data: {
					board: existsboard,
				},
			});
		} else {
			res.status(400).json({
				message: "Not found",
				data: {},
			});
		}
	} catch (exception) {
		res.status(400).json({
			message: "Error",
			data: {},
		});
	}
};

const getCoopboardByIdUser = async function (req, res) {
	try {
		const listboards = await boardRepository.getCoopboardByIdUser(
			req.params?.idUser
		);
		res.status(200).json({
			message: "GET Coop by ID",
			data: {
				list: listboards,
			},
		});
	} catch (exception) {
		res.status(400).json({
			message: "Error",
			data: {},
		});
	}
};

const create = function (req, res) {
	console.log(req.body);

	const newboard = boardRepository.create(req.body);

	if (newboard != null) {
		res.status(200).json({
			message: "create",
			data: {
				board: newboard,
			},
		});
	} else {
		res.status(400).json({
			message: "error",
			data: {},
		});
	}
};

const addMembers = async function (req, res) {
	const members = req.body?.members;
	const id = req.params?.id;

	if (members == undefined) {
		return res.status(400).json({
			message: "Not have members to add",
			data: {},
		});
	}

	const board = await boardRepository.addMembers(id, members);

	if (board !== null) {
		res.status(200).json({
			message: "Add members successful",
			data: {
				board: board,
			},
		});
	} else {
		res.status(400).json({
			message: "Add failed",
			data: {},
		});
	}
};

const removeMembers = async function (req, res) {
	const members = req.body.members;
	const id = req.params.id;

	if (members == undefined) {
		return res.status(400).json({
			message: "Not have members to add",
			data: {},
		});
	}

	const board = await boardRepository.removeMembers(id, members);

	if (board !== null) {
		res.status(200).json({
			message: "Remove members successful",
			data: {
				board: board,
			},
		});
	} else {
		res.status(400).json({
			message: "Remove failed",
			data: {},
		});
	}
};

const updateById = async function (req, res) {
	const update = await boardRepository.updateById(
		req.params.id.trim(),
		req.body
	);

	if (update !== null) {
		res.status(200).json({
			message: "Update successful",
			data: {
				board: update,
			},
		});
	} else {
		res.status(400).json({
			message: "Update failed",
			data: {},
		});
	}
};

const deleteById = async function (req, res) {
	const deleteSuccess = await boardRepository.deleteById(req.params?.id);
	if (deleteSuccess) {
		res.status(200).json({
			message: "Delete successful",
			data: {},
		});
	} else {
		res.status(400).json({
			message: "Delete failed",
		});
	}
};

export default {
	getAll,
	getAllByIdUser,
	getCoopboardByIdUser,
	addMembers,
	removeMembers,
	getById,
	create,
	updateById,
	deleteById,
};
