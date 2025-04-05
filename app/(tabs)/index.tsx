// app/index.tsx
import { View, Text, Button, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function RoutineInputScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎙️ Add Routine via Voice</Text>
      {/* You can add mic button here later */}
      <Button title="Show Routine" onPress={() => router.push('/calendar')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
