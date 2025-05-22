import Link from "next/link";

export default function MainNav() {
  return (
    <section className="bg-neutral-600 h-12 sm:h-14">
      <div className="flex items-center justify-between mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="text-white hover:text-neutral-200 transition-colors"
          >
            <i className="ri-menu-line"></i>
          </a>
          <Link
            href="/products"
            className="text-white hover:text-neutral-200 transition-colors"
          >
            БҮХ БАРАА
          </Link>
          <Link
            href="/blogs"
            className="text-white hover:text-neutral-200 transition-colors"
          >
            НИЙТЛЭЛҮҮД
          </Link>
        </div>
        <div>
          <a
            href="#"
            className="text-white hover:text-neutral-200 transition-colors"
          >
            <i className="ri-search-line"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
