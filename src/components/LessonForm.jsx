import React from 'react';

const LessonForm = ({ 
  formData, 
  handleChange, 
  handleSubmit, 
  isSubmitting, 
  isEditing,
  formError,
  cancelEdit
}) => {
  return (
    <div className="mb-6">
      {formError && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {formError}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Judul Video"
          value={formData.title}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          disabled={isSubmitting}
        />
        <textarea
          name="description"
          placeholder="Deskripsi"
          value={formData.description}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
          required
          disabled={isSubmitting}
        />
        <input
          type="url"
          name="video_link"
          placeholder="Link Video (https://...)"
          value={formData.video_link}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          disabled={isSubmitting}
        />
        <input
          type="number"
          name="duration"
          placeholder="Durasi (detik)"
          value={formData.duration}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          min="1"
          required
          disabled={isSubmitting}
        />
        <input
          type="number"
          name="order_number"
          placeholder="Urutan"
          value={formData.order_number}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          min="1"
          required
          disabled={isSubmitting}
        />
        
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 rounded text-white font-medium ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isSubmitting 
              ? 'Menyimpan...' 
              : (isEditing ? 'Update' : 'Tambah') + ' Pelajaran'
            }
          </button>
          
          {isEditing && (
            <button
              type="button"
              onClick={cancelEdit}
              disabled={isSubmitting}
              className="px-6 py-2 rounded text-gray-700 border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
            >
              Batal
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default LessonForm;