import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<div className="flex justify-center items-center h-screen">
			<Link
				href="/signup"
				className="p-4 bg-amber-300 text-black text-5xl rounded-4xl"
			>
				Click to go to signup page or profile
			</Link>
		</div>
	);
}
