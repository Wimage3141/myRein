// app/calendar.tsx
import React from "react";
import { useRouter } from "expo-router";
import { Button, View } from "react-native";
import CalendarScreen from '../../components/CalendarScreen';

export default function Calendar() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/VoiceToText");
  };

  return (
    <View>
      <View style={{ padding: 20 }}>
        <CalendarScreen />
      </View>
      <View style={{ marginTop: 20 }}>
        <Button title="VTS" onPress={handleClick} />
      </View>
    </View>
  );
}
