import { useState, useCallback } from 'react';

const initialFormData = {
  title: "",
  description: "",
  video_link: "",
  duration: "",
  order_number: "",
};

export const useLessonForm = (onSubmit) => {
  const [formData, setFormData] = useState(initialFormData);
  const [editingLessonId, setEditingLessonId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear form error when user starts typing
    if (formError) setFormError(null);
  }, [formError]);

  const validateForm = useCallback((data) => {
    if (!data.title.trim()) return 'Judul video harus diisi';
    if (!data.description.trim()) return 'Deskripsi harus diisi';
    if (!data.video_link.trim()) return 'Link video harus diisi';
    if (!data.duration || data.duration <= 0) return 'Durasi harus lebih dari 0';
    if (!data.order_number || data.order_number <= 0) return 'Urutan harus lebih dari 0';
    return null;
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    const validationError = validateForm(formData);
    if (validationError) {
      setFormError(validationError);
      return;
    }

    setIsSubmitting(true);
    setFormError(null);
    
    try {
      await onSubmit(formData, editingLessonId);
      resetForm();
    } catch (err) {
      setFormError(err.message || 'Terjadi kesalahan saat menyimpan data');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, editingLessonId, onSubmit, validateForm]);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setEditingLessonId(null);
    setFormError(null);
  }, []);

  const setEditForm = useCallback((lesson) => {
    setFormData({
      title: lesson.title || "",
      description: lesson.description || "",
      video_link: lesson.video_link || "",
      duration: lesson.duration?.toString() || "",
      order_number: lesson.order_number?.toString() || "",
    });
    setEditingLessonId(lesson.id);
    setFormError(null);
  }, []);

  const cancelEdit = useCallback(() => {
    resetForm();
  }, [resetForm]);

  return {
    formData,
    editingLessonId,
    isSubmitting,
    formError,
    handleChange,
    handleSubmit,
    resetForm,
    setEditForm,
    cancelEdit,
    isEditing: editingLessonId !== null
  };
};