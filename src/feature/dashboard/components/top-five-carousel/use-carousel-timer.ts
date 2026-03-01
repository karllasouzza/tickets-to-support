import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import { type FlatList } from "react-native";
import { type Ticket } from "@/data/states/tickets";

type UseCarouselTimerProps = {
  ticketsLength: number;
  autoPlayMs: number;
  listRef: RefObject<FlatList<Ticket> | null>;
};

export function useCarouselTimer({
  ticketsLength,
  autoPlayMs,
  listRef,
}: UseCarouselTimerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const isPaused = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    if (ticketsLength <= 1) return;
    stopTimer();
    timerRef.current = setInterval(() => {
      if (isPaused.current) return;
      setActiveIndex((prev) => {
        const next = (prev + 1) % ticketsLength;
        listRef.current?.scrollToIndex({ index: next, animated: true });
        return next;
      });
    }, autoPlayMs);
  }, [ticketsLength, stopTimer, autoPlayMs, listRef]);

  useEffect(() => {
    startTimer();
    return stopTimer;
  }, [startTimer, stopTimer]);

  return {
    activeIndex,
    setActiveIndex,
    isPaused,
  };
}
