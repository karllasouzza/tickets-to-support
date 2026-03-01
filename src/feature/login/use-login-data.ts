import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner-native";
import z from "zod";

const loginFormSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres"),
  remember: z.boolean().optional(),
});

type LoginFormSchema = z.infer<typeof loginFormSchema>;

export const useLoginData = () => {
  const { register, handleSubmit, control } = useForm<LoginFormSchema>();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onSubmit: SubmitHandler<LoginFormSchema> = (data) => {
    if (loginFormSchema.safeParse(data).error) {
      toast.error("Por favor, preencha todos os campos corretamente.");
    }

    toast.success("Login realizado com sucesso!");
  };

  return {
    register,
    handleSubmit,
    control,
    onSubmit,
    isPasswordVisible,
    setIsPasswordVisible,
  };
};
