import { useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Comment from "./Comment";

export default function PostPage() {
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:4000/post/" + id).then((res) => {
      res.json().then((mypostInfo) => {
        setPostInfo(mypostInfo);
      });
    });
  }, []);

  const handleDelete = async (ev) => {
    ev.preventDefault();
    const confirmed = window.confirm(
      "Are you sure that you want to delete this post"
    );
    if (confirmed) {
      const response = await fetch("http://localhost:4000/post/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        // post was successfully deleted
        alert("Post deleted successfully");
        navigate("/");
      } else {
        // there was an error deleting the post
        console.error("Error deleting post:", response.status);
      }
    }
  };
  const navigate = useNavigate();
  return (
    <div>
      {postInfo ? (
        <div>
          <div className="post-page">
            <h1>{postInfo.title}</h1>
            <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
            <div className="author">by @{postInfo.author.username}</div>
            {userInfo.id === postInfo.author._id && (
              <div className="edit-row">
                <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                  Edit this post
                </Link>
                <Link className="edit-btn" onClick={handleDelete}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 6L18 18M6 18l12-12"
                    />
                  </svg>
                  Delete this post
                </Link>
              </div>
            )}
            <div className="image">
              <img
                src={`http://localhost:4000/${postInfo.cover}`}
                alt="no image found"
              ></img>
            </div>

            <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
          </div>
          <hr></hr>
          <Comment postId={id} />
        </div>
      ) : (
        <div>No info received</div>
      )}
    </div>
  );
}
