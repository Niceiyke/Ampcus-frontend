// Comment.tsx
import { useAuth } from "../hooks/useAuth";
import { formatDate } from "../utils/dateFormater";

interface CommentProps {
  id: string;
  user: string;
  description: string;
  date_commented: string;
  loan: string;
  president_id:string;
  president_picture:string;
  treasurer_picture:string
  attachments?: string;
  profile_picture?: string;
}

const Comment: React.FC<CommentProps> = ({
  user,
  description,
  date_commented,
  attachments,
  president_id,
  president_picture,
  treasurer_picture
}) => {
  const { member } = useAuth();
 

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
              {formatDate(date_commented)}
            </p>
            <p className=" text-green-500">{description}</p>
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
        president_id===user?  
        <div className="flex space-x-4 border-2 rounded-md ml-36 lg:ml-64">
            <img
            src={`http://127.0.0.1:8000/media/${president_picture}`}
            alt={`Avatar of ${name}`}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="text-gray-600 text-sm">
              {formatDate(date_commented)}
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
          :
          <div className="flex space-x-4 border-2 rounded-md ml-36 lg:ml-64">
             <img
            src={`http://127.0.0.1:8000/media/${treasurer_picture}`}
            alt={`Avatar of ${name}`}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="text-gray-600 text-sm">
              {formatDate(date_commented)}
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
        </div>)

      }

    </>
  );
};

export default Comment;
