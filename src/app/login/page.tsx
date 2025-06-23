"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import React from "react";

export default function LoginPage() {
	const router = useRouter();

	const [user, setUser] = useState({
		email: "",
		password: "",
	});

	const [buttonDisabled, setButtonDisabled] = React.useState(false);

	const [loading, setLoading] = useState(false);

	const onLogin = async () => {
		try {
			setLoading(true);
			const response = await axios.post("/api/users/login", user);
			console.log(response);
			toast.success("Login success");
			router.push("/profile");
		} catch (error: any) {
			console.log("Login failed", error.message);
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (user.email.length > 0 && user.password.length > 0) {
			setButtonDisabled(false);
		} else {
			setButtonDisabled(true);
		}
	}, [user]);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<h1 className="mb-4 text-2xl font-semibold">
				{loading ? "Processing" : "Login"}
			</h1>

			{/* Email */}
			<div className="flex items-center mb-4">
				<label className="w-24 mr-2 text-right" htmlFor="email">
					Email
				</label>
				<input
					className="p-2 border-2 border-white rounded-lg focus:outline-none"
					id="email"
					type="text"
					value={user.email}
					onChange={(e) => setUser({ ...user, email: e.target.value })}
					placeholder="email"
				/>
			</div>

			{/* Password */}
			<div className="flex items-center mb-4">
				<label className="w-24 mr-2 text-right" htmlFor="password">
					Password
				</label>
				<input
					className="p-2 border-2 border-white rounded-lg focus:outline-none"
					id="password"
					type="password"
					value={user.password}
					onChange={(e) => setUser({ ...user, password: e.target.value })}
					placeholder="password"
				/>
			</div>
			<button
				onClick={onLogin}
				className="mt-4 px-6 py-2 bg-blue-900 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out cursor-pointer"
			>
				Login
			</button>
			<Link className="my-4" href="/signup">
				Visit Signup page
			</Link>
		</div>
	);
}
