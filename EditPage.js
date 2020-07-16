// import React, { useEffect, useState } from "react";
// import { TextField } from "@material-ui/core";
// import QuillEditor from "../../../editor/QuillEditor2";
// import { Typography, Button, Form, message } from "antd";
// import axios from "axios";
// import { useSelector } from "react-redux";

// const { Title } = Typography;

// function EditPage(props) {
//   const user = useSelector((state) => state.user);
//   const [content, setContent] = useState([]);
//   const [files, setFiles] = useState([]);
//   const [post, setPost] = useState([]);
//   const postId = props.match.params.postId;
//   const [title, setTitle] = useState([]);

//   useEffect(() => {
//     const variable = { postId: postId };

//     axios.post("/api/blog/getPost", variable).then((response) => {
//       if (response.data.success) {
//         console.log("Got the post " + postId);
//         setTitle(response.data.post.title);
//         setPost(response.data.post);
//       } else {
//         alert("Couldnt get post");
//       }
//     });
//   }, []);

//   if (post.content) {
//     const onFirstRender = post.content;
//     console.log(onFirstRender);

//     const onEditorChange = (value) => {
//       setContent(value);
//       // console.log(content)
//     };

//     const onFilesChange = (files) => {
//       setFiles(files);
//     };

//     const handleChange = (event) => {
//       setTitle(event.target.value);
//       console.log("title is :" + title);
//       // this.setState({
//       //   value: event.target.value,
//       // });
//     };

//     const onSubmit = (event) => {
//       event.preventDefault();

//       setContent("");

//       if (user.userData && !user.userData.isAuth) {
//         return alert("Please Log in first");
//       }

//       const variables = {
//         content: content,
//         title: title,
//         type: "Technology",
//         postId: postId,
//       };

//       axios
//         .patch("/api/blog/editPost/:" + postId, variables)
//         .then((response) => {
//           if (response) {
//             message.success("PostUpdated!");

//             setTimeout(() => {
//               props.history.push("/blog");
//             }, 2000);
//           }
//         });
//     };

//     if (post.title == "Finance") {
//       return (
//         <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
//           <div style={{ textAlign: "center" }}>
//             <Title level={2}> Title</Title>
//             <TextField
//               value={title}
//               onChange={handleChange}
//               type="text"
//               id="title"
//               name="title"
//             />
//             <Title level={2}> Type</Title>
//             <select id="type">
//               <option value="Finance" selected>
//                 Finance
//               </option>
//               <option value="News">News</option>
//               <option value="Projects">Projects</option>
//               <option value="Technology">Technology</option>
//             </select>
//             <Title level={2}> Body</Title>
//           </div>

//           <QuillEditor
//             placeholder={"Start Posting Something"}
//             onEditorChange={onEditorChange}
//             onFilesChange={onFilesChange}
//             onFirstRender={onFirstRender}
//           />

//           <Form onSubmit={onSubmit}>
//             <div style={{ textAlign: "center", margin: "2rem" }}>
//               <Button
//                 size="large"
//                 htmlType="submit"
//                 className=""
//                 onSubmit={onSubmit}
//               >
//                 Submit
//               </Button>
//             </div>
//           </Form>
//         </div>
//       );
//     } else if (post.title == "News") {
//       return (
//         <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
//           <div style={{ textAlign: "center" }}>
//             <Title level={2}> Title</Title>
//             <TextField
//               value={title}
//               onChange={handleChange}
//               type="text"
//               id="title"
//               name="title"
//             />
//             <Title level={2}> Type</Title>
//             <select id="type">
//               <option value="Finance">Finance</option>
//               <option value="News" selected>
//                 News
//               </option>
//               <option value="Projects">Projects</option>
//               <option value="Technology">Technology</option>
//             </select>
//             <Title level={2}> Body</Title>
//           </div>

//           <QuillEditor
//             placeholder={"Start Posting Something"}
//             onEditorChange={onEditorChange}
//             onFilesChange={onFilesChange}
//             onFirstRender={onFirstRender}
//           />

