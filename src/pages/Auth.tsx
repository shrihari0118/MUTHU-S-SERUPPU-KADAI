
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, user, profile } = useAuth();

  // Redirect if user is already logged in
  useEffect(() => {
    if (user && profile) {
      console.log('User already logged in, redirecting...');
      window.location.href = '/';
    }
  }, [user, profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        console.log('Attempting login...');
        const { error } = await signIn(email, password);
        if (error) {
          console.error('Login error:', error);
          toast({
            title: "Login Failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          console.log('Login successful, waiting for redirect...');
          toast({
            title: "Welcome back!",
            description: "You have been successfully logged in.",
          });
          // The redirect will be handled by the auth context and ProtectedRoute
        }
      } else {
        console.log('Attempting signup...');
        const { error } = await signUp(email, password, fullName);
        if (error) {
          console.error('Signup error:', error);
          toast({
            title: "Signup Failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          console.log('Signup successful');
          toast({
            title: "Account Created!",
            description: "Please check your email to verify your account.",
          });
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muthu-warm-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-playfair font-bold text-muthu-dark-brown mb-2">
            MUTHU's
          </h1>
          <p className="text-muthu-dark-brown/70">Footwear Store</p>
        </div>

        <Card className="border-muthu-beige">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-muthu-dark-brown">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </CardTitle>
            <CardDescription>
              {isLogin 
                ? 'Sign in to your account to continue shopping' 
                : 'Create a new account to start shopping'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required={!isLogin}
                    className="border-muthu-beige focus:border-muthu-brown"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-muthu-beige focus:border-muthu-brown"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-muthu-beige focus:border-muthu-brown"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-muthu-brown hover:bg-muthu-dark-brown text-white"
                disabled={loading}
              >
                {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-muthu-brown hover:text-muthu-dark-brown transition-colors"
              >
                {isLogin 
                  ? "Don't have an account? Sign up" 
                  : 'Already have an account? Sign in'
                }
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
