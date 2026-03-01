import {
  getDashboardMetrics,
  getDashboardPieChartData,
  getTop5FastestClosedTickets,
  type DashboardMetrics,
  type Ticket,
} from "@/data/states/tickets";
import { getStatusColor, getStatusLabel } from "../core/utils.ts/ticket-utils";

export type PieSlice = {
  value: number;
  color: string;
  label: string;
};

export type DashboardData = {
  pieSlices: PieSlice[];
  metrics: DashboardMetrics;
  top5: Ticket[];
};

export function formatWindow(createdAt: string, closedAt: string): string {
  const diff = new Date(closedAt).getTime() - new Date(createdAt).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 60) return `${mins} min`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  return `${Math.floor(hrs / 24)} dias`;
}

export default function useDashboardLogic(): DashboardData {
  const rawPie = getDashboardPieChartData();
  const metrics = getDashboardMetrics();
  const top5 = getTop5FastestClosedTickets();

  const pieSlices: PieSlice[] = rawPie
    .filter((d) => d.count > 0)
    .map((d) => ({
      value: d.count,
      color: getStatusColor(d.status),
      label: getStatusLabel(d.status),
    }));

  return { pieSlices, metrics, top5 };
}
