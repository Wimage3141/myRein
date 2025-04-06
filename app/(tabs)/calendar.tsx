// app/calendar.tsx
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { Button, View, StyleSheet, Text } from "react-native";
import { Agenda } from "react-native-calendars";

export default function Calendar() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/VoiceToText");
  };

  const [items, setItems] = useState<{ [date: string]: any[] }>({});

  const loadItems = (day: { dateString: string }) => {
    const newItems: { [date: string]: any[] } = {};
    const targetMonth = "2025-04"; // Targeting April 2025

    // Only load tasks for dates in April 2025
    if (day.dateString.startsWith(targetMonth)) {
      if (day.dateString === "2025-04-07") {
        newItems[day.dateString] = [
          {
            name: "Go to the gym",
            startTime: "18:00",
            height: 60,
          },
          {
            name: "Study React Native",
            startTime: "20:00",
            height: 60,
          },
        ];
      } else {
        newItems[day.dateString] = []; // Empty array for other days
      }
    }

    setItems(newItems); // Update the state with new items
  };

  const renderItem = (item: { name: string; startTime: string }) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.itemTime}>{item.startTime}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={"2025-04-06"}
        renderItem={renderItem}
        pastScrollRange={1}
        futureScrollRange={1}
        minDate={"2025-04-01"}
        maxDate={"2025-04-30"}
      />
      <Button title="Go to Voice to Text" onPress={handleClick} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  itemContainer: {
    backgroundColor: "#CBAACB",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    marginRight: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  itemTime: {
    fontSize: 12,
    marginTop: 5,
  },
});
