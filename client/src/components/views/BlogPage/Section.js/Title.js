import React, { useEffect, useState } from "react";
import { TextField } from "@material-ui/core";
import { Typography, Button, Form, message } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import TitlePage from "Title";

const { Title } = Typography;

function EditPage(props) {
  const user = useSelector((state) => state.user);
  const [content, setContent] = useState([]);
  const [files, setFiles] = useState([]);
  const [post, setPost] = useState([]);
  const postId = props.match.params.postId;
  const [title, setTitle] = useState([]);

  useEffect(() => {
    const variable = { postId: postId };
    // document.getElementById("title").value;
    // document.getElementById("type").value;

    axios.post("/api/blog/getPost", variable).then((response) => {
      if (response.data.success) {
        setPost(response.data.post);
        setTitle(response.data.post.title);
      } else {
        alert("Couldnt get post");
      }
    });
  }, []);

  if (post.content) {
    const onFirstRender = post.content;
    console.log(onFirstRender);
    // this.refs.title.getInputNode().value = "some value, hooray";
    const onEditorChange = (value) => {
      setContent(value);
      // console.log(content)
      setTitle(post.title);
    };

    const onFilesChange = (files) => {
      setFiles(files);
    };

    const handleChange = (event) => {
      setTitle(event.target.value);
      console.log("title is :" + title);
      // this.setState({
      //   value: event.target.value,
      // });
    };

    const onSubmit = (event) => {
      event.preventDefault();

      setContent("");

      if (user.userData && !user.userData.isAuth) {
        return alert("Please Log in first");
      }

      const variables = {
        content: content,
        title: title,
        type: "Technology",
        postId: postId,
      };

      axios.patch("/api/blog/editPost", variables).then((response) => {
        if (response) {
          message.success("PostUpdated!");

          setTimeout(() => {
            props.history.push("/blog");
          }, 2000);
        }
      });
    };

    return (
      <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
        <TitlePage />
        <div style={{ textAlign: "center" }}>
          <Title level={2}> Title</Title>
          <TextField
            value={title}
            onChange={handleChange}
            type="text"
            id="title"
            name="title"
          />
          <Title level={2}> Type</Title>
          <select id="type">
            <option value="Finance">Finance</option>
            <option value="News">News</option>
            <option value="Projects">Projects</option>
            <option value="Technology">Technology</option>
          </select>
          <Title level={2}> Body</Title>
        </div>
      </div>
    );
  } else {
    return <div style={{ width: "80%", margin: "3rem auto" }}>loading...</div>;
  }
}

export default TitlePage;
