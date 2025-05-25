import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useLessons } from "../hooks/useLessons";
import { useLessonForm } from "../hooks/useLessonForm";
import LessonForm from "../components/LessonForm";
import LessonList from "../components/LessonList";

const MentorCourseDetail = () => {
  const { courseId } = useParams();
  
  // Debug courseId
  useEffect(() => {
    console.log('CourseId from params:', courseId);
    console.log('Type of courseId:', typeof courseId);
  }, [courseId]);

  const {
    lessons,
    loading,
    error,
    createLesson,
    updateLesson,
    deleteLesson,
    isValidCourseId,
    clearError
  } = useLessons(courseId);

  const handleFormSubmit = async (formData, editingLessonId) => {
    if (editingLessonId) {
      await updateLesson(editingLessonId, formData);
    } else {
      await createLesson(formData);
    }
  };

  const {
    formData,
    editingLessonId,
    isSubmitting,
    formError,
    handleChange,
    handleSubmit,
    setEditForm,
    cancelEdit,
    isEditing
  } = useLessonForm(handleFormSubmit);

  // Tampilkan error jika courseId tidak valid
  if (!isValidCourseId) {
    return (
      <div className="p-6">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <strong>Course ID tidak valid!</strong>
          <p className="mt-1 text-sm">
            Course ID yang diterima: <code>{courseId || 'undefined'}</code>
          </p>
          <p className="mt-1 text-sm">
            Pastikan URL sesuai format: <code>/mentor/course/[COURSE_ID]</code>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Kelola Konten Kursus
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Course ID: <code className="bg-gray-100 px-2 py-1 rounded text-xs">{courseId}</code>
        </p>
      </div>

      {/* Global Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <div className="flex justify-between items-start">
            <div>
              <strong>Error:</strong>
              <p className="mt-1">{error}</p>
            </div>
            <button
              onClick={clearError}
              className="text-red-500 hover:text-red-700 ml-4"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Form Section */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">
          {isEditing ? 'Edit Pelajaran' : 'Tambah Pelajaran Baru'}
        </h2>
        <LessonForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          isEditing={isEditing}
          formError={formError}
          cancelEdit={cancelEdit}
        />
      </div>

      {/* Lessons List Section */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold mb-4">
          Daftar Pelajaran ({lessons.length})
        </h2>
        <LessonList
          lessons={lessons}
          onEdit={setEditForm}
          onDelete={deleteLesson}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default MentorCourseDetail;