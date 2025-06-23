import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { error } from "console";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json();
		const { email, password } = reqBody;
		console.log(reqBody);

		//check if user exists
		const user = await User.findOne({ email });
		if (!user) {
			return NextResponse.json(
				{ error: "User does not exist" },
				{ status: 404 }
			);
		}

		console.log("user exists");

		//check if password is correct
		const isPasswordCorrect = await bcrypt.compare(password, user.password);
		if (!isPasswordCorrect) {
			return NextResponse.json(
				{ error: "Incorrect password" },
				{ status: 400 }
			);
		}

		//create token data
		const tokenData = {
			id: user._id,
			email: user.email,
			username: user.username,
		};

		//create token
		const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
			expiresIn: "1h",
		});

		const response = NextResponse.json({
			message: "Login successful",
			success: true,
		});

		response.cookies.set("token", token, {
			httpOnly: true,
		});

		return response;
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
