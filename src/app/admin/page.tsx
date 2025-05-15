import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold">Admin Page</h1>
      <p className="mt-4 text-lg">Welcome to the admin panel!</p>
      <Link href="/admin/products">
        <h2 className="text-4xl font-semibold cursor-pointer">
          Go to products
        </h2>
      </Link>
    </div>
  );
}
