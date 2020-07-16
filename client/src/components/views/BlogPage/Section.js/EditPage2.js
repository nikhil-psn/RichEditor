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

  useEffect(() => {
    const variable = { postId: postId };

    axios.post("/api/blog/getPost", variable).then((response) => {
      if (response.data.success) {
        console.log("the fetched contents are : " + response.data.post.content);
        setPost(response.data.post);
        setTitle(response.data.post.title);
        setType(response.data.post.type);
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
      // console.log(content)
    };

    const onFilesChange = (files) => {
      setFiles(files);
    };

    const handleChangeTitle = (event) => {
      setTitle(event.target.value);
      console.log("title is :" + title);
      // this.setState({
      //   value: event.target.value,
      // });
    };

    const handleChangeType = (event) => {
      setType(event.target.value);
      console.log("type is :" + type);
      // this.setState({
      //   value: event.target.value,
      // });
    };

    const onSubmit = (event) => {
      event.preventDefault();

      console.log("content getting saved is :" + content);

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
        const variables = {
          postId: postId,
          content: content,
          title: title,
          type: type,
        };

        axios.patch("/api/blog/editPost", variables).then((response) => {
          if (response) {
            message.success("PostUpdated!");

            setTimeout(() => {
              props.history.push("/blog");
            }, 2000);
          }
        });
      }
    };

    // if (post.title == "Finance") {
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
    // } else if (post.title == "News") {
    //   return (
    //     <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
    //       <div style={{ textAlign: "center" }}>
    //         <Title level={2}> Title</Title>
    //         <TextField
    //           value={title}
    //           onChange={handleChange}
    //           type="text"
    //           id="title"
    //           name="title"
    //         />
    //         <Title level={2}> Type</Title>
    //         <select id="type">
    //           <option value="Finance">Finance</option>
    //           <option value="News" selected>
    //             News
    //           </option>
    //           <option value="Projects">Projects</option>
    //           <option value="Technology">Technology</option>
    //         </select>
    //         <Title level={2}> Body</Title>
    //       </div>

    //       <QuillEditor
    //         placeholder={"Start Posting Something"}
    //         onEditorChange={onEditorChange}
    //         onFilesChange={onFilesChange}
    //         onFirstRender={onFirstRender}
    //       />

    //       <Form onSubmit={onSubmit}>
    //         <div style={{ textAlign: "center", margin: "2rem" }}>
    //           <Button
    //             size="large"
    //             htmlType="submit"
    //             className=""
    //             onSubmit={onSubmit}
    //           >
    //             Submit
    //           </Button>
    //         </div>
    //       </Form>
    //     </div>
    //   );
    // } else if (post.title == "Projects") {
    //   return (
    //     <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
    //       <div style={{ textAlign: "center" }}>
    //         <Title level={2}> Title</Title>
    //         <TextField
    //           value={title}
    //           onChange={handleChange}
    //           type="text"
    //           id="title"
    //           name="title"
    //         />
    //         <Title level={2}> Type</Title>
    //         <select id="type">
    //           <option value="Finance">Finance</option>
    //           <option value="News">News</option>
    //           <option value="Projects" selected>
    //             Projects
    //           </option>
    //           <option value="Technology">Technology</option>
    //         </select>
    //         <Title level={2}> Body</Title>
    //       </div>

    //       <QuillEditor
    //         placeholder={"Start Posting Something"}
    //         onEditorChange={onEditorChange}
    //         onFilesChange={onFilesChange}
    //         onFirstRender={onFirstRender}
    //       />

    //       <Form onSubmit={onSubmit}>
    //         <div style={{ textAlign: "center", margin: "2rem" }}>
    //           <Button
    //             size="large"
    //             htmlType="submit"
    //             className=""
    //             onSubmit={onSubmit}
    //           >
    //             Submit
    //           </Button>
    //         </div>
    //       </Form>
    //     </div>
    //   );
    // } else if (post.title == "Projects") {
    //   return (
    //     <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
    //       <div style={{ textAlign: "center" }}>
    //         <Title level={2}> Title</Title>
    //         <TextField
    //           value={title}
    //           onChange={handleChange}
    //           type="text"
    //           id="title"
    //           name="title"
    //         />
    //         <Title level={2}> Type</Title>
    //         <select id="type">
    //           <option value="Finance">Finance</option>
    //           <option value="News">News</option>
    //           <option value="Projects">Projects</option>
    //           <option value="Technology" selected>
    //             Technology
    //           </option>
    //         </select>
    //         <Title level={2}> Body</Title>
    //       </div>

    //       <QuillEditor
    //         placeholder={"Start Posting Something"}
    //         onEditorChange={onEditorChange}
    //         onFilesChange={onFilesChange}
    //         onFirstRender={onFirstRender}
    //       />

    //       <Form onSubmit={onSubmit}>
    //         <div style={{ textAlign: "center", margin: "2rem" }}>
    //           <Button
    //             size="large"
    //             htmlType="submit"
    //             className=""
    //             onSubmit={onSubmit}
    //           >
    //             Submit
    //           </Button>
    //         </div>
    //       </Form>
    //     </div>
    //   );
    // }
  } else {
    return <div style={{ width: "80%", margin: "3rem auto" }}>loading...</div>;
  }
}

export default EditPage;
