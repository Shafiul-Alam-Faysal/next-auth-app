import { error } from "console";
import mongoose from "mongoose";

export const connect = async () => {
	try {
		mongoose.connect(process.env.MONGO_URI!);
		const connection = mongoose.connection;

		connection.on("connected", () => {
			console.log("MongoDB connected successfully");
		});

		connection.on("error", () => {
			console.log(
				"MongoDB connection failed. Please make sure MongoDB in running. " +
					error
			);
			process.exit();
		});
	} catch (error) {
		console.log("Something went wrong while connecting to MongoDB", error);
	}
};
