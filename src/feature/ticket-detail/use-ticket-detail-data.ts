import { useCallback, useState } from "react";
import { toast } from "sonner-native";
import {
  getTicketById,
  updateTicket,
  deleteTicket,
  type TicketStatus,
} from "@/data/states/tickets";
import { useNavigation } from "@react-navigation/native";

export default function useTicketDetailData(ticketId: string) {
  const ticket = getTicketById(ticketId);
  const [statusSelected, setStatusSelected] = useState<TicketStatus>(() => {
    if (!ticket) return "open";
    return ticket.status;
  });

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

  const handleStatusChange = useCallback(
    (newStatus: TicketStatus) => {
      if (!ticket) return;
      if (ticket.status === newStatus) return;

      const updated = updateTicket(ticketId, { status: newStatus });

      if (updated) {
        toast.success("Status atualizado com sucesso!");
      } else {
        toast.error("Erro ao atualizar o status.");
      }
    },
    [ticket, ticketId],
  );

  return {
    ticket,
    handleStatusChange,
    statusSelected,
    setStatusSelected,
    handleBack,
    handleDeleteTicket,
  };
}
