import React from 'react';

const LessonCard = ({ lesson, onEdit, onDelete }) => {
  return (
    <div className="border p-4 rounded shadow-sm flex justify-between items-start">
      <div>
        <h2 className="text-lg font-semibold">{lesson.title}</h2>
        <p className="text-sm text-gray-600">{lesson.description}</p>
        <a
          href={lesson.video_link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 text-sm"
        >
          Tonton Video
        </a>
        <p className="text-xs text-gray-400 mt-1">
          Durasi: {lesson.duration}s | Urutan: {lesson.order_number}
        </p>
      </div>
      <div className="space-x-2">
        <button
          onClick={() => onEdit(lesson)}
          className="text-blue-500 hover:underline"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(lesson.id)}
          className="text-red-500 hover:underline"
        >
          Hapus
        </button>
      </div>
    </div>
  );
};

export default LessonCard;