// app/_layout.tsx
import { Tabs } from 'expo-router';
import './global.css';

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Routine Input" }} />
      <Tabs.Screen name="calendar" options={{ title: "Calendar" }} />
      <Tabs.Screen name="dashboard" options={{ title: "Dashboard" }} />
    </Tabs>
  );
}
