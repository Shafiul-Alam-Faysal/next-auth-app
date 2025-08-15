export default async function ProfileSlugPage({
	params,
}: {
	params: { slug: string };
}) {
	// await params (even if it's just destructuring)
	// const { slug } = await params;
	const { slug } = params;

	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<h1>Profile</h1>
			<p className="text-4xl">
				Profile page <span className="p-2 bg-amber-700">{slug}</span>
			</p>
		</div>
	);
}
