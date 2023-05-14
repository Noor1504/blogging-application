import Editor from "../Editor";
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [cover, setCover] = useState("");

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/post/" + id).then((response) => {
      response.json().then((postInfo) => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
        setCover(postInfo.cover);
      });
    });
  }, []);

  async function updatePost(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.append("title", title);
    data.append("summary", summary);
    data.append("content", content);
    data.append("id", id);
    if (files && files[0]) {
      data.append("file", files[0]);
    }

    try {
      const response = await fetch(`http://localhost:4000/post`, {
        method: "PUT",
        body: data,
        credentials: "include",
      });
      if (response.ok) setRedirect(true);
    } catch (error) {
      console.error(error);
    }
  }

  if (redirect) return <Navigate to={"/post/" + id} />;

  return (
    <form onSubmit={updatePost}>
      <input
        type="title"
        placeholder={"Title"}
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      ></input>
      <input
        type="summary"
        placeholder={"Summary"}
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      ></input>
      <input type="file" onChange={(ev) => setFiles(ev.target.files)}></input>
      <Editor onChange={setContent} value={content}></Editor>
      <button style={{ marginTop: "5px" }}>Update Post</button>
    </form>
  );
}
