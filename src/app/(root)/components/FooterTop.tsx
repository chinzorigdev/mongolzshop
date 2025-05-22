import Image from "next/image";

export default function FooterTop() {
  return (
    <>
      <div className="bg-white border-t py-8">
        <div className="max-w-6xl mx-auto pb-6 sm:pb-8 px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
            <div
              className="text-center sm:flex sm:text-left lg:block lg:text-center aos-init aos-animate"
              data-aos="zoom-in"
              data-aos-duration="1000"
            >
              <div className="sm:flex-shrink-0">
                <div className="flow-root">
                  <Image
                    className="w-24 mx-auto pt-2 sm:pt-4 x-icon"
                    src="https://d2sucgbhjy7j1n.cloudfront.net/common/icons/truck.gif"
                    alt="Захиалга хүргэх"
                    loading="lazy"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3 lg:mt-3 lg:ml-0">
                <h3 className="text-sm font-medium text-gray-900">
                  Захиалга хүргэх
                </h3>
                <p className="mt-2 text-sm text-gray-500 whitespace-pre-line">
                  Таны захиалга баталгаажсаны дараа бид 3-5 хоногийн дотор
                  хүргэнэ.
                </p>
              </div>
            </div>

            <div
              className="text-center sm:flex sm:text-left lg:block lg:text-center aos-init aos-animate"
              data-aos="zoom-in"
              data-aos-duration="1000"
            >
              <div className="sm:flex-shrink-0">
                <div className="flow-root">
                  <Image
                    className="w-20 mx-auto pt-6 sm:pt-8 x-icon"
                    src="https://d2sucgbhjy7j1n.cloudfront.net/common/icons/payment.gif"
                    alt="Төлбөрийн нөхцөл"
                    loading="lazy"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3 lg:mt-3 lg:ml-0">
                <h3 className="text-sm font-medium text-gray-900">
                  Төлбөрийн нөхцөл
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {" "}
                  Төлбөрийг бүрэн шилжүүлснээр захиалга баталгаажна. Та
                  гүйлгээний утга дээр захиалгын код, утасны дугаараа бичээрэй.
                </p>
              </div>
            </div>

            <div
              className="text-center sm:flex sm:text-left lg:block lg:text-center aos-init aos-animate"
              data-aos="zoom-in"
              data-aos-duration="1000"
            >
              <div className="sm:flex-shrink-0">
                <div className="flow-root">
                  <Image
                    className="w-20 mx-auto pt-6 sm:pt-8 x-icon"
                    src="https://d2sucgbhjy7j1n.cloudfront.net/common/icons/box.gif"
                    alt="Хүргэлтийн нөхцөл"
                    loading="lazy"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3 lg:mt-3 lg:ml-0">
                <h3 className="text-sm font-medium text-gray-900">
                  Хүргэлтийн нөхцөл
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  3 ба түүнээс дээш бүтээгдэхүүнд хүргэлт ҮНЭГҮЙ. Бусад
                  тохиолдолд хүргэлтийн төлбөр 6’000₮.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
