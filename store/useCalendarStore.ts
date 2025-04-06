import { create } from 'zustand';

type CalendarItem = {
  name: string;
  startTime: string;
  height: number;
};

type CalendarStore = {
  items: { [date: string]: CalendarItem[] };
  setItems: (newItems: { [date: string]: CalendarItem[] }) => void;
};

export const useCalendarStore = create<CalendarStore>((set) => ({
  items: {},
  setItems: (newItems) => set({ items: newItems }),
}));
