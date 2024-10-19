import React, { useState, useEffect } from 'react';
import { UserType } from '../App';

interface Comment {
  id: string;
  personId: string;
  author: string;
  content: string;
  timestamp: string;
}

interface CommentsProps {
  personId: string;
  userType: UserType;
}

const Comments: React.FC<CommentsProps> = ({ personId, userType }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');

  useEffect(() => {
    const storedComments = localStorage.getItem(`comments-${personId}`);
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, [personId]);

  const saveComments = (updatedComments: Comment[]) => {
    localStorage.setItem(`comments-${personId}`, JSON.stringify(updatedComments));
    setComments(updatedComments);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && authorName.trim()) {
      const newCommentObj: Comment = {
        id: Date.now().toString(),
        personId,
        author: authorName,
        content: newComment,
        timestamp: new Date().toISOString(),
      };
      const updatedComments = [newCommentObj, ...comments];
      saveComments(updatedComments);
      setNewComment('');
      setAuthorName('');
    }
  };

  const handleDelete = (commentId: string) => {
    const updatedComments = comments.filter((comment) => comment.id !== commentId);
    saveComments(updatedComments);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Libro de firmas</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label htmlFor="authorName" className="block text-sm font-medium text-gray-700 mb-2">
            Su Nombre
          </label>
          <input
            type="text"
            id="authorName"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="newComment" className="block text-sm font-medium text-gray-700 mb-2">
            Nuevo Comentario
          </label>
          <textarea
            id="newComment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-[#B8860B] text-white py-2 px-4 rounded-md hover:bg-[#DAA520] transition duration-300"
        >
          Enviar Comentario
        </button>
      </form>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-100 p-4 rounded-md">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-semibold">{comment.author}</p>
                <p className="text-sm text-gray-500">
                  {new Date(comment.timestamp).toLocaleString()}
                </p>
              </div>
              {userType === 'admin' && (
                <button
                  onClick={() => handleDelete(comment.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Eliminar
                </button>
              )}
            </div>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;