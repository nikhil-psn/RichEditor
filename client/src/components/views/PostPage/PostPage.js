import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Icon, Avatar, Col, Typography } from "antd";
const { Title } = Typography;

function PostPage(props) {
  const [post, setPost] = useState([]);
  const postId = props.match.params.postId;

  useEffect(() => {
    const variable = { postId: postId };
    console.log("getting the post with id" + postId);
    axios.post("/api/blog/getPost", variable).then((response) => {
      if (response.data.success) {
        console.log(response.data.post);
        setPost(response.data.post);
      } else {
        alert("Couldnt get post");
      }
    });
  }, []);

  if (post.content) {
    return (
      <div
        className="postPage"
        style={{
          width: "80%",
          margin: "3rem auto",
          //   borderStyle: "solid",
          //   padding: "5px",
        }}
      >
        <Title level={2}>{post.title}</Title>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Title level={4}>{post.createdAt}</Title>
        </div>
        <br />
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    );
  } else {
    return <div style={{ width: "80%", margin: "3rem auto" }}>loading...</div>;
  }
}

export default PostPage;
