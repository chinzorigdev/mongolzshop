import Link from "next/link";

export default function NavTop() {
  return (
    <nav className="bg-gray-50 border-b border-gray-200">
      <div className="py-2.5 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="h-4 flex gap-2 items-center justify-between">
          <span className="self-center text-xs whitespace-nowrap text-gray-500 grow overflow-hidden truncate mr-5">
            THE MONGOLZ SHOP
          </span>

          <div className="flex items-center justify-center gap-2 sm:gap-4 text-gray-700 shrink-0">
            <Link
              href="/orderdetail"
              className="flex items-center justify-center transition-colors group"
            >
              <span className="mr-1 text-gray-500 group-hover:text-neutral-700">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                  ></path>
                </svg>
              </span>

              <span className="hidden sm:block text-gray-600 group-hover:text-neutral-700 text-xs uppercase">
                ЗАХИАЛГЫН ЯВЦ
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
