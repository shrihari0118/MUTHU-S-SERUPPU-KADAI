
const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-muthu-light-brown to-muthu-beige">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-muthu-dark-brown">
              Our Story
            </h2>
            <div className="space-y-4 text-muthu-dark-brown/80 leading-relaxed">
              <p>
                Founded with a passion for quality footwear, MUTHU's has been serving customers 
                with premium shoes that combine comfort, style, and affordability. Our journey 
                began with a simple mission: to make quality footwear accessible to everyone.
              </p>
              <p>
                Today, we pride ourselves on offering an extensive collection that caters to 
                all ages and occasions. From formal business shoes to casual weekend wear, 
                from elegant women's heels to comfortable kids' footwear, we have something 
                special for every step of your journey.
              </p>
              <p>
                At MUTHU's, we believe that the right pair of shoes can boost your confidence 
                and complement your personality. That's why we carefully select each design, 
                ensuring superior quality materials and expert craftsmanship.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-6 pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-muthu-brown">500+</div>
                <div className="text-sm text-muthu-dark-brown/70">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-muthu-brown">90+</div>
                <div className="text-sm text-muthu-dark-brown/70">Unique Styles</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-muthu-brown">5+</div>
                <div className="text-sm text-muthu-dark-brown/70">Years Experience</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-6">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop&crop=center"
                alt="MUTHU's store interior"
                className="w-full h-80 object-cover rounded-lg"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-muthu-brown text-white p-6 rounded-xl shadow-lg">
              <h3 className="font-bold text-lg mb-1">Our Mission</h3>
              <p className="text-sm opacity-90">Quality • Style • Comfort</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
