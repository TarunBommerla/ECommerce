import React, { useEffect, useState } from "react";

const images = [
  "./images/banner_1.png",
  "./images/banner_2.png",
  "./images/banner_3.png",
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full px-4 md:px-8 lg:px-12 py-6">
      <div className="relative mx-auto max-w-9xl overflow-hidden rounded-xl shadow-2xl">
        {/* Slider */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {images.map((image, index) => (
            <div key={index} className="min-w-full">
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="h-55 w-full object-cover sm:h-75 md:h-105 lg:h-130"
              />
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
