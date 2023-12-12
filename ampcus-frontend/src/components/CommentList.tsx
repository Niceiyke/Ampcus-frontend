// CommentList.tsx

import React from "react";
import Comment from "./Comments";

interface CommentProps {
  id: string;
  user: string;
  description: string;
  loan: string;
  date_commented:string;
  attachments?: string;
  avatar?: string;
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
