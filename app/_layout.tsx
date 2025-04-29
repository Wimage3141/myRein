import { Stack } from "expo-router";
import { TaskContextProvider } from "./TaskContext";

export default function RootLayout() {
  return (
    <TaskContextProvider>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />
      </Stack>
    </TaskContextProvider>
  );
}
