"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ProfilePage = () => {
	const router = useRouter();
	const [data, setData] = useState("");
	const logout = async () => {
		try {
			await axios.get("/api/users/logout");
			toast.success("Logged out successfully");

			router.push("/login");
			//
		} catch (error: any) {
			console.log(error.message);

			toast.error(error.message);
		}
	};

	const getUserDetails = async () => {
		const res = await axios.get("/api/users/me");
		console.log(res.data);
		setData(res.data.data.user);
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<h1>Profile</h1>
			<p>Profile page</p>
			<h2 className="p-1 rounded bg-green-500">
				{data === "" ? "Nothing" : <Link href={`/profile/${data}`}></Link>}
			</h2>
			<button
				onClick={logout}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-4 py-2 px-4 rounded cursor-pointer"
			>
				Logout
			</button>
			<button
				onClick={getUserDetails}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-4 py-2 px-4 rounded cursor-pointer"
			>
				GetUser Details
			</button>
		</div>
	);
};

export default ProfilePage;
