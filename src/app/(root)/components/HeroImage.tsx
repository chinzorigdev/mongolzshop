import Image from "next/image";

export default function MainNav() {
  return (
    <div
      className="max-w-6xl mx-auto px-1 md:px-8 py-6 md:py-5"
      data-aos="zoom-in"
      data-aos-duration="2000"
    >
      <div className="relative overflow-hidden rounded-lg w-full aspect-[8/3]">
        <Image
          id="hero-image"
          src="https://kom-uploads.s3.amazonaws.com/store-1599/hero--1709463990-w1600.jpg"
          className="object-cover w-full h-full object-[center_50%]"
          alt="Hero Image"
          width={1600}
          height={600}
        />
      </div>
    </div>
  );
}
