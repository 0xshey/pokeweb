import BaseLayout from "@/components/layouts/base-layout";

export default function Layout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return <BaseLayout>{children}</BaseLayout>;
}
