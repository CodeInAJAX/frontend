import { useState, useEffect, useCallback } from 'react';
import { useApi } from './useApi';

// Gunakan proxy URL yang sudah dikonfigurasi di vite.config.js
const API_URL = "/api/v1";


export const useLessons = (courseId) => {
  const [lessons, setLessons] = useState([]);
  const { request, loading, error, setError } = useApi();

  // Validasi courseId
  const isValidCourseId = courseId && courseId !== 'undefined' && courseId.trim() !== '';

  const fetchLessons = useCallback(async () => {
    if (!isValidCourseId) {
      console.warn('Course ID tidak valid:', courseId);
      setLessons([]);
      return;
    }

    try {
      console.log('Fetching lessons for courseId:', courseId);
      const data = await request({
        method: 'GET',
        path: `/courses/${courseId}/lessons`
      });
      setLessons(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Gagal ambil data lesson:", err);
      setLessons([]);
    }
  }, [courseId, request, isValidCourseId]);

  const createLesson = useCallback(async (lessonData) => {
    if (!isValidCourseId) {
      throw new Error('Course ID tidak valid');
    }

    try {
      console.log('Creating lesson for courseId:', courseId, lessonData);
      await request({
        method: 'POST',
        path: `/courses/${courseId}/lessons`,
        data: lessonData
      });
      await fetchLessons();
    } catch (err) {
      console.error("Gagal tambah lesson:", err);
      throw err;
    }
  }, [courseId, request, fetchLessons, isValidCourseId]);

  const updateLesson = useCallback(async (lessonId, lessonData) => {
    if (!isValidCourseId) {
      throw new Error('Course ID tidak valid');
    }

    try {
      console.log('Updating lesson for courseId:', courseId, 'lessonId:', lessonId);
      await request({
        method: 'PATCH',
        path: `/courses/${courseId}/lessons/${lessonId}`,
        data: lessonData
      });
      await fetchLessons();
    } catch (err) {
      console.error("Gagal update lesson:", err);
      throw err;
    }
  }, [courseId, request, fetchLessons, isValidCourseId]);

  const deleteLesson = useCallback(async (lessonId) => {
    if (!isValidCourseId) {
      throw new Error('Course ID tidak valid');
    }

    const confirmDelete = window.confirm('Yakin ingin menghapus lesson ini?');
    if (!confirmDelete) return;

    try {
      console.log('Deleting lesson for courseId:', courseId, 'lessonId:', lessonId);
      await request({
        method: 'DELETE',
        path: `/courses/${courseId}/lessons/${lessonId}`
      });
      await fetchLessons();
    } catch (err) {
      console.error("Gagal hapus lesson:", err);
      throw err;
    }
  }, [courseId, request, fetchLessons, isValidCourseId]);

  const clearError = useCallback(() => {
    setError(null);
  }, [setError]);

  useEffect(() => {
    if (isValidCourseId) {
      fetchLessons();
    }
  }, [courseId, fetchLessons, isValidCourseId]);

  return {
    lessons,
    loading,
    error,
    createLesson,
    updateLesson,
    deleteLesson,
    refetch: fetchLessons,
    isValidCourseId,
    clearError
  };
};