// export default function ProfileSlugPage({
// 	// removed async
// 	params,
// }: {
// 	params: { slug: string };
// }) {
// 	// await params (even if it's just destructuring)
// 	// const { slug } = await params;
// 	const { slug } = params;

// 	return (
// 		<div className="flex flex-col items-center justify-center min-h-screen py-2">
// 			<h1>Profile</h1>
// 			<p className="text-4xl">
// 				Profile page <span className="p-2 bg-amber-700">{slug}</span>
// 			</p>
// 		</div>
// 	);
// }

// src/app/profile/[slug]/page.tsx

export default async function ProfileSlugPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<h1>Profile</h1>
			<p className="text-4xl">
				Profile page <span className="p-2 bg-amber-700">{slug}</span>
			</p>
		</div>
	);
}
