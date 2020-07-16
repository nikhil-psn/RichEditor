import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Icon, Avatar, Col, Typography } from "antd";
import { Button, Form, message } from "antd";
const { Title } = Typography;

function DeletePage(props) {
  const [post, setPost] = useState([]);
  const postId = props.match.params.postId;

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.userData && !user.userData.isAuth) {
      return alert("Please Log in first");
    }

    const variable = { postId: postId };
    console.log("deleting the post with id" + postId);
    axios.delete("/api/blog/deletePost/" + postId).then((response) => {
      if (response.data.success) {
        // console.log(response.data.post);
        message.success("Post Deleted Successfully!");
        // setPost(response.data.post);
        props.history.push("/blog");
      } else {
        alert("Couldn't delete post");
        props.history.push("/blog");
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
        {/* <Title level={2}>{post.title}</Title>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Title level={4}>{post.createdAt}</Title>
        </div>
        <br />
        <div dangerouslySetInnerHTML={{ __html: post.content }} /> */}
      </div>
    );
  } else {
    return (
      <div style={{ width: "80%", margin: "3rem auto" }}>
        Deleting the post...
      </div>
    );
  }
}

export default DeletePage;
