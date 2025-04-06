import { create } from 'zustand';

type CalendarItem = {
  name: string;
  startTime: string;
  height: number;
};

type Store = {
  items: { [date: string]: CalendarItem[] };
  setItems: (items: { [date: string]: CalendarItem[] }) => void;
};

export const useCalendarStore = create<Store>((set) => ({
  items: {},
  setItems: (newItems) => set({ items: newItems }),
}));
