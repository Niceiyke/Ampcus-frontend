import React, { useState } from 'react';

interface CommentFormProps {
  // Add any additional props if needed
}

const CommentForm: React.FC<CommentFormProps> = () => {
  const [comment, setComment] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [showAttachment, setShowAttachment] = useState<boolean>(false);

  const focusTextarea = (): void => {
    // Set focus on the textarea
    const textarea = document.getElementById('comment') as HTMLTextAreaElement | null;
    if (textarea) {
      textarea.focus();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = event.target.files && event.target.files[0];

    // Check if the selected file is a PDF and its size is within the limit
    if (selectedFile && selectedFile.type === 'application/pdf' && selectedFile.size <= 4 * 1024 * 1024) {
      setFile(selectedFile);
    } else {
      // Reset file and show an error message if the file is not valid
      setFile(null);
      alert('Please select a valid PDF file (max 4MB).');
    }
  };

  const submitForm = (): void => {
    // Example API endpoint (replace with your actual API endpoint)
    const apiEndpoint = 'https://example.com/api/submit';

    // Prepare form data
    const formData = new FormData();
    formData.append('comment', comment);
    if (file) {
      formData.append('pdf', file);
    }

    // Perform the API request (you might want to use a library like axios for this)
    fetch(apiEndpoint, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log('API response:', data);
        // Handle the API response as needed
      })
      .catch(error => {
        console.error('Error submitting form:', error);
        // Handle errors
      });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <textarea
        name="comments"
        id="comment"
        placeholder="My comments"
        className="resize-none border rounded-md p-2 w-full h-24 focus:outline-none focus:ring focus:border-blue-300"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>

      <button
        type="button"
        onClick={() => setShowAttachment(!showAttachment)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Add Attachment
      </button>

      {showAttachment && (
        <div className="mt-4">
          <label htmlFor="pdf" className="block text-sm font-medium text-gray-700">
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
        onClick={focusTextarea}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md"
      >
        Add Comment
      </button>

      <button
        type="button"
        onClick={submitForm}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md ml-2"
      >
        Submit
      </button>
    </div>
  );
};

export default CommentForm;