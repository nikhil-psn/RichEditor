import React, { useEffect, useState } from "react";
import { TextField } from "@material-ui/core";
import QuillEditor from "../../../editor/QuillEditor2";
import { Typography, Button, Form, message } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";

const { Title } = Typography;

function CreatePage(props) {
  const user = useSelector((state) => state.user);

  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);

  const onFirstRender = "";

  const onEditorChange = (value) => {
    setContent(value);
    console.log(content);
  };

  const onFilesChange = (files) => {
    setFiles(files);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    // console.log("The title is : " + document.getElementById("title").value);
    // console.log("The type is : " + document.getElementById("type").value);
    setContent("");
    if (user.userData && !user.userData.isAuth) {
      return alert("Please Log in first");
    }

    const variables = {
      content: content,
      userID: user.userData._id,
      title: document.getElementById("title").value,
      type: document.getElementById("type").value,
    };

    axios.post("/api/blog/createPost", variables).then((response) => {
      if (response) {
        message.success("Post Created Successfully!");

        setTimeout(() => {
          props.history.push("/blog");
        }, 1000);
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <Title level={2}> Title</Title>
        <TextField
          type="text"
          id="title"
          name="title"
          placeholder="Enter the blog's title here"
        />
        {/* <input type="text" id="title" name="type" size="100"></input> */}
        <Title level={2}> Type</Title>
        <TextField
          type="text"
          id="type"
          name="type"
          placeholder="Enter the blog's type here"
        />
        {/* <select id="type">
          <option value="Finance">Finance</option>
          <option value="News">News</option>
          <option value="Projects">Projects</option>
          <option value="Technology">Technology</option>
        </select> */}
        <Title level={2}> Body</Title>
      </div>
      <QuillEditor
        placeholder={"The body of the blog goes here"}
        onEditorChange={onEditorChange}
        onFilesChange={onFilesChange}
        onFirstRender={onFirstRender}
      />

      <Form onSubmit={onSubmit}>
        <div style={{ textAlign: "center", margin: "2rem" }}>
          <Button
            size="large"
            htmlType="submit"
            className=""
            onSubmit={onSubmit}
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreatePage;
