const STATUS_META = {
  open: { color: "#F97316", label: "Aberto" },
  closed: { color: "#22C55E", label: "Encerrado" },
  improper: { color: "#EF4444", label: "Improcedente" },
  canceled: { color: "#94A3B8", label: "Cancelado" },
} as const;

const PT_TO_EN_STATUS: Record<string, keyof typeof STATUS_META> = {
  aberto: "open",
  encerrado: "closed",
  improcedente: "improper",
  cancelado: "canceled",
};

export const FALLBACK_STATUS_COLOR = "#94A3B8";

export const STATUS_COLORS: Record<string, string> = {
  open: STATUS_META.open.color,
  closed: STATUS_META.closed.color,
  improper: STATUS_META.improper.color,
  canceled: STATUS_META.canceled.color,
  aberto: STATUS_META.open.color,
  encerrado: STATUS_META.closed.color,
  improcedente: STATUS_META.improper.color,
  cancelado: STATUS_META.canceled.color,
};

export const STATUS_LABELS: Record<string, string> = {
  open: STATUS_META.open.label,
  closed: STATUS_META.closed.label,
  improper: STATUS_META.improper.label,
  canceled: STATUS_META.canceled.label,
  aberto: STATUS_META.open.label,
  encerrado: STATUS_META.closed.label,
  improcedente: STATUS_META.improper.label,
  cancelado: STATUS_META.canceled.label,
};

function normalizeStatus(status: string): keyof typeof STATUS_META | undefined {
  if (status in STATUS_META) {
    return status as keyof typeof STATUS_META;
  }

  return PT_TO_EN_STATUS[status];
}

export function getStatusColor(status: string): string {
  const normalized = normalizeStatus(status);
  return normalized ? STATUS_META[normalized].color : FALLBACK_STATUS_COLOR;
}

export function getStatusLabel(status: string): string {
  const normalized = normalizeStatus(status);
  return normalized ? STATUS_META[normalized].label : status;
}
