import React, { useState, useEffect } from "react";

const Comment = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(
        `http://localhost:4000/post/${postId}/comments`
      );
      const data = await response.json();
      setComments(data);
    };
    fetchComments();
  }, [postId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(
      `http://localhost:4000/post/${postId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newComment }), // Changed "comment" to "text"
        credentials: "include", // include cookies in the request
      }
    );
    const data = await response.json();
    setComments([...comments, data]);
    setNewComment("");
  };

  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.body}</li> // Changed "comment.comment" to "comment.body"
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <label>
          New comment:
          <input
            type="text"
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Comment;
