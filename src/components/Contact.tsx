
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Mail } from 'lucide-react';

const Contact = () => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/919876543210?text=Hello, I would like to know more about MUTHU\'s footwear collection', '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-muthu-beige to-muthu-light-brown">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-muthu-dark-brown mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-muthu-dark-brown/70 max-w-2xl mx-auto">
            Visit our store or contact us online. We're here to help you find the perfect pair of shoes.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-playfair font-bold text-muthu-dark-brown mb-6">
                Visit Our Store
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="text-muthu-brown mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold text-muthu-dark-brown">Store Address</h4>
                    <p className="text-muthu-dark-brown/70">
                      123 Fashion Street, Shopping Complex<br />
                      Mumbai, Maharashtra 400001<br />
                      India
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="text-muthu-brown mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold text-muthu-dark-brown">Phone</h4>
                    <p className="text-muthu-dark-brown/70">+91 98765 43210</p>
                    <p className="text-muthu-dark-brown/70">+91 87654 32109</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="text-muthu-brown mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold text-muthu-dark-brown">Email</h4>
                    <p className="text-muthu-dark-brown/70">info@muthusfootwear.com</p>
                    <p className="text-muthu-dark-brown/70">orders@muthusfootwear.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-semibold text-muthu-dark-brown mb-4">Store Hours</h4>
                <div className="space-y-2 text-muthu-dark-brown/70">
                  <div className="flex justify-between">
                    <span>Monday - Saturday</span>
                    <span>10:00 AM - 9:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>11:00 AM - 8:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            <Button 
              onClick={handleWhatsApp}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 text-lg"
            >
              💬 Chat on WhatsApp
            </Button>
          </div>

          {/* Contact Form */}
          <Card className="border-muthu-beige shadow-xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-playfair font-bold text-muthu-dark-brown mb-6">
                Send us a Message
              </h3>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-muthu-dark-brown mb-2">
                      First Name
                    </label>
                    <Input 
                      type="text" 
                      placeholder="Your first name"
                      className="border-muthu-beige focus:border-muthu-brown"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muthu-dark-brown mb-2">
                      Last Name
                    </label>
                    <Input 
                      type="text" 
                      placeholder="Your last name"
                      className="border-muthu-beige focus:border-muthu-brown"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muthu-dark-brown mb-2">
                    Email Address
                  </label>
                  <Input 
                    type="email" 
                    placeholder="your.email@example.com"
                    className="border-muthu-beige focus:border-muthu-brown"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-muthu-dark-brown mb-2">
                    Phone Number
                  </label>
                  <Input 
                    type="tel" 
                    placeholder="+91 98765 43210"
                    className="border-muthu-beige focus:border-muthu-brown"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-muthu-dark-brown mb-2">
                    Message
                  </label>
                  <textarea 
                    rows={4}
                    placeholder="Tell us how we can help you..."
                    className="w-full px-3 py-2 border border-muthu-beige rounded-md focus:outline-none focus:ring-2 focus:ring-muthu-brown focus:border-muthu-brown resize-none"
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-muthu-brown hover:bg-muthu-dark-brown text-white font-semibold py-3 text-lg"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
