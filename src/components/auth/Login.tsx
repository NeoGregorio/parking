import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { FormEvent } from "react";
import client from "@/api/client";

export default function Login() {
  const handleSignup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    //console.log(email, password);

    if (!email || !password) {
      toast.error("Please enter email and password");
    }

    const { data, error } = await client.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error("Sorry, we're unable to log you in. Please try again.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Welcome back! Enter your email and password to login.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSignup}>
        <CardContent>
          <div className="flex flex-col gap-6 mb-6">
            <div className="grid gap-3">
              <Label>Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="email@example.com"
              />
            </div>
            <div className="grid gap-3">
              <Label>Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="********"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
