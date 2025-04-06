// CalendarScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Agenda } from 'react-native-calendars';

type TaskItem = {
  name: string;
  startTime: string;
  duration: string;
  height: number;
};

type AgendaItems = {
  [date: string]: TaskItem[];
};

const CalendarScreen = () => {
  const [items, setItems] = useState<AgendaItems>({});

  const loadItems = (day: { dateString: string }) => {
    const newItems: AgendaItems = {};

    // Hardcoded task for demo (could be replaced later with LLM-generated tasks)
    const dateStr = day.dateString;
    newItems[dateStr] = [
      {
        name: 'Go to the gym',
        startTime: '18:00',
        duration: '1 hour',
        height: 60
      },
      {
        name: 'Study React Native',
        startTime: '20:00',
        duration: '2 hours',
        height: 60
      }
    ];

    setItems(newItems);
  };

  const renderItem = (item: TaskItem) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.itemTime}>{item.startTime} • {item.duration}</Text>
      </View>
    );
  };

  return (
    <Agenda
      items={items}
      loadItemsForMonth={loadItems}
      selected={new Date().toISOString().split('T')[0]}
      renderItem={renderItem}
      theme={agendaTheme}
    />
  );
};

const pastelViolet = '#CBAACB';

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: pastelViolet,
    padding: 15,
    borderRadius: 12,
    marginRight: 10,
    marginTop: 17,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333'
  },
  itemTime: {
    fontSize: 13,
    color: '#555',
    marginTop: 4
  }
});

const agendaTheme = {
  selectedDayBackgroundColor: pastelViolet,
  dotColor: pastelViolet,
  agendaDayTextColor: '#555',
  agendaKnobColor: pastelViolet,
  todayTextColor: pastelViolet,
  monthTextColor: '#444',
  textSectionTitleColor: '#888',
};

export default CalendarScreen;
