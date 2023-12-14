// Comment.tsx

import React from "react";
import { useAuth } from "../hooks/useAuth";

interface CommentProps {
  id: string;
  user: string;
  description: string;
  date_commented: string;
  loan: string;
  attachments?: string;
  profile_picture?: string;
}

const Comment: React.FC<CommentProps> = ({
  user,
  description,
  date_commented,
  attachments,
}) => {
  const { member } = useAuth();
  console.log(member.profile_picture,description);
  return (
    <>
      {member.user.id === user ? (
        <div className="flex space-x-4 border-2 rounded-md mr-36 lg:mr-64">
          <img
            src={member.profile_picture}
            alt={`Avatar of ${name}`}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="text-gray-600 text-sm">
              {new Date(date_commented).toLocaleString()}
            </p>
            <p className=" text-green-300">{description}</p>
            {attachments && (
              <a
                href={attachments}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 mt-4"
              >
                View PDF
              </a>
            )}
          </div>
        </div>
      ) : (
        <div className="flex space-x-4 border-2 rounded-md ml-36 lg:ml-64">
          <img
            src={member.profile_picture}
            alt={`Avatar of ${name}`}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="text-gray-600 text-sm">
              {new Date(date_commented).toLocaleString()}
            </p>
            <p className=" text-red-300">{description}</p>
            {attachments && (
              <a
                href={attachments}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 mt-4"
              >
                View PDF
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Comment;
