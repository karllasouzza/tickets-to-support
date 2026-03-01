import { observable } from "@legendapp/state";
import { ObservablePersistMMKV } from "@legendapp/state/persist-plugins/mmkv";
import { syncObservable } from "@legendapp/state/sync";
import { generateId } from "../utils";

export type TicketStatus = "open" | "closed" | "improper" | "canceled";

export type Ticket = {
  id: string;
  title: string;
  details: string;
  closingDeadlineAt: string;
  createdAt: string;
  closedAt?: string;
  closingDescription?: string;
  status: TicketStatus;
};

export const tickets$ = observable<Ticket[]>([]);

syncObservable(tickets$, {
  persist: {
    name: "tickets",
    plugin: ObservablePersistMMKV,
  },
});

// CRUD Functions
export function createTicket(data: Omit<Ticket, "id" | "createdAt">): Ticket {
  const newTicket: Ticket = {
    id: generateId(),
    ...data,
    createdAt: new Date().toISOString(),
  };
  const current = tickets$.get();
  tickets$.set([...current, newTicket]);
  return newTicket;
}

export function getTickets(): Ticket[] {
  return tickets$.get();
}

export function getTicketById(id: string): Ticket | undefined {
  const current = tickets$.get();
  return current.find((ticket) => ticket.id === id);
}

const CLOSED_STATUSES: TicketStatus[] = ["closed", "improper", "canceled"];

export function updateTicket(
  id: string,
  data: Partial<Omit<Ticket, "id" | "createdAt">>,
): Ticket | null {
  const current = tickets$.get();
  const index = current.findIndex((ticket) => ticket.id === id);

  if (index === -1) return null;

  const merged = { ...current[index], ...data };

  if (
    data.status &&
    CLOSED_STATUSES.includes(data.status) &&
    !merged.closedAt
  ) {
    merged.closedAt = new Date().toISOString();
  } else if (data.status === "open") {
    merged.closedAt = undefined;
    merged.closingDescription = undefined;
  }

  const newTickets = [...current];
  newTickets[index] = merged;
  tickets$.set(newTickets);

  return merged;
}

export function deleteTicket(id: string): boolean {
  const current = tickets$.get();
  const filtered = current.filter((ticket) => ticket.id !== id);

  if (filtered.length === current.length) return false;

  tickets$.set(filtered);
  return true;
}

export function deleteAllTickets(): void {
  tickets$.set([]);
}

export function getTop5FastestClosedTickets(): Ticket[] {
  const current = tickets$.get();

  return current
    .filter((ticket) => ticket.closedAt)
    .map((ticket) => ({
      ticket,
      timeToClose:
        new Date(ticket.closedAt!).getTime() -
        new Date(ticket.createdAt).getTime(),
    }))
    .sort((a, b) => a.timeToClose - b.timeToClose)
    .slice(0, 5)
    .map(({ ticket }) => ticket);
}

// Dashboard Functions
export type PieChartData = {
  status: string;
  count: number;
};

export function getDashboardPieChartData(): PieChartData[] {
  const current = tickets$.get();

  const statusCount = {
    open: 0,
    closed: 0,
    improper: 0,
    canceled: 0,
  };

  current.forEach((ticket) => {
    statusCount[ticket.status]++;
  });

  return [
    { status: "aberto", count: statusCount.open },
    { status: "encerrado", count: statusCount.closed },
    { status: "improcedente", count: statusCount.improper },
    { status: "cancelado", count: statusCount.canceled },
  ];
}

export type DashboardMetrics = {
  totalTickets: number;
  averageClosureTimeMinutes: number;
};

export function getDashboardMetrics(): DashboardMetrics {
  const current = tickets$.get();

  if (current.length === 0) {
    return {
      totalTickets: 0,
      averageClosureTimeMinutes: 0,
    };
  }

  const totalTickets = current.length;

  const closedTickets = current.filter((t) => t.closedAt);

  if (closedTickets.length === 0) {
    return {
      totalTickets,
      averageClosureTimeMinutes: 0,
    };
  }

  const averageClosureTimeMs =
    closedTickets.reduce((sum, ticket) => {
      const closureTime =
        new Date(ticket.closedAt!).getTime() -
        new Date(ticket.createdAt).getTime();
      return sum + closureTime;
    }, 0) / closedTickets.length;

  const averageClosureTimeMinutes = Math.round(
    averageClosureTimeMs / 1000 / 60,
  );

  return {
    totalTickets,
    averageClosureTimeMinutes,
  };
}
