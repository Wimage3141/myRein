// app/_layout.tsx
import { Tabs } from 'expo-router';
import '../global.css';

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
      name="index"
      options={{ 
        title: "Routine Input",
        headerShown: false
      }} />
      <Tabs.Screen name="calendar" options={{ title: "Calendar", headerShown: false }} />
      <Tabs.Screen name="dashboard" options={{ title: "Dashboard", headerShown: false }} />
    </Tabs>
  );
}
