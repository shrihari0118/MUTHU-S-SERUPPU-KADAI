
const Footer = () => {
  return (
    <footer className="bg-muthu-dark-brown text-muthu-warm-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-playfair font-bold">MUTHU's</h3>
            <p className="text-muthu-warm-white/80 leading-relaxed">
              Walk with Confidence, Walk with MUTHU's. Quality footwear for every step of your journey.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muthu-warm-white/60 hover:text-muthu-warm-white transition-colors">
                Facebook
              </a>
              <a href="#" className="text-muthu-warm-white/60 hover:text-muthu-warm-white transition-colors">
                Instagram
              </a>
              <a href="#" className="text-muthu-warm-white/60 hover:text-muthu-warm-white transition-colors">
                Twitter
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-muthu-warm-white/80 hover:text-muthu-warm-white transition-colors">Home</a></li>
              <li><a href="#shop" className="text-muthu-warm-white/80 hover:text-muthu-warm-white transition-colors">Shop</a></li>
              <li><a href="#about" className="text-muthu-warm-white/80 hover:text-muthu-warm-white transition-colors">About Us</a></li>
              <li><a href="#reviews" className="text-muthu-warm-white/80 hover:text-muthu-warm-white transition-colors">Reviews</a></li>
              <li><a href="#contact" className="text-muthu-warm-white/80 hover:text-muthu-warm-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muthu-warm-white/80 hover:text-muthu-warm-white transition-colors">Men's Shoes</a></li>
              <li><a href="#" className="text-muthu-warm-white/80 hover:text-muthu-warm-white transition-colors">Women's Heels</a></li>
              <li><a href="#" className="text-muthu-warm-white/80 hover:text-muthu-warm-white transition-colors">Kids' Footwear</a></li>
              <li><a href="#" className="text-muthu-warm-white/80 hover:text-muthu-warm-white transition-colors">Sneakers</a></li>
              <li><a href="#" className="text-muthu-warm-white/80 hover:text-muthu-warm-white transition-colors">Slippers</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
            <p className="text-muthu-warm-white/80 mb-4 text-sm">
              Subscribe to get updates on new arrivals and exclusive offers.
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-muthu-warm-white/10 border border-muthu-warm-white/20 rounded text-muthu-warm-white placeholder-muthu-warm-white/60 focus:outline-none focus:border-muthu-warm-white/40"
              />
              <button className="w-full bg-muthu-brown hover:bg-muthu-light-brown text-white px-4 py-2 rounded font-semibold transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-muthu-warm-white/20 mt-8 pt-8 text-center">
          <p className="text-muthu-warm-white/60">
            © 2024 MUTHU's Footwear. All rights reserved. | Designed with ❤️ for comfort and style.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
