import Image from "next/image";
import Link from "next/link";

export default function NavMain() {
  return (
    <nav className="bg-white">
      <div className="flex items-center justify-between gap-4 md:gap-12 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 h-16 sm:h-24 lg:h-28">
        <div className="flex gap-4 items-center justify-start grow overflow-hidden">
          {" "}
          <Link href="/">
            {" "}
            <Image
              className="h-8 sm:h-12 lg:h-16 hover:opacity-80 transition-all"
              src="/img/yellowlogo.png"
              alt="Company Logo"
              width={300}
              height={64}
            />
          </Link>
        </div>
        <div className="hidden sm:flex justify-center gap-6 items-center shrink-0">
          <div className="flex gap-3 justify-center items-center group">
            {" "}
            <Image
              src="https://d2sucgbhjy7j1n.cloudfront.net/common/icons/phone.gif"
              alt="Animated phone icon"
              className="w-8 hidden group-hover:block"
              width={32}
              height={32}
            />
            <Image
              src="https://d2sucgbhjy7j1n.cloudfront.net/common/icons/phone.png"
              alt="Phone icon"
              className="w-8 block group-hover:hidden"
              style={{ padding: "3px" }}
              width={32}
              height={32}
            />
            <div className="flex flex-col items-start justify-center group max-w-40">
              <p className="text-gray-600 font-semibold group-hover:text-gray-900">
                72444181
              </p>
              <p className="text-gray-400 text-xs group-hover:text-gray-600">
                Ажлын өдөр 09:00-18:00
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
