import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner-native";
import z from "zod";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import { createTicket } from "@/data/states/tickets";
import { type AuthenticatedTabsParamList } from "@/router/types";

const createTicketSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  details: z.string().min(1, "Os detalhes são obrigatórios"),
  closingDeadlineAt: z.date(),
});

export type CreateTicketFormData = z.infer<typeof createTicketSchema>;

type NavigationProp = BottomTabNavigationProp<AuthenticatedTabsParamList>;

export default function useCreateTicketData() {
  const navigation = useNavigation<NavigationProp>();
  const { handleSubmit, control, reset } = useForm<CreateTicketFormData>({
    resolver: zodResolver(createTicketSchema),
  });

  const onSubmit: SubmitHandler<CreateTicketFormData> = (data) => {
    if (!data.closingDeadlineAt) {
      toast.error("O prazo de encerramento é obrigatório.");
      return;
    }

    const result = createTicketSchema.safeParse(data);

    if (!result.success) {
      const firstError = result.error.issues[0]?.message;
      toast.error(firstError ?? "Preencha todos os campos corretamente.");
      return;
    }

    try {
      const newTicket = createTicket({
        title: data.title,
        details: data.details,
        closingDeadlineAt: data.closingDeadlineAt.toISOString(),
        status: "open",
      });

      navigation.navigate("Home", {
        createdTicketId: newTicket.id,
        refreshToken: Date.now(),
      });

      toast.success("Ticket criado com sucesso!");
      reset();
    } catch {
      toast.error("Erro ao criar o ticket. Tente novamente.");
    }
  };

  return { handleSubmit, control, onSubmit };
}
