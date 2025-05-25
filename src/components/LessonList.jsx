import LessonCard from './LessonCard';

const LessonList = ({ lessons, onEdit, onDelete, loading }) => {
  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (lessons.length === 0) {
    return <p className="text-gray-500">Belum ada pelajaran.</p>;
  }

  return (
    <div className="space-y-4">
      {lessons.map((lesson) => (
        <LessonCard
          key={lesson.id}
          lesson={lesson}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default LessonList;