"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function SignupPage() {
	const router = useRouter();

	const [user, setUser] = useState({
		email: "",
		password: "",
		username: "",
	});

	const [buttonDisabled, setButtonDisabled] = React.useState(false);

	const [loading, setLoading] = useState(false);

	const onSignup = async () => {
		try {
			setLoading(true);
			const response = await axios.post("/api/users/signup", user);
			console.log("Signup success", response.data);
			router.push("/login");
		} catch (error: any) {
			console.log("Signup failed", error.message);
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (
			user.email.length > 0 &&
			user.password.length > 0 &&
			user.username.length > 0
		) {
			setButtonDisabled(false);
		} else {
			setButtonDisabled(true);
		}
	}, [user]);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<h1 className="mb-4 text-2xl font-semibold">
				{loading ? "Processing" : "Signup"}
			</h1>

			{/* Username */}
			<div className="flex items-center mb-4">
				<label className="w-24 mr-2 text-right" htmlFor="username">
					Username
				</label>
				<input
					className="p-2 border-2 border-white rounded-lg focus:outline-none"
					id="username"
					type="text"
					value={user.username}
					onChange={(e) => setUser({ ...user, username: e.target.value })}
					placeholder="username"
				/>
			</div>

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
				onClick={onSignup}
				className="mt-4 px-6 py-2 bg-blue-900 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out cursor-pointer"
			>
				{buttonDisabled ? "Sign up" : "Signing up..."}
			</button>
			<Link className="my-4" href="/login">
				Visit login page
			</Link>
		</div>
	);
}
