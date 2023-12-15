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
  profile_picture?: string;
}

interface CommentListProps {
  comments: CommentProps[];
  president_id:string;
  president_picture:string;
  treasurer_picture:string;
}

const CommentList: React.FC<CommentListProps> = ({ comments ,president_id,president_picture,treasurer_picture}) => {
  return (
    <div className="space-y-4">
      {comments.map((comment, index) => (
        <Comment key={index} {...comment} president_id={president_id} president_picture={president_picture} treasurer_picture={treasurer_picture} />
      ))}
    </div>
  );
};

export default CommentList;
