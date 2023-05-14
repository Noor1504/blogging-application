import { useState } from "react";
import { Navigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import Editor from "../Editor";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");

  const [redirect, setRedirect] = useState(false);

  async function createNewpost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.append("file", files[0]);

    const response = await fetch("http://localhost:4000/post", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      //redirect to homepage
      setRedirect(true);
    }
  }
  if (redirect) return <Navigate to={"/"} />;
  return (
    <form onSubmit={createNewpost}>
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
      {/* <textarea name="" id="" cols="50" rows="10"></textarea> */}
      <Editor onChange={setContent} value={content}></Editor>

      <button style={{ marginTop: "5px" }}>Create Post</button>
    </form>
  );
}
