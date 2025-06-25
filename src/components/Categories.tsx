
import { Card, CardContent } from "@/components/ui/card";

const Categories = () => {
  const categories = [
    {
      title: "Men's Collection",
      description: "Formal shoes, casual wear, and premium leather",
      image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=400&h=300&fit=crop&crop=center",
      count: "25+ Styles"
    },
    {
      title: "Women's Heels",
      description: "Elegant heels, flats, and party wear",
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=300&fit=crop&crop=center",
      count: "30+ Styles"
    },
    {
      title: "Kids' Footwear",
      description: "Comfortable and colorful shoes for children",
      image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400&h=300&fit=crop&crop=center",
      count: "20+ Styles"
    },
    {
      title: "Trendy Sneakers",
      description: "Latest designs for sports and casual wear",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop&crop=center",
      count: "15+ Styles"
    }
  ];

  return (
    <section id="shop" className="py-20 bg-muthu-warm-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-muthu-dark-brown mb-4">
            Our Collections
          </h2>
          <p className="text-lg text-muthu-dark-brown/70 max-w-2xl mx-auto">
            Explore our carefully curated selection of premium footwear for every occasion and style preference.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <Card 
              key={index}
              className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-muthu-beige"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-muthu-brown text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {category.count}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-playfair font-bold text-muthu-dark-brown mb-2">
                    {category.title}
                  </h3>
                  <p className="text-muthu-dark-brown/70">
                    {category.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
