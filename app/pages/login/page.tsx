"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import TokenService from "@/services/token.service";
import { Login } from "@/services/user.service";
import { LoginPayload } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import LoginImage from "@/public/bein.webp";

interface ILoginPayload {
  username: string;
  password: string;
}

const LoginPage = () => {
  const form = useForm<ILoginPayload>({
    defaultValues: {
      username: 'emilys',
      password: 'emilyspass',
    },
  });

  const router = useRouter();

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
    <div className="flex h-screen justify-center items-center">
      <Image
        src={LoginImage}
        alt="login"
        layout="fill"
        objectFit="cover"
        className="fixed h-dvh w-full top-0 z-0 left-0 bottom-0 right-0"
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="rounded-2xl bg-white w-[90%]  md:w-[436px] flex flex-col p-12 gap-4 z-1"
        >
          <div className="flex flex-col gap-1">
            <div className="text-center text-lg font-bold">
              Log in to Beincom
            </div>
            <div className="mt-1 text-center text-sm font-normal ">
              Enter your credentials to access your account.
            </div>
          </div>
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
            <Button
              className="w-full h-[40px] cursor-pointer"
              disabled={form.formState.isDirty}
              type="submit"
            >
              Log in
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginPage;
