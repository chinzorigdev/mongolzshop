import Link from "next/link";

export default function FooterBottom() {
  return (
    <footer className="border-t border-gray-200">
      <div className="max-w-6xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav className="-mx-5 -my-2 flex flex-wrap justify-center">
          <div className="px-5 py-2">
            <div
              // href="tel:72444181"
              className="text-base text-gray-500 hover:text-gray-900"
            >
              Утас: 72444181
            </div>
          </div>
        </nav>

        <div className="mt-8 text-center text-base text-gray-400">
          © 2022-2025 Дэлгүүрийн программыг{" "}
          <Link
            href="https://kom.mn/"
            target="_blank"
            className="text-gray-500 hover:text-gray-900"
          >
            kom.mn
          </Link>
          .
        </div>
      </div>
    </footer>
  );
}
