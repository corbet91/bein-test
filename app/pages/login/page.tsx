"use client";

import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import TokenService from "@/services/token.service";
import { Login } from "@/services/user.service";
import { LoginPayload } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation'

interface ILoginPayload {
  email: string;
  password: string;
}

const LoginPage = () => {
  const form = useForm<ILoginPayload>();
  const accessToken = TokenService.getAuth();
  const router = useRouter();
  console.log("accessToken",accessToken)
  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: Login,
    onSuccess: (result) => {
    router.push('/pages/home');
  
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
    <div className="flex h-screen bg-linear-to-r from-cyan-500 to-blue-500 justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="rounded-2xl bg-black w-[480px] h-[460px] flex flex-col p-4 justify-between"
        >
          <div>
            <FormFieldCustom
              name="email"
              nameLabel="email"
              description="Vui lòng điền đầy đủ thông tin"
              children={
                <Input placeholder="Email" className="h-[56px] bg-white" />
              }
            />
            <FormFieldCustom
              name="password"
              nameLabel="mật khẩu"
              description="Vui lòng điền đầy đủ thông tin"
              children={
                <Input
                  placeholder="password"
                  type="password"
                  className="h-[56px] bg-white"
                />
              }
            />
          </div>
          <div className="flex flex-col items-center gap-8">
            <SubmitButton loading={false} name="Xác nhận" type="submit" />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginPage;
