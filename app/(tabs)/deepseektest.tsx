import { View, Text, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import OPENROUTER_API_KEY from '../../openrouter'

const DeepSeekTestScreen = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [reply, setReply] = useState('');

  return (
    <View className="p-20 pt-50">
      <Text className="text-red-500">Hello from DeepSeekTestScreen</Text>

      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder='Type here :)'
        className='border border-gray-300 rounded-lg p-3 text-base'
      />

      <Text>{input}</Text>

      <Button
  title={loading ? "Sending..." : "Send"}
  disabled={loading}
  onPress={async () => {
    setLoading(true);
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: 'POST',
        headers: {
          Authorization: `Bearer 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`,
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

Example output:
[
  {
    "name": "Go to the gym",
    "date": "2025-04-06",
    "start_time": "18:00"
  },
  {
    "name": "Study React Native",
    "date": "2025-04-06",
    "start_time": "20:00"
  }
]

Do not include any explanation or commentary. Only return the JSON array — no formatting, no code blocks, no newlines.`,
            },
            {
              role: 'user',
              content: input,
            },
          ],
        }),
      });

      const data = await response.json();
      console.log('🔍 Raw response:', JSON.stringify(data, null, 2));

      const content = data?.choices?.[0]?.message?.content;

      try {
        const parsed = JSON.parse(content); // 🎯 The magic happens here
        console.log('✅ Parsed JSON:', parsed); // 🌟 See it in action here
        setReply('✅ Parsed successfully! Check console.');
      } catch (err) {
        console.error('❌ Failed to parse JSON:', err);
        setReply('⚠️ Could not parse the LLM response.');
      }

    } catch (err) {
      console.error('API error:', err);
      setReply('Error: Could not get a response.');
    } finally {
      setLoading(false);
    }
  }}
/>


    </View>
  )
}

export default DeepSeekTestScreen