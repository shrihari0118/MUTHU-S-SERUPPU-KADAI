import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const footwearImages = [
  {
    src: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop&crop=center",
    alt: "Sneakers",
  },
  {
    src: "https://shorturl.at/xadcH",
    alt: "Kids Footwear",
  },
  {
    src: "https://shorturl.at/SaKdH",
    alt: "Heels",
  },
  {
    src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3BvcnQlMjBzaG9lc3xlbnwwfHwwfHx8MA%3D%3D",
    alt: "Sports Shoes",
  },
  {
    src: "https://i.pinimg.com/736x/20/6d/68/206d68f8e2d4ae7968880338e4f03620.jpg",
    alt: "Slippers",
  },
];

const Hero = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const [fade, setFade] = useState(true);

useEffect(() => {
  const interval = setInterval(() => {
    setFade(false); // start fade-out

    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % footwearImages.length);
      setFade(true); // fade back in after image change
    }, 500); // half the duration of total transition
  }, 3000);

  return () => clearInterval(interval);
}, []);


  return (
    <section
      id="home"
      className="relative bg-gradient-to-br from-muthu-beige to-muthu-light-brown min-h-screen flex items-center"
    >
      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-playfair font-bold text-muthu-dark-brown leading-tight">
              Walk with Confidence,
              <span className="text-muthu-brown block">Walk with MUTHU's</span>
            </h1>

            <p className="text-lg md:text-xl text-muthu-dark-brown/80 leading-relaxed">
              Discover our premium collection of stylish and comfortable
              footwear for men, women, and kids. Quality craftsmanship meets
              affordable luxury.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-muthu-brown hover:bg-muthu-dark-brown text-white px-8 py-3 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                onClick={() => navigate("/shop")}
              >
                Shop Collection
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-muthu-brown text-muthu-brown hover:bg-muthu-brown hover:text-white px-8 py-3 text-lg font-semibold transition-all duration-300"
                onClick={() => {
                  const aboutSection = document.getElementById("about");
                  aboutSection?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Rotating Hero Image */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform ">
              <img
  key={footwearImages[currentIndex].src}
  src={footwearImages[currentIndex].src}
  alt={footwearImages[currentIndex].alt}
  className={`w-full h-80 md:h-96 object-cover rounded-lg transition-opacity duration-1000 ease-in-out ${
    fade ? "opacity-100" : "opacity-0"
  }`}
/>

            </div>
            <div className="absolute -bottom-4 -left-4 bg-muthu-brown text-white p-4 rounded-xl shadow-lg">
              <p className="font-bold text-lg">50+ Styles</p>
              <p className="text-sm opacity-90">Available Now</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
