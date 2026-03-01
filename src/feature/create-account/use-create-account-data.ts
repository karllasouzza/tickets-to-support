import { createUser } from "@/data/states/user";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner-native";
import z from "zod";

const createAccountFormSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  email: z.email("Email inválido"),
  password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres"),
  remember: z.boolean().optional(),
});

type CreateAccountFormSchema = z.infer<typeof createAccountFormSchema>;

export default function useCreateAccountData() {
  const { register, handleSubmit, control, setFocus } =
    useForm<CreateAccountFormSchema>();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onSubmit: SubmitHandler<CreateAccountFormSchema> = (data) => {
    if (createAccountFormSchema.safeParse(data).error) {
      toast.error("Por favor, preencha todos os campos corretamente.");
      return;
    }

    try {
      const user = createUser(data);

      if (!user) throw new Error("Error on create user");

      toast.success("Conta criada com sucesso!");

      return;
    } catch (error) {
      console.error("Error creating account:", error);
      toast.error("Ocorreu um erro ao criar a conta. Tente novamente.");
      return;
    }
  };

  return {
    register,
    handleSubmit,
    control,
    setFocus,
    onSubmit,
    isPasswordVisible,
    setIsPasswordVisible,
  };
}
