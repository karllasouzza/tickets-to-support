import { useState } from "react";
import { getTickets, type TicketStatus } from "@/data/states/tickets";
import { type FilterStatus } from "./components/filter-header";

export default function useHomeLogic() {
  const tickets = getTickets();
  const [selectedFilter, setSelectedFilter] = useState<FilterStatus>("all");

  const filteredTickets =
    selectedFilter === "all"
      ? tickets.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
      : tickets
          .filter((t) => t.status === (selectedFilter as TicketStatus))
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          );

  return { tickets, filteredTickets, selectedFilter, setSelectedFilter };
}
