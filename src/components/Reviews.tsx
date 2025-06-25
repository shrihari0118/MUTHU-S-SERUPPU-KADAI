
import { Card, CardContent } from "@/components/ui/card";

const Reviews = () => {
  const reviews = [
    {
      name: "Priya Sharma",
      location: "Mumbai",
      rating: 5,
      text: "Amazing quality shoes! I bought heels for my wedding and they were so comfortable throughout the ceremony. The staff was very helpful in choosing the right size.",
      product: "Wedding Heels"
    },
    {
      name: "Rajesh Kumar",
      location: "Delhi",
      rating: 5,
      text: "Best formal shoes I've ever purchased. The leather quality is excellent and they look great with my office attire. Great value for money!",
      product: "Formal Leather Shoes"
    },
    {
      name: "Anita Patel",
      location: "Ahmedabad",
      rating: 5,
      text: "Bought sneakers for my teenage son and he absolutely loves them! Trendy design and very comfortable. Will definitely shop here again.",
      product: "Trendy Sneakers"
    },
    {
      name: "Vikram Singh",
      location: "Pune",
      rating: 5,
      text: "Excellent customer service and quality products. The shoes I ordered online fit perfectly and arrived quickly. Highly recommend MUTHU's!",
      product: "Casual Loafers"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  return (
    <section id="reviews" className="py-20 bg-muthu-warm-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-muthu-dark-brown mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muthu-dark-brown/70 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about their MUTHU's experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {reviews.map((review, index) => (
            <Card key={index} className="border-muthu-beige shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-muthu-dark-brown text-lg">
                      {review.name}
                    </h4>
                    <p className="text-muthu-dark-brown/60 text-sm">
                      {review.location}
                    </p>
                  </div>
                  <div className="flex">
                    {renderStars(review.rating)}
                  </div>
                </div>
                
                <p className="text-muthu-dark-brown/80 mb-4 leading-relaxed italic">
                  "{review.text}"
                </p>
                
                <div className="bg-muthu-beige px-3 py-1 rounded-full inline-block">
                  <span className="text-sm text-muthu-brown font-medium">
                    {review.product}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-muthu-brown text-white inline-block px-8 py-4 rounded-xl">
            <div className="text-2xl font-bold">4.9/5</div>
            <div className="text-sm opacity-90">Average Rating</div>
            <div className="text-sm opacity-90">500+ Reviews</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
