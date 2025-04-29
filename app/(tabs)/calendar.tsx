import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const CalendarTab = () => {
  const openDayTasks = (date: string) => {
    router.push({
      pathname: '/daytasks',
      params: { date },
    });
  };

  const today = new Date().toISOString().split('T')[0];

  const generateAprilGrid = () => {
    const year = 2025;
    const month = 3; // April
    const totalDays = 30;
    const firstDay = new Date(year, month, 1).getDay();
    const totalCells = Math.ceil((firstDay + totalDays) / 7) * 7;
    const days: (string | null)[] = [];

    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= totalDays; d++) {
      days.push(new Date(year, month, d).toISOString().split('T')[0]);
    }
    while (days.length < totalCells) days.push(null);

    return days;
  };

  const grid = generateAprilGrid();

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#fff' }}>
      <Text style={{
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 50,  // ↑ increased gap
        marginTop: 50
      }}>
        April 2025
      </Text>

      <View style={{
        flexDirection: 'row',
        marginBottom: 8,     // ↑ gap before grid
      }}>
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(day => (
          <View key={day} style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontWeight: '600' }}>{day}</Text>
          </View>
        ))}
      </View>

      <FlatList
        data={grid}
        keyExtractor={(_, idx) => `cell-${idx}`}
        numColumns={7}
        scrollEnabled={false}
        contentContainerStyle={{ marginTop: 8 }}  // ↑ extra spacing
        renderItem={({ item }) => {
          if (!item) {
            return <View style={{
              flex: 1,
              aspectRatio: 1,
              margin: 2,
            }} />;
          }

          const isToday = item === today;
          const dayNum = parseInt(item.split('-')[2], 10);

          return (
            <TouchableOpacity
              onPress={() => openDayTasks(item)}
              style={{
                flex: 1,
                aspectRatio: 1,
                margin: 2,
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: isToday ? '#3b82f6' : '#e5e7eb',
              }}
            >
              <Text style={{ fontWeight: 'bold' }}>{dayNum}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default CalendarTab;
