import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography } from "antd";
import { Button, message } from "antd";
import { colors } from "@material-ui/core";
const { Title } = Typography;

function DeletePage(props) {
  const [post, setPost] = useState([]);
  const postId = props.match.params.postId;
  const user = useSelector((state) => state.user);

  const yes = (event) => {
    event.preventDefault();
    if (user.userData && !user.userData.isAuth) {
      return alert("Please Log in first");
    } else {
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
    }
  };

  const no = (event) => {
    event.preventDefault();
    const variable = { postId: postId };
    props.history.push("/blog");
  };

  return (
    <div
      className="postPage"
      style={{
        width: "80%",
        margin: "3rem auto",
      }}
    >
      <div style={{ textAlign: "center", margin: "2rem" }}>
        <Title level={2}>Are you sure you want to delete this post?</Title>
        <br />
        <Button
          size="large"
          htmlType="submit"
          style={{ background: "#A9DFBF", borderColor: "green" }}
          className=""
          onClick={yes}
        >
          Yes, Delete
        </Button>{" "}
        <Button
          size="large"
          htmlType="submit"
          style={{ background: "#E6B0AA", borderColor: "red" }}
          className=""
          onClick={no}
        >
          No, Don't Delete
        </Button>
      </div>
    </div>
  );
}

export default DeletePage;
