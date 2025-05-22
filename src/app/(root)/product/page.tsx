import Image from "next/image";

export default function OrderDetail() {
  return (
    <>
      <div data-product="" className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 md:gap-12 lg:gap-20">
            {/*  Бүтээгдэхүүний зураг */}
            <div>
              <div data-product-images="" className="flex flex-col gap-6">
                <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-gray-300">
                  <Image
                    id="main-image"
                    src="https://kom-uploads.s3.amazonaws.com/store-1599/product-17624--1733167005-w900.jpg"
                    alt="The MongolZ - Pro Jersey 2025"
                    className="w-full h-full object-contain transition-opacity duration-300 ease-in-out"
                    width={900}
                    height={900}
                    loading="lazy"
                  />
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <button className="thumbnail-btn active border-2 border-indigo-500">
                    <Image
                      src="https://kom-uploads.s3.amazonaws.com/store-1599/product-17624--1733167005-w400.jpg"
                      alt="The MongolZ - Pro Jersey 2025"
                      className="rounded-md object-cover border border-gray-300"
                      width={100}
                      height={100}
                      loading="lazy"
                    />
                  </button>
                  <button className="thumbnail-btn border border-gray-300">
                    <Image
                      src="https://kom-uploads.s3.amazonaws.com/store-1599/product-17624--1733167014-w400.jpg"
                      alt="The MongolZ - Pro Jersey 2025"
                      className="rounded-md object-cover"
                      width={100}
                      height={100}
                      loading="lazy"
                    />
                  </button>
                  <button className="thumbnail-btn border border-gray-300">
                    <Image
                      src="https://kom-uploads.s3.amazonaws.com/store-1599/product-17624--1733168200-w400.jpg"
                      alt="The MongolZ - Pro Jersey 2025"
                      className="rounded-md object-cover"
                      width={100}
                      height={100}
                      loading="lazy"
                    />
                  </button>
                  <button className="thumbnail-btn border border-gray-300">
                    <Image
                      src="https://kom-uploads.s3.amazonaws.com/store-1599/product-17624--1733167982-w400.jpg"
                      alt="The MongolZ - Pro Jersey 2025"
                      className="rounded-md object-cover"
                      width={100}
                      height={100}
                      loading="lazy"
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Бүтээгдэхүүний мэдээлэл */}
            <div className="space-y-6">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                The MongolZ - Pro Jersey 2025
              </h1>
              <p className="text-3xl text-neutral-600 font-bold">150,000₮</p>

              <div className="text-gray-700">
                <p>Official Jersey.</p>
                <p className="italic text-sm text-gray-500">
                  Ази size учраас нэг size томруулж аваарай.
                </p>
              </div>

              {/* Өмсгөл дээр нэр бичүүлэх */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="name_on_jersey"
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded"
                />
                <div>
                  <label
                    htmlFor="name_on_jersey"
                    className="font-medium text-gray-900"
                  >
                    Өмсгөл дээр нэрээ бичүүлэх
                  </label>
                  <p className="text-sm text-gray-500">(17,000₮ нэмэгдэлтэй)</p>
                  <input
                    type="text"
                    id="input-name_on_jersey"
                    className="mt-2 w-full max-w-md p-2.5 border rounded-lg text-sm bg-gray-100 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Өмсгөл дээрх нэр"
                    disabled
                  />
                </div>
              </div>

              {/* Хэмжээ сонгох */}
              <div className="flex flex-wrap gap-2">
                <a
                  href="#"
                  className="size-btn active bg-indigo-500 text-white border-2 border-indigo-500 px-5 py-2 rounded-md  font-medium uppercase transition hover:bg-indigo-500 hover:text-white hover:border-indigo-500"
                >
                  XL
                </a>
                <a
                  href="#"
                  className="size-btn border-2 border-gray-300 px-5 py-2 rounded-md text-gray-700 font-medium uppercase transition hover:bg-indigo-500 hover:text-white hover:border-indigo-500"
                >
                  2XL
                </a>
                <a
                  href="#"
                  className="size-btn border-2 border-gray-300 px-5 py-2 rounded-md text-gray-700 font-medium uppercase transition hover:bg-indigo-500 hover:text-white hover:border-indigo-500"
                >
                  3XL
                </a>
                <a
                  href="#"
                  className="size-btn border-2 border-gray-300 px-5 py-2 rounded-md text-gray-700 font-medium uppercase transition hover:bg-indigo-500 hover:text-white hover:border-indigo-500"
                >
                  5XL
                </a>
              </div>

              {/* Захиалах товч */}
              <button className="w-full max-w-xs py-3 px-8 bg-neutral-600 text-white text-base font-medium rounded-md shadow-md hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 cursor-pointer">
                Захиалах
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
