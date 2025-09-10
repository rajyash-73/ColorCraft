import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Redirect, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertUserSchema } from "@shared/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, ChevronLeft } from "lucide-react";

// Extend the user schema to add validation rules
const authFormSchema = insertUserSchema.extend({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type AuthFormValues = z.infer<typeof authFormSchema>;

export default function AuthPage() {
  const [, setLocation] = useLocation();
  const { user, loginMutation, registerMutation, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  // If user is already logged in, redirect to home page
  if (user) {
    return <Redirect to="/" />;
  }

  const loginForm = useForm<AuthFormValues>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const registerForm = useForm<AuthFormValues>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onLoginSubmit = (data: AuthFormValues) => {
    loginMutation.mutate(data);
  };

  const onRegisterSubmit = (data: AuthFormValues) => {
    registerMutation.mutate(data);
  };

  const isPending = loginMutation.isPending || registerMutation.isPending;

  return (
    <div className="min-h-screen">
      {/* Back to Home Navigation */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-3">
          <div 
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
            onClick={() => window.location.href = '/'}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            <span>Back to Home</span>
          </div>
        </div>
      </div>
      
      <div className="flex min-h-screen flex-col md:flex-row">
      {/* Hero Section */}
      <div className="w-full md:w-1/2 bg-gradient-to-b from-primary/20 to-primary/5 p-8 flex items-center justify-center">
        <div className="max-w-md space-y-4 text-center md:text-left">
          <h1 className="text-4xl font-bold tracking-tight">Color Palette Generator</h1>
          <p className="text-lg text-muted-foreground">
            Create beautiful color palettes for your designs. Save your favorites and access them anytime.
          </p>
          <div className="flex justify-center md:justify-start space-x-2 pt-4">
            <div className="w-8 h-8 rounded-full bg-red-500"></div>
            <div className="w-8 h-8 rounded-full bg-yellow-500"></div>
            <div className="w-8 h-8 rounded-full bg-green-500"></div>
            <div className="w-8 h-8 rounded-full bg-blue-500"></div>
            <div className="w-8 h-8 rounded-full bg-purple-500"></div>
          </div>
        </div>
      </div>

      {/* Auth Form Section */}
      <div className="w-full md:w-1/2 p-8 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
            <CardDescription>
              Sign in to your account or create a new one to save your color palettes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "register")}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Enter your password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={isPending}>
                      {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                      Sign In
                    </Button>
                  </form>
                </Form>
              </TabsContent>

              <TabsContent value="register">
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                    <FormField
                      control={registerForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="Choose a username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Choose a password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={isPending}>
                      {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                      Create Account
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="text-sm text-center text-muted-foreground">
            By logging in, you agree to our <span 
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() => window.location.href = '/privacy-policy'}
            >Privacy Policy</span>.
          </CardFooter>
        </Card>
      </div>
      </div>
    </div>
  );
}