
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const products = [
    // Men's Collection
    {
      id: 1,
      name: "Classic Oxford Shoes",
      category: "men",
      price: 2999,
      image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=400&h=300&fit=crop&crop=center",
      sizes: ["7", "8", "9", "10", "11"],
      description: "Premium leather Oxford shoes for formal occasions"
    },
    {
      id: 2,
      name: "Casual Loafers",
      category: "men",
      price: 2499,
      image: "https://images.unsplash.com/photo-1582897085656-c636d006a246?w=400&h=300&fit=crop&crop=center",
      sizes: ["7", "8", "9", "10", "11"],
      description: "Comfortable leather loafers for everyday wear"
    },
    {
      id: 3,
      name: "Formal Derby Shoes",
      category: "men",
      price: 3499,
      image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&h=300&fit=crop&crop=center",
      sizes: ["7", "8", "9", "10", "11"],
      description: "Elegant derby shoes perfect for business meetings"
    },
    // Women's Heels
    {
      id: 4,
      name: "Elegant High Heels",
      category: "women",
      price: 3299,
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=300&fit=crop&crop=center",
      sizes: ["5", "6", "7", "8", "9"],
      description: "Stylish high heels for special occasions"
    },
    {
      id: 5,
      name: "Block Heel Pumps",
      category: "women",
      price: 2799,
      image: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=400&h=300&fit=crop&crop=center",
      sizes: ["5", "6", "7", "8", "9"],
      description: "Comfortable block heel pumps for office wear"
    },
    {
      id: 6,
      name: "Strappy Sandals",
      category: "women",
      price: 2299,
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=center",
      sizes: ["5", "6", "7", "8", "9"],
      description: "Trendy strappy sandals for summer outings"
    },
    // Kids' Footwear
    {
      id: 7,
      name: "Colorful School Shoes",
      category: "kids",
      price: 1599,
      image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400&h=300&fit=crop&crop=center",
      sizes: ["1", "2", "3", "4", "5"],
      description: "Durable and comfortable school shoes for kids"
    },
    {
      id: 8,
      name: "Fun Character Boots",
      category: "kids",
      price: 1899,
      image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=400&h=300&fit=crop&crop=center",
      sizes: ["1", "2", "3", "4", "5"],
      description: "Waterproof boots with fun character designs"
    },
    // Trendy Sneakers
    {
      id: 9,
      name: "Running Sneakers",
      category: "sneakers",
      price: 3999,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop&crop=center",
      sizes: ["6", "7", "8", "9", "10", "11"],
      description: "High-performance running sneakers with cushioned sole"
    },
    {
      id: 10,
      name: "Casual Street Sneakers",
      category: "sneakers",
      price: 2999,
      image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=300&fit=crop&crop=center",
      sizes: ["6", "7", "8", "9", "10", "11"],
      description: "Stylish street sneakers for casual outings"
    },
    {
      id: 11,
      name: "High-Top Sneakers",
      category: "sneakers",
      price: 3499,
      image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400&h=300&fit=crop&crop=center",
      sizes: ["6", "7", "8", "9", "10", "11"],
      description: "Classic high-top sneakers with modern comfort"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products', count: products.length },
    { id: 'men', name: "Men's Collection", count: products.filter(p => p.category === 'men').length },
    { id: 'women', name: "Women's Heels", count: products.filter(p => p.category === 'women').length },
    { id: 'kids', name: "Kids' Footwear", count: products.filter(p => p.category === 'kids').length },
    { id: 'sneakers', name: "Trendy Sneakers", count: products.filter(p => p.category === 'sneakers').length }
  ];

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <div className="min-h-screen bg-muthu-warm-white">
      <Header />
      
      <div className="pt-20">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-playfair font-bold text-muthu-dark-brown mb-4">
                Our Shop
              </h1>
              <p className="text-lg text-muthu-dark-brown/70 max-w-2xl mx-auto">
                Discover our complete collection of premium footwear for every style and occasion.
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  className={`px-6 py-3 transition-all duration-300 ${
                    activeCategory === category.id
                      ? "bg-muthu-brown hover:bg-muthu-dark-brown text-white"
                      : "border-muthu-brown text-muthu-brown hover:bg-muthu-brown hover:text-white"
                  }`}
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <Card 
                  key={product.id}
                  className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-muthu-beige"
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute top-4 right-4 bg-muthu-brown text-white px-3 py-1 rounded-full text-sm font-semibold">
                        ₹{product.price}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-playfair font-bold text-muthu-dark-brown mb-2">
                        {product.name}
                      </h3>
                      <p className="text-muthu-dark-brown/70 mb-4 text-sm">
                        {product.description}
                      </p>
                      <div className="mb-4">
                        <p className="text-sm text-muthu-dark-brown/60 mb-2">Available Sizes:</p>
                        <div className="flex flex-wrap gap-2">
                          {product.sizes.map((size) => (
                            <span 
                              key={size}
                              className="px-2 py-1 bg-muthu-beige text-muthu-dark-brown text-xs rounded"
                            >
                              {size}
                            </span>
                          ))}
                        </div>
                      </div>
                      <Button className="w-full bg-muthu-brown hover:bg-muthu-dark-brown text-white">
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-xl text-muthu-dark-brown/60">
                  No products found in this category.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Shop;
