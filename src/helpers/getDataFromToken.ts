// import { NextRequest } from "next/server";

// import jwt from "jsonwebtoken";

// export const getDataFromToken = (request: NextRequest) => {
// 	try {
// 		const token = request.cookies.get("token")?.value || "";
// 		const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
// 		return decodedToken.id;
// 	} catch (error: any) {
// 		throw new Error(error.message);
// 	}
// };

import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest): string => {
	try {
		const token = request.cookies.get("token")?.value;

		if (!token) {
			throw new Error("No token found in cookies");
		}

		const secret = process.env.TOKEN_SECRET;
		if (!secret) {
			throw new Error("TOKEN_SECRET environment variable is not defined");
		}

		// jwt.verify returns string | JwtPayload
		const decodedToken = jwt.verify(token, secret) as JwtPayload;

		if (!decodedToken.id) {
			throw new Error("Token does not contain an id");
		}

		return decodedToken.id as string;
	} catch (error: any) {
		throw new Error(error.message);
	}
};
