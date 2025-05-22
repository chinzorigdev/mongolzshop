import Link from "next/link";
import Image from "next/image";
export default function Checkout() {
  return (
    <>
      <section>
        <div className="bg-white py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center">
              Захиалгаа баталгаажуулах
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-12">
              {/* Cart Section */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="sr-only">Сагсан дахь бараанууд</h2>
                <ul className="-my-6 divide-y divide-gray-200">
                  <li className="py-6 flex space-x-6">
                    <Image
                      src="https://kom-uploads.s3.amazonaws.com/store-1599/product-17624--1733167005-w400.jpg"
                      alt="MongolZ Jersey"
                      className="h-24 w-24 object-cover rounded-md"
                      width={100}
                      height={100}
                    />
                    <div className="flex-auto">
                      <h3 className="text-base font-medium text-gray-900">
                        The MongolZ - Pro Jersey 2025
                      </h3>
                      <p className="text-sm text-gray-500">XL</p>
                      <p className="text-gray-500">150’000 × 1</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">150’000</p>
                  </li>
                </ul>

                <dl className="text-sm font-medium text-gray-500 mt-10 space-y-4">
                  <div className="flex justify-between">
                    <dt>Захиалгын дүн</dt>
                    <dd className="text-gray-900">150’000</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="flex items-center">
                      Хүргэлтийн төлбөр
                      <span className="ml-2 relative group">
                        <svg
                          className="w-5 h-5 text-gray-400 hover:text-gray-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <span className="absolute left-1/2 -top-8 transform -translate-x-1/2 bg-gray-600 text-white text-xs p-2 rounded-md hidden group-hover:block">
                          3 тооноос цөөн бараанд төлбөртэй.
                        </span>
                      </span>
                    </dt>
                    <dd className="text-gray-900">6’000</dd>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 text-gray-900 pt-6">
                    <dt className="text-base font-semibold">Нийт төлбөр</dt>
                    <dd className="text-base font-semibold">156’000</dd>
                  </div>
                </dl>
              </div>

              {/* Checkout Form  */}
              <form method="post" action="" id="form" className="space-y-6">
                <input type="hidden" name="action" value="confirm" />
                <h2 className="text-lg font-medium text-gray-900">
                  Хүргэлтийн мэдээлэл
                </h2>

                <div>
                  <label
                    htmlFor="input-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Хүлээн авах хүний нэр
                  </label>
                  <input
                    type="text"
                    id="input-name"
                    name="name"
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="input-phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Холбоо барих утасны дугаар
                  </label>
                  <input
                    type="text"
                    id="input-phone"
                    name="phone"
                    pattern="[0-9]+"
                    title="Зөвхөн бүхэл тоо байх ёстой"
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="input-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Хүргүүлэх хаяг
                    <span className="block text-xs text-gray-500 mt-1">
                      Дүүрэг, хороо, гудамж, хороолол, байр, тоот болон
                      шаардлагатай бол орцны кодоо тодорхой бичнэ үү.
                    </span>
                  </label>
                  <textarea
                    id="input-address"
                    name="address"
                    rows={3}
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  ></textarea>
                </div>

                <p className="text-sm text-gray-500">
                  Та мэдээллээ бүрэн гүйцэт оруулсан эсэхээ нягтлаарай.
                  Шаардлагатай мэдээллийг дутуу эсвэл ойлгомжгүй оруулсан
                  тохиолдолд хүргэлт удааширч болзошгүй.
                </p>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white font-medium py-3 px-4 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Захиалгыг батлах
                </button>

                <p className="text-sm text-center text-gray-500">
                  эсвэл
                  <Link
                    href="/"
                    className="text-indigo-600 hover:text-indigo-500"
                  >
                    дэлгүүр лүү буцах →
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
