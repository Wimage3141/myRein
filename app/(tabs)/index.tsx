import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, Pressable, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { router } from 'expo-router';
import { useCalendarStore } from '../../store/useCalendarStore';
import OPENROUTER_API_KEY from '../../openrouter';

export default function RoutineInputScreen() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [reply, setReply] = useState('');
  const [listening, setListening] = useState(false);
  const [speechStatus, setSpeechStatus] = useState('');
  const [showStartButton, setShowStartButton] = useState(false);
  const [agendaTasks, setAgendaTasks] = useState<any[]>([]);
  const [triggeredTasks, setTriggeredTasks] = useState<Set<string>>(new Set());
  const { setItems } = useCalendarStore();

  // ✅ Check current time every 2 seconds and compare with task startTime
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const currentTime = `${hours}:${minutes}`;

      const match = agendaTasks.find(task => {
        const id = `${task.name}-${task.startTime}`;
        return task.startTime === currentTime && !triggeredTasks.has(id);
      });

      if (match) {
        const id = `${match.name}-${match.startTime}`;
        console.log('🎯 Time match found!', match.name);
        setTriggeredTasks(prev => new Set(prev).add(id));
        setShowStartButton(true);
      }
    }, 2000); // 🔁 every 2s for demo

    return () => clearInterval(interval);
  }, [agendaTasks, triggeredTasks]);

  const handleSend = async (textOverride?: string) => {
    const messageToSend = textOverride ?? input;
    if (!messageToSend.trim()) return;

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
              content: messageToSend,
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
      const allTasksToday = agendaData["2025-04-06"] || [];
      setAgendaTasks(allTasksToday);
      setReply('✅ Tasks added to calendar!');
    } catch (err) {
      console.error('❌ Error:', err);
      setReply('⚠️ Could not parse or send data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 50 }}>
        <Text className="text-purple-600 text-xl font-bold mb-4">
          🎙️ Add Routine via Text or Voice
        </Text>

        {/* 🎤 Voice Input Button */}
        <View style={{ height: 80, marginBottom: 10 }}>
          <WebView
            originWhitelist={['*']}
            javaScriptEnabled
            scrollEnabled={false}
            style={{ borderRadius: 12, overflow: 'hidden' }}
            source={{
              html: `
                <html>
                  <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                      html, body {
                        margin: 0;
                        padding: 0;
                        background: transparent;
                        width: 100%;
                        height: 100%;
                      }
                      .mic-button {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 100vw;
                        height: 100vh;
                        font-size: 22px;
                        border: none;
                        border-radius: 12px;
                        background-color: #8b5cf6;
                        color: white;
                        cursor: pointer;
                        animation: pulse 1.2s infinite;
                      }
                      @keyframes pulse {
                        0% {
                          box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.4);
                        }
                        70% {
                          box-shadow: 0 0 0 10px rgba(139, 92, 246, 0);
                        }
                        100% {
                          box-shadow: 0 0 0 0 rgba(139, 92, 246, 0);
                        }
                      }
                    </style>
                  </head>
                  <body>
                    <button class="mic-button" onclick="start()">🎙️ Speak Now</button>
                    <script>
                      function start() {
                        window.ReactNativeWebView.postMessage('__LISTENING__');
                        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
                        recognition.lang = 'en-US';
                        recognition.interimResults = false;
                        recognition.maxAlternatives = 1;

                        recognition.onresult = (event) => {
                          const transcript = event.results[0][0].transcript;
                          window.ReactNativeWebView.postMessage(transcript);
                        };

                        recognition.onerror = (err) => {
                          window.ReactNativeWebView.postMessage('❌ Speech error: ' + err.error);
                        };

                        recognition.start();
                      }
                    </script>
                  </body>
                </html>
              `,
            }}
            onMessage={(event) => {
              const data = event.nativeEvent.data;
              if (data === '__LISTENING__') {
                setListening(true);
                setSpeechStatus('🎧 Listening...');
                return;
              }
              setListening(false);
              setSpeechStatus('🗣️ Heard: ' + data);
              setInput(data);
              handleSend(data);
            }}
          />
        </View>

        {speechStatus !== '' && (
          <Text style={{ marginBottom: 12, fontStyle: 'italic', color: '#555' }}>
            {speechStatus}
          </Text>
        )}

        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="E.g. Go to the gym at 6 and study at 8"
          className="border border-gray-300 rounded-lg p-3 text-base mb-4"
        />

        <Button title={loading ? 'Sending...' : 'Send'} onPress={() => handleSend()} disabled={loading} />

        <Button
          title="📅 Show Calendar"
          onPress={() => router.push('/calendar')}
          style={{ marginTop: 20 }}
        />

        {reply !== '' && (
          <Text className="mt-6 text-base text-gray-800">{reply}</Text>
        )}
      </ScrollView>

      {/* ✅ FULL SCREEN START BUTTON OVERLAY */}
      {showStartButton && (
        <View
          style={[
            StyleSheet.absoluteFillObject,
            {
              backgroundColor: 'rgba(0,0,0,0.75)',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 999,
            },
          ]}
        >
          <Pressable
            onPress={() => {
              console.log('✅ Start pressed!');
              setShowStartButton(false);
            }}
            style={{
              backgroundColor: '#10b981',
              paddingVertical: 25,
              paddingHorizontal: 70,
              borderRadius: 100,
              elevation: 8,
              shadowColor: '#10b981',
              shadowOpacity: 0.8,
              shadowRadius: 20,
            }}
          >
            <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}>START</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
