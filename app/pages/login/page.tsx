"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import TokenService from "@/services/token.service";
import { Login } from "@/services/user.service";
import { LoginPayload } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface ILoginPayload {
  username: string;
  password: string;
}

const LoginPage = () => {
    const form = useForm<ILoginPayload>({
    defaultValues: {
      username: '', 
      password: '', 
    },
  });
  const accessToken = TokenService.getAuth();
  const router = useRouter();
  console.log("accessToken", accessToken);
  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: Login,
    onSuccess: (result) => {
      router.push("/pages/home");

      TokenService.setAuth({
        accessToken: result.accessToken,
        email: result.email,
      });
    },
    onError: () => {},
  });

  const onSubmit = (data: LoginPayload) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="flex h-screen bg-[url(/public/bein.webp)] justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="rounded-2xl bg-white  w-[436px] h-[680px] flex flex-col p-4 justify-between"
        >
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      className="h-[40px]"
                      placeholder="Your username"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      className="h-[40px]"
                      placeholder="Your password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="w-full h-[40px]" type="submit">
              Log in
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginPage;
