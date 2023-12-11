// CommentList.tsx

import React from 'react';
import Comment from './Comments';

interface CommentProps {
    avatar: string;
    name: string;
    text: string;
    date: string;
    pdfFile?: string; // Optional PDF file URL
  }

interface CommentListProps {
  comments: CommentProps[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <div className="space-y-4">
      {comments.map((comment, index) => (
        <Comment key={index} {...comment} />
      ))}
    </div>
  );
};

export default CommentList;
