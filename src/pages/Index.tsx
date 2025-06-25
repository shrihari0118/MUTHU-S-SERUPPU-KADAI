
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import About from '@/components/About';
import Reviews from '@/components/Reviews';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/ProtectedRoute';

const Index = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        <Header />
        <Hero />
        <Categories />
        <About />
        <Reviews />
        <Contact />
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default Index;
