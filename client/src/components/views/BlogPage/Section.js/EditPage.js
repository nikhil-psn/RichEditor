import React, { useEffect, useState } from "react";

import QuillEditor from "../../../editor/QuillEditor";
import { Typography, Button, Form, message } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";

const { Title } = Typography;

function EditPage(props) {
  const user = useSelector((state) => state.user);
  const postId = props.match.params.postId;

  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const variable = { postId: postId };
    // console.log("Editing the post " + postId);
    axios.post("/api/blog/getPost", variable).then((response) => {
      if (response.data.success) {
        // setContent(response.data.post.content);
        // setContent("This is the body");
        // quill.root.innerHTML = response.data.post.content;
        // console.log("the quill is : " + quill);
        onEditorChange(response.data.post.content);
        console.log(content);
        console.log(response.data.post.content);
      } else {
        alert("Couldnt get post");
      }
    });
  }, []);

  const onEditorChange = (value) => {
    setContent(value);
    console.log(content);
  };

  const onFilesChange = (files) => {
    setFiles(files);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    setContent("");

    if (user.userData && !user.userData.isAuth) {
      return alert("Please Log in first");
    }

    const variables = {
      content: content,
      userID: user.userData._id,
    };

    axios.post("/api/blog/updatePost", variables).then((response) => {
      if (response) {
        message.success("Post Updated!");

        setTimeout(() => {
          props.history.push("/blog");
        }, 2000);
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <Title level={2}> Editor</Title>
      </div>
      <QuillEditor
        id="editor"
        // placeholder={"Start Posting Something"}
        onEditorChange={onEditorChange}
        onFilesChange={onFilesChange}
      />

      <Form onSubmit={onSubmit}>
        <div style={{ textAlign: "center", margin: "2rem" }}>
          <Button
            size="large"
            htmlType="submit"
            className=""
            onSubmit={onSubmit}
          >
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default EditPage;
