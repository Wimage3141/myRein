// app/(tabs)/canvasdebug.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { CANVAS_TOKEN } from '../../secrets';

const CanvasDebugScreen = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(
          'https://usflearn.instructure.com/api/v1/courses',
          {
            headers: {
              Authorization: `Bearer ${CANVAS_TOKEN}`,
            },
          }
        );
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to fetch courses');
      }
    };

    fetchCourses();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Your Canvas Courses</Text>
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        courses.map((course, index) => (
          <View key={index} style={styles.courseCard}>
            <Text style={styles.courseName}>{course.name}</Text>
            <Text style={styles.courseId}>ID: {course.id}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  error: {
    color: 'red',
  },
  courseCard: {
    backgroundColor: '#F2F2F2',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  courseName: {
    fontSize: 16,
    fontWeight: '600',
  },
  courseId: {
    fontSize: 14,
    color: '#666',
  },
});

export default CanvasDebugScreen;
