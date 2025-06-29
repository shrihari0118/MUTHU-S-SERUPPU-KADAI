import { useState } from 'react';
import { Menu, X, ShoppingCart, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, signOut } = useAuth();
  const { cartCount } = useCart();

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'About', href: '/#about' },
    { name: 'Reviews', href: '/#reviews' },
    { name: 'Contact', href: '/#contact' },
  ];

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);

    const isHashLink = href.includes('#');
    const isHome = href === '/';

    if (isHashLink) {
      const sectionId = href.split('#')[1];

      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const section = document.getElementById(sectionId);
          section?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      } else {
        const section = document.getElementById(sectionId);
        section?.scrollIntoView({ behavior: 'smooth' });
      }

    } else if (isHome) {
      // Even if on '/', force hash to be removed and scroll to top
      navigate('/', { replace: true }); // clears hash
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } else {
      navigate(href); // for /shop or other routes
    }
  };

  return (
    <header className="bg-muthu-warm-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl md:text-3xl font-playfair font-bold text-muthu-brown">
              MUTHU's
            </h1>
            <span className="text-sm text-muthu-dark-brown ml-2 hidden sm:block">
              Footwear
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="text-muthu-dark-brown hover:text-muthu-brown transition-colors duration-200 font-medium"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {profile && (
              <div className="hidden md:flex items-center space-x-2">
                <span className="text-sm text-muthu-dark-brown">
                  {profile.role === 'admin' ? 'Admin' : 'Welcome'}
                </span>
                <span className="text-sm font-medium text-muthu-brown">
                  {profile.full_name || profile.email}
                </span>
              </div>
            )}

            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5 text-muthu-brown" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-muthu-brown text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            <Button 
              variant="ghost" 
              size="icon"
              onClick={signOut}
              className="text-muthu-brown hover:text-muthu-dark-brown"
            >
              <LogOut className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-muthu-brown" />
              ) : (
                <Menu className="h-6 w-6 text-muthu-brown" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-muthu-beige">
            <div className="flex flex-col space-y-4 pt-4">
              {profile && (
                <div className="px-2 py-2 border-b border-muthu-beige">
                  <span className="text-sm text-muthu-dark-brown">
                    {profile.role === 'admin' ? 'Admin: ' : 'Welcome, '}
                  </span>
                  <span className="text-sm font-medium text-muthu-brown">
                    {profile.full_name || profile.email}
                  </span>
                </div>
              )}

              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="text-muthu-dark-brown hover:text-muthu-brown transition-colors duration-200 font-medium text-left"
                >
                  {item.name}
                </button>
              ))}

              <Link
                to="/cart"
                className="text-muthu-dark-brown hover:text-muthu-brown transition-colors duration-200 font-medium flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart className="h-4 w-4" />
                Cart ({cartCount})
              </Link>

              <button
                onClick={signOut}
                className="text-muthu-dark-brown hover:text-muthu-brown transition-colors duration-200 font-medium text-left flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
