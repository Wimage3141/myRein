// app/dashboard.tsx
import { View, Text, StyleSheet } from 'react-native';

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Efficiency Dashboard</Text>
      <Text style={styles.text}>You completed 2 of 3 tasks today.</Text>
      <Text style={styles.text}>Efficiency: 66%</Text>
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
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
  },
});
