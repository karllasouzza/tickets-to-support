import { getUser, updateUser } from "@/data/states/user";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner-native";
import z from "zod";

const loginFormSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres"),
  remember: z.boolean().optional(),
});

type LoginFormSchema = z.infer<typeof loginFormSchema>;

export const useLoginData = () => {
  const { handleSubmit, control } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onSubmit: SubmitHandler<LoginFormSchema> = (data) => {
    if (loginFormSchema.safeParse(data).error) {
      toast.error("Por favor, preencha todos os campos corretamente.");
      return;
    }

    const storedUser = getUser();

    if (!storedUser) {
      toast.error("Nenhuma conta encontrada. Crie uma conta primeiro.");
      return;
    }

    const isInvalidCredentials =
      storedUser.email !== data.email || storedUser.password !== data.password;

    if (isInvalidCredentials) {
      toast.error("Email ou senha inválidos.");
      return;
    }

    updateUser({ remember: data.remember ?? false });

    toast.success("Login realizado com sucesso!");
  };

  return {
    handleSubmit,
    control,
    onSubmit,
    isPasswordVisible,
    setIsPasswordVisible,
  };
};
