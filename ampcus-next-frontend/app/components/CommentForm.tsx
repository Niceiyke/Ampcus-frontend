import React, { useState } from "react";

interface CommentFormProps {
  user: string;
  loan: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ user, loan }) => {
  const [comment, setComment] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [showAttachment, setShowAttachment] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError]=useState<string>('')

  const focusTextarea = (): void => {
    const textarea = document.getElementById(
      "comment"
    ) as HTMLTextAreaElement | null;
    if (textarea) {
      textarea.focus();
    }
  };

  const clearError = (): void => {
    setError("");
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const selectedFile = event.target.files && event.target.files[0];
    

    if (
      selectedFile &&
      selectedFile.type === "application/pdf" &&
      selectedFile.size <= 4 * 1024 * 1024
    ) {
      setFile(selectedFile);
    } else {
      setFile(null);
      alert("Please select a valid PDF file (max 4MB).");
    }
  };

  const submitForm = (): void => {
    if (isSubmitting) {
      return; 
    }

    setIsSubmitting(true);

    const apiEndpoint = "http://127.0.0.1:8000/api/add-comments/";

    const formData = new FormData();
    formData.append("description", comment);
    formData.append("user", user);
    formData.append("loan", loan);
    if (file) {
      formData.append("attachments", file);
    }
    if (comment.trim() === ""){
      setError('comment cannot be empty')
      return
    }
      fetch(apiEndpoint, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("API response:", data);
        
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
          
        })
        .finally(() => {
          setIsSubmitting(false); 
        });
  };

  return (
    <>
      <p className="text-red-500 font-light text-sm pl-8">{error}</p>
      <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md mb-4">
        <textarea
          name="comments"
          id="comment"
          placeholder="Add comments"
          className="resize-none border rounded-md p-2 w-full h-24 focus:outline-none focus:ring focus:border-blue-300"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
            clearError();
          }}
          
        ></textarea>
        <div className="flex justify-between gap-2">
          <button
            type="button"
            onClick={focusTextarea}
            className="mt-4 bg-blue-400 text-white px-4 py-2 rounded-md"
          >
            Add Comment
          </button>
          <button
            type="button"
            onClick={() => setShowAttachment(!showAttachment)}
            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-md"
          >
            Add Attachment
          </button>
        </div>

        {showAttachment && (
          <div className="mt-4">
            <label
              htmlFor="pdf"
              className="block text-sm font-medium text-gray-700"
            >
              Attach PDF (optional, max 4MB)
            </label>
            <input
              type="file"
              id="pdf"
              name="pdf"
              accept=".pdf"
              onChange={handleFileChange}
              className="mt-1 py-2"
            />
          </div>
        )}

        <button
          type="button"
          onClick={submitForm}
          className={`mt-4 bg-green-500 text-white px-4 py-2 rounded-md ml-2 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </>
  );
};

export default CommentForm;
