// Comment.tsx

import React from 'react';

interface CommentProps {
  avatar: string;
  name: string;
  text: string;
  date: string;
  pdfFile?: string; // Optional PDF file URL
}

const Comment: React.FC<CommentProps> = ({ avatar, name, text, date, pdfFile }) => {
  return (
    <div className="flex items-start space-x-4">
      <img
        src={avatar}
        alt={`Avatar of ${name}`}
        className="w-10 h-10 rounded-full"
      />
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <p className="font-semibold">{name}</p>
          <p className="text-gray-500">{date}</p>
        </div>
        <p>{text}</p>
        {pdfFile && (
          <a href={pdfFile} target="_blank" rel="noopener noreferrer" className="text-blue-500">
            View PDF
          </a>
        )}
      </div>
    </div>
  );
};

export default Comment;
