import Link from "next/link";

export default function OrderConfirmation() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-sm font-semibold uppercase tracking-wide text-neutral-600">
        Баярлалаа!
      </h1>
      <p className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
        Та төлбөрөө төлж захиалгаа баталгаажуулна уу
      </p>

      <ol className="relative border-l border-gray-300 mt-8 space-y-8">
        <li className="relative pl-6">
          <div className="absolute w-3 h-3 bg-green-500 rounded-full -left-1.5 border border-white"></div>
          <h3 className="text-lg font-semibold text-green-600">
            Захиалга үүссэн
          </h3>
        </li>

        <li className="relative pl-6">
          <div className="absolute w-3 h-3 bg-yellow-400 rounded-full -left-1.5 border border-white"></div>
          <h3 className="text-lg font-semibold text-yellow-600">
            Төлбөр хүлээгдэж байна
          </h3>
          <div className="mt-2 bg-yellow-50 p-4 rounded-lg shadow-sm">
            <p className="text-gray-700">
              <strong>Банк:</strong> Голомт банк
            </p>
            <p className="text-gray-700">
              <strong>Дансны дугаар:</strong> 1905164327
            </p>
            <p className="text-gray-700">
              <strong>Дансны нэр:</strong> Төрболд Өлзийхишиг
            </p>
            <p className="text-gray-700">
              <strong>Гүйлгээний утга:</strong> 005551, 123
            </p>
            <p className="text-gray-700">
              <strong>Шилжүүлэх дүн:</strong>
              <span
                data-modal-open="order"
                className="text-blue-600 font-medium cursor-pointer"
              >
                156’000₮
              </span>
            </p>
            <p className="mt-4 text-sm text-gray-600">
              <strong>Анхааруулга:</strong> Гүйлгээний утга дээр 6 оронтой код,
              утасны дугаараа заавал бичээрэй.
            </p>
            <p className="text-sm text-gray-600">
              Лавлах утас:
              <a href="tel:72444181" className="text-blue-600">
                72444181
              </a>
            </p>
          </div>
        </li>

        <li className="relative pl-6">
          <div className="absolute w-3 h-3 bg-gray-400 rounded-full -left-1.5 border border-white"></div>
          <h3 className="text-lg font-semibold text-gray-500">
            Хүргэлтэнд гарах
          </h3>
          <p className="text-gray-500 text-sm">
            Захиалга баталгаажсаны дараа барааг бэлдэж, хүргэлтэнд шилжүүлнэ.
          </p>
        </li>
      </ol>

      <div className="mt-6 text-sm text-gray-600">
        <strong>Жич:</strong> Захиалгын явцыг
        <Link
          href="https://www.mongolz.shop/order/005551-123"
          className="text-blue-600"
        >
          энд дарж
        </Link>
        шалгана уу.
      </div>

      <div className="mt-6 text-right">
        <Link href="/" className="text-blue-600 font-medium">
          Дэлгүүр лүү буцах →
        </Link>
      </div>
    </div>
  );
}
