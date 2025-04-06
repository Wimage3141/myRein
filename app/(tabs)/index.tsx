import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useCalendarStore } from '../store/useCalendarStore';
import OPENROUTER_API_KEY from '../../openrouter';

export default function RoutineInputScreen() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [reply, setReply] = useState('');
  const { setItems } = useCalendarStore();

  const handleSend = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-chat-v3-0324:free',
          messages: [
            {
              role: 'system',
              content: `You are a helpful scheduling assistant. The user will describe tasks and when they want to do them in natural language.

Return only a valid JSON array, where each item represents one task.

Each task should have these fields:
- "name": a short string describing the task
- "date": always use "2025-04-06" as the date
- "start_time": in 24-hour format like "14:30"

Only return the JSON array. No formatting, no code blocks, no newlines.`,
            },
            {
              role: 'user',
              content: input,
            },
          ],
        }),
      });

      const data = await response.json();
      const content = data?.choices?.[0]?.message?.content;

      if (!content?.trim().startsWith('[')) {
        throw new Error('Invalid response format');
      }

      const parsed = JSON.parse(content);
      const agendaData: { [date: string]: any[] } = {};

      parsed.forEach((task: any) => {
        const { name, start_time, date } = task;
        if (!agendaData[date]) agendaData[date] = [];
        agendaData[date].push({
          name,
          startTime: start_time,
          height: 60,
        });
      });

      setItems(agendaData);
      setReply('✅ Tasks added to calendar!');
    } catch (err) {
      console.error('❌ Error:', err);
      setReply('⚠️ Could not parse or send data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 50 }}>
      <Text className="text-purple-600 text-xl font-bold mb-4">
        🎙️ Add Routine via Text
      </Text>

      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="E.g. Go to the gym at 6 and study at 8"
        className="border border-gray-300 rounded-lg p-3 text-base mb-4"
      />

      <Button title={loading ? 'Sending...' : 'Send'} onPress={handleSend} disabled={loading} />

      <Button
        title="📅 Show Calendar"
        onPress={() => router.push('/calendar')}
        style={{ marginTop: 20 }}
      />

      {reply !== '' && (
        <Text className="mt-6 text-base text-gray-800">{reply}</Text>
      )}
    </ScrollView>
  );
}





// import { View, Text, Button, StyleSheet } from 'react-native';
// import { router } from 'expo-router';

// export default function RoutineInputScreen() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>🎙️ Add Routine via Voice</Text>
//       {/* You can add mic button here later */}
//       <Button title="Show Routine" onPress={() => router.push('/calendar')} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
// });
