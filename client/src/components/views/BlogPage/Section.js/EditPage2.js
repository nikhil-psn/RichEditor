import React, { useEffect, useState } from "react";
import { TextField } from "@material-ui/core";
import QuillEditor from "../../../editor/QuillEditor2";
import { Typography, Button, Form, message } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";

const { Title } = Typography;

function EditPage(props) {
  const user = useSelector((state) => state.user);
  const [content, setContent] = useState([]);
  const [files, setFiles] = useState([]);
  const [post, setPost] = useState([]);
  const postId = props.match.params.postId;
  const [title, setTitle] = useState([]);
  const [type, setType] = useState([]);
  const [featureImage, setFeatureImage] = useState([]);

  useEffect(() => {
    const variable = { postId: postId };
    if (title.toString.length < 1) {
      console.log("title is null");
    } else {
      console.log("title is not null");
    }
    console.log("title is:" + title);

    axios.post("/api/blog/getPost", variable).then((response) => {
      if (response.data.success) {
        setTitle(response.data.post.title);
        setType(response.data.post.type);
        setContent(response.data.post.content);
        setFeatureImage(response.data.post.featureImage);
        setPost(response.data.post);
      } else {
        alert("Couldnt get post");
      }
    });
  }, []);

  if (post.content) {
    const onFirstRender = post.content;
    console.log("the added contents are " + onFirstRender);

    const onEditorChange = (value) => {
      setContent(value);
    };

    const onFilesChange = (files) => {
      setFiles(files);
    };

    const handleChangeTitle = (event) => {
      setTitle(event.target.value);
      console.log("title is :" + title);
    };

    const handleChangeType = (event) => {
      setType(event.target.value);
      console.log("type is :" + type);
    };

    const onSubmit = (event) => {
      event.preventDefault();

      console.log("content getting saved is :" + content);
      console.log("title getting saved is :" + title);
      console.log("type getting saved is :" + type);
      console.log("featureimage getting saved is :" + featureImage);

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
      } else {
        if (document.getElementById("blogimage").files[0] != null) {
          let formData = new FormData();
          const config = {
            header: { "content-type": "multipart/form-data" },
          };
          formData.append(
            "file",
            document.getElementById("blogimage").files[0]
          );
          axios
            .post("/api/blog/uploadfiles", formData, config)
            .then((response) => {
              if (response.data.success) {
                console.log(
                  "uploaded successfully :: " +
                    "http://localhost:5000/" +
                    response.data.url
                );
                setFeatureImage("http://localhost:5000/" + response.data.url);

                const variables = {
                  postId: postId,
                  content: content,
                  description: content.substring(0, 30).toString() + "...",
                  title: title,
                  type: type,
                  featureImage: "http://localhost:5000/" + response.data.url,
                  claps: post.claps,
                  comments: post.comments,
                };
                axios
                  .patch("/api/blog/editPost", variables)
                  .then((response) => {
                    if (response) {
                      message.success("PostUpdated!");

                      setTimeout(() => {
                        props.history.push("/blog");
                      }, 500);
                    }
                  });
              }
            });
        } else {
          console.log("the feature image is not changed : " + featureImage);
          const variables = {
            postId: postId,
            content: content,
            description: content.substring(0, 30).toString() + "...",
            title: title,
            type: type,
            featureImage: featureImage,
            claps: post.claps,
            comments: post.comments,
          };
          axios.patch("/api/blog/editPost", variables).then((response) => {
            if (response) {
              message.success("PostUpdated!");

              setTimeout(() => {
                props.history.push("/blog");
              }, 500);
            }
          });
        }
      }
    };

    return (
      <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
        <div style={{ textAlign: "center" }}>
          <Title level={2}> Title</Title>
          <TextField
            value={title}
            onChange={handleChangeTitle}
            type="text"
            id="title"
            name="title"
          />
          <Title level={2}> Type</Title>
          <TextField
            value={type}
            onChange={handleChangeType}
            type="text"
            id="type"
            name="type"
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
            <img src={featureImage} alt="No feature image found"></img>
            <br />
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
  } else {
    return <div style={{ width: "80%", margin: "3rem auto" }}>loading...</div>;
  }
}

export default EditPage;
