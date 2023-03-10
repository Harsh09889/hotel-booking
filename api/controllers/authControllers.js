import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
	try {
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(req.body.password, salt);

		const newUser = new User({
			username: req.body.username,
			password: hash,
			email: req.body.email,
		});
		await newUser.save();
		res.status(201).send("User succesfuly created");
	} catch (err) {
		next(err);
	}
};

export const login = async (req, res, next) => {
	try {
		const user = await User.findOne({ username: req.body.username });

		if (!user) return next(createError(404, "User does not exist!!"));

		const isPasswordCorrect = await bcrypt.compare(
			req.body.password,
			user.password
		);

		if (!isPasswordCorrect)
			return next(createError(401, "Username or Password is Wrong"));

		const token = jwt.sign(
			{ id: user._id, isAdmin: user.isAdmin },
			process.env.JWT
		);

		const { isAdmin, password, ...otherDetails } = user._doc;

		res
			.cookie("access_token", token, {
				httpOnly: true,
			})
			.status(200)
			.json(otherDetails);
	} catch (err) {
		next(err);
	}
};