//           <Form onSubmit={onSubmit}>
//             <div style={{ textAlign: "center", margin: "2rem" }}>
//               <Button
//                 size="large"
//                 htmlType="submit"
//                 className=""
//                 onSubmit={onSubmit}
//               >
//                 Submit
//               </Button>
//             </div>
//           </Form>
//         </div>
//       );
//     } else if (post.title == "Projects") {
//       return (
//         <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
//           <div style={{ textAlign: "center" }}>
//             <Title level={2}> Title</Title>
//             <TextField
//               value={title}
//               onChange={handleChange}
//               type="text"
//               id="title"
//               name="title"
//             />
//             <Title level={2}> Type</Title>
//             <select id="type">
//               <option value="Finance">Finance</option>
//               <option value="News">News</option>
//               <option value="Projects" selected>
//                 Projects
//               </option>
//               <option value="Technology">Technology</option>
//             </select>
//             <Title level={2}> Body</Title>
//           </div>

//           <QuillEditor
//             placeholder={"Start Posting Something"}
//             onEditorChange={onEditorChange}
//             onFilesChange={onFilesChange}
//             onFirstRender={onFirstRender}
//           />

//           <Form onSubmit={onSubmit}>
//             <div style={{ textAlign: "center", margin: "2rem" }}>
//               <Button
//                 size="large"
//                 htmlType="submit"
//                 className=""
//                 onSubmit={onSubmit}
//               >
//                 Submit
//               </Button>
//             </div>
//           </Form>
//         </div>
//       );
//     } else if (post.title == "Projects") {
//       return (
//         <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
//           <div style={{ textAlign: "center" }}>
//             <Title level={2}> Title</Title>
//             <TextField
//               value={title}
//               onChange={handleChange}
//               type="text"
//               id="title"
//               name="title"
//             />
//             <Title level={2}> Type</Title>
//             <select id="type">
//               <option value="Finance">Finance</option>
//               <option value="News">News</option>
//               <option value="Projects">Projects</option>
//               <option value="Technology" selected>
//                 Technology
//               </option>
//             </select>
//             <Title level={2}> Body</Title>
//           </div>

//           <QuillEditor
//             placeholder={"Start Posting Something"}
//             onEditorChange={onEditorChange}
//             onFilesChange={onFilesChange}
//             onFirstRender={onFirstRender}
//           />

//           <Form onSubmit={onSubmit}>
//             <div style={{ textAlign: "center", margin: "2rem" }}>
//               <Button
//                 size="large"
//                 htmlType="submit"
//                 className=""
//                 onSubmit={onSubmit}
//               >
//                 Submit
//               </Button>
//             </div>
//           </Form>
//         </div>
//       );
//     }
//   } else {
//     return <div style={{ width: "80%", margin: "3rem auto" }}>loading...</div>;
//   }
// }

// export default EditPage;

// if (post.content) {
//     const onFirstRender = post.content;
//     console.log(onFirstRender);
//     const onEditorChange = (value) => {
//       setContent(value);
//       // console.log(content)
//     };

//     const onFilesChange = (files) => {
//       setFiles(files);
//     };

//     const onSubmit = (event) => {
//       event.preventDefault();

//       setContent("");

//       if (user.userData && !user.userData.isAuth) {
//         return alert("Please Log in first");
//       }

//       const variables = {
//         content: content,
//         userID: user.userData._id,
//       };

//       axios.post("/api/blog/createPost", variables).then((response) => {
//         if (response) {
//           message.success("Post Created!");

//           setTimeout(() => {
//             props.history.push("/blog");
//           }, 2000);
//         }
//       });
//     };

//     return (
//       <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
//         <div style={{ textAlign: "center" }}>
//           <Title level={2}> Editor</Title>
//         </div>

//         <QuillEditor
//           placeholder={"Start Posting Something"}
//           onEditorChange={onEditorChange}
//           onFilesChange={onFilesChange}
//           onFirstRender={onFirstRender}
//         />

//         <Form onSubmit={onSubmit}>
//           <div style={{ textAlign: "center", margin: "2rem" }}>
//             <Button
//               size="large"
//               htmlType="submit"
//               className=""
//               onSubmit={onSubmit}
//             >
//               Submit
//             </Button>
//           </div>
//         </Form>
//       </div>
//     );
//   } else {
//     return <div style={{ width: "80%", margin: "3rem auto" }}>loading...</div>;
//   }
// }

// export default EditPage;
