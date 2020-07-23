import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Icon, Avatar, Col, Typography, Row } from "antd";

const { Title } = Typography;
const { Meta } = Card;

function deletePost() {
  axios.delete("/api/blog/deletePost").then((response) => {
    if (response.data.success) {
      console.log(response.data.blogs);
      alert("Deleted this blog");
    } else {
      alert("Couldn't delete this blog");
    }
  });
}

function BlogPage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get("/api/blog/getBlogs").then((response) => {
      if (response.data.success) {
        console.log(response.data.blogs);
        setBlogs(response.data.blogs);
      } else {
        alert("Couldnt get blog`s lists");
      }
    });
  }, []);

  const renderCards = blogs.map((blog, index) => {
    return (
      <Col key={index} lg={8} md={12} xs={24}>
        <Card
          hoverable
          style={{ width: 370, marginTop: 16 }}
          actions={[
            <a href={`/blog/delete/${blog._id}`}>
              <Icon type="delete" key="delete" />{" "}
            </a>,
            <a href={`/blog/edit/${blog._id}`}>
              <Icon type="edit" key="edit" />
            </a>,
            <a href={`/blog/post/${blog._id}`}>
              {" "}
              <Icon type="ellipsis" key="ellipsis" />
            </a>,
          ]}
        >
          <Meta
            title={blog.title}
            avatar={<Avatar shape="square" src={blog.featureImage} size={50} />}
          />
          <div style={{ height: 150, overflowY: "scroll", marginTop: 10 }}>
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>
        </Card>
      </Col>
    );
  });

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title level={2}> Blogs List </Title>
      <Row gutter={[32, 16]}>{renderCards}</Row>
    </div>
  );
}

export default BlogPage;
