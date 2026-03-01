import { useCallback, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner-native";
import z from "zod";
import {
  getTicketById,
  updateTicket,
  deleteTicket,
  type TicketStatus,
} from "@/data/states/tickets";
import { useNavigation } from "@react-navigation/native";

const CLOSED_STATUSES: TicketStatus[] = ["closed", "improper", "canceled"];

const ticketClosureFormSchema = z
  .object({
    status: z.enum(["open", "closed", "improper", "canceled"]),
    closingDescription: z.string().trim().optional(),
  })
  .superRefine((data, ctx) => {
    if (
      CLOSED_STATUSES.includes(data.status) &&
      (!data.closingDescription || data.closingDescription.length === 0)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["closingDescription"],
        message: "A descrição de encerramento é obrigatória para este status.",
      });
    }
  });

export type TicketClosureFormData = z.infer<typeof ticketClosureFormSchema>;

export default function useTicketDetailData(ticketId: string) {
  const ticket = getTicketById(ticketId);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    reset,
  } = useForm<TicketClosureFormData>({
    resolver: zodResolver(ticketClosureFormSchema),
    defaultValues: {
      status: ticket?.status ?? "open",
      closingDescription: ticket?.closingDescription ?? "",
    },
  });

  useEffect(() => {
    reset({
      status: ticket?.status ?? "open",
      closingDescription: ticket?.closingDescription ?? "",
    });
  }, [ticket?.status, ticket?.closingDescription, reset]);

  const navigator = useNavigation();

  const handleBack = () => {
    navigator.goBack();
  };

  const handleDeleteTicket = useCallback(() => {
    if (!ticket) return;

    const deleted = deleteTicket(ticketId);

    if (deleted) {
      toast.success("Ticket deletado com sucesso!");
      navigator.goBack();
    } else {
      toast.error("Erro ao deletar o ticket.");
    }
  }, [ticket, ticketId, navigator]);

  const selectedStatus = watch("status");

  const onSubmit: SubmitHandler<TicketClosureFormData> = useCallback(
    (data) => {
      if (!ticket) return;

      const nextStatus = data.status;
      const isClosingStatus = CLOSED_STATUSES.includes(nextStatus);
      const closingDescription = isClosingStatus
        ? data.closingDescription?.trim()
        : undefined;

      const updated = updateTicket(ticketId, {
        status: nextStatus,
        closingDescription,
      });

      if (updated) {
        toast.success("Ticket atualizado com sucesso!");
      } else {
        toast.error("Erro ao atualizar o ticket.");
      }
    },
    [ticket, ticketId],
  );

  const handleStatusChange = useCallback(
    (newStatus: TicketStatus) => {
      setValue("status", newStatus, {
        shouldDirty: true,
        shouldValidate: true,
      });
    },
    [setValue],
  );

  return {
    ticket,
    control,
    errors,
    isSubmitting,
    selectedStatus,
    handleSubmit,
    onSubmit,
    handleStatusChange,
    handleBack,
    handleDeleteTicket,
  };
}
