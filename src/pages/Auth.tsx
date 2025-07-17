
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const { signIn, signUp, user, profile } = useAuth();

  // Redirect if user is already logged in
  useEffect(() => {
    if (user && profile) {
      console.log('User already logged in, redirecting to home...');
      window.location.href = '/';
    }
  }, [user, profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    console.log('Form submitted - Login mode:', isLogin);

    try {
      if (isLogin) {
        console.log('Attempting login with email:', email);
        const { error } = await signIn(email, password);
        
        if (error) {
          console.error('Login failed:', error);
          
          // Handle specific error cases
          if (error.message?.includes('Email not confirmed')) {
            toast({
              title: "Email Not Confirmed",
              description: "Please check your email and click the confirmation link before logging in. Check your spam folder if you don't see it.",
              variant: "destructive",
            });
          } else if (error.message?.includes('Invalid login credentials')) {
            toast({
              title: "Invalid Credentials",
              description: "Please check your email and password and try again.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Login Failed",
              description: error.message || "Invalid email or password",
              variant: "destructive",
            });
          }
        } else {
          console.log('Login successful, redirecting...');
          toast({
            title: "Welcome back!",
            description: "You have been successfully logged in.",
          });
          // The signIn function handles the redirect
        }
      } else {
        console.log('Attempting signup with email:', email);
        const { error } = await signUp(email, password, fullName);
        
        if (error) {
          console.error('Signup failed:', error);
          toast({
            title: "Signup Failed",
            description: error.message || "Failed to create account",
            variant: "destructive",
          });
        } else {
          console.log('Signup successful');
          toast({
            title: "Account Created Successfully!",
            description: "Please check your email for a confirmation link. You'll need to click it before you can log in.",
          });
          // Reset form and switch to login
          setEmail('');
          setPassword('');
          setFullName('');
          setIsLogin(true);
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
                    placeholder="Enter your full name"
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
                  placeholder="Enter your email"
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
                  placeholder="Enter your password"
                  minLength={6}
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
                onClick={() => {
                  setIsLogin(!isLogin);
                  setEmail('');
                  setPassword('');
                  setFullName('');
                }}
                className="text-muthu-brown hover:text-muthu-dark-brown transition-colors"
                disabled={loading}
              >
                {isLogin 
                  ? "Don't have an account? Sign up" 
                  : 'Already have an account? Sign in'
                }
              </button>
            </div>

            {/* Password reset option */}
            {isLogin && (
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => setShowResetPassword(!showResetPassword)}
                  className="text-sm text-muthu-brown hover:text-muthu-dark-brown transition-colors"
                  disabled={loading}
                >
                  Forgot your password?
                </button>
                
                {showResetPassword && (
                  <div className="mt-2 p-3 bg-muthu-beige/20 rounded-lg">
                    <p className="text-sm text-muthu-dark-brown/70 mb-2">
                      Enter your email to reset your password:
                    </p>
                    <div className="flex gap-2">
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="text-sm"
                      />
                      <Button
                        type="button"
                        size="sm"
                        className="bg-muthu-brown hover:bg-muthu-dark-brown text-white"
                        onClick={async () => {
                          if (email) {
                            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                              redirectTo: `${window.location.origin}/auth`
                            });
                            if (error) {
                              toast({
                                title: "Error",
                                description: error.message,
                                variant: "destructive",
                              });
                            } else {
                              toast({
                                title: "Password Reset Sent",
                                description: "Check your email for a password reset link.",
                              });
                              setShowResetPassword(false);
                            }
                          }
                        }}
                      >
                        Send
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Help text for email confirmation */}
            {isLogin && (
              <div className="mt-4 p-3 bg-muthu-beige/20 rounded-lg">
                <p className="text-sm text-muthu-dark-brown/70 text-center">
                  Having trouble signing in? Make sure you've confirmed your email address by clicking the link in your confirmation email.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
