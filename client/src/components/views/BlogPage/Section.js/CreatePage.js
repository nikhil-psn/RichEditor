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
    console.log("the event is : " + event);
    event.preventDefault();
    const type = document.getElementById("type").value;
    if (user.userData && !user.userData.isAuth) {
      return alert("Please Log in first");
    } else if (
      !(
        type == "Finance" ||
        type == "News" ||
        type == "Projects" ||
        type == "Technology"
      )
    ) {
      alert("Type can only be Finance or News or Projects or Technology");
    } else if (document.getElementById("blogimage").files[0] == null) {
      return alert("Please add a feature image");
    } else {
      let formData = new FormData();
      const config = {
        header: { "content-type": "multipart/form-data" },
      };
      var featureImage;
      formData.append("file", document.getElementById("blogimage").files[0]);
      axios.post("/api/blog/uploadfiles", formData, config).then((response) => {
        if (response.data.success) {
          console.log("uploaded successfully");
          featureImage = "http://localhost:5000/" + response.data.url;
          console.log("feature image is : " + featureImage);
          console.log("feature image sending is : " + featureImage);
          const variables = {
            content: content,
            // userID: user.userData._id,
            title: document.getElementById("title").value,
            description: content.substring(0, 30).toString() + "...",
            type: document.getElementById("type").value,
            featureImage: featureImage,
            claps: 0,
            comments: [],
          };
          console.log("the variables are : ");
          console.log(variables);
          axios.post("/api/blog/createPost", variables).then((response) => {
            if (response) {
              console.log("feature image added is : " + variables.featureImage);
              message.success("Post Created Successfully!");
              setContent("");
              setTimeout(() => {
                props.history.push("/blog");
              }, 500);
            }
          });
        } else {
          console.log("upload failed");
        }
      });
    }
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
        <Title level={2}> Type</Title>
        <TextField
          type="text"
          id="type"
          name="type"
          placeholder="Enter the blog's type here"
        />
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
          <Title level={2}> Feature Image</Title>
          <input type="file" name="blogimage" id="blogimage" />
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
