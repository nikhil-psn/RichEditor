import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Icon, Avatar, Col, Typography, Row } from "antd";
import {
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  CardContent,
  CardHeader,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import { bounce } from "react-animations";
// import styled, { keyframes } from "styled-components";
import Radium, { StyleRoot } from "radium";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
// import InfoIcon from "@material-ui/icons/Info";
// import tileData from "./tileData";
const { Title } = Typography;
const { Meta } = Card;

const styles = {
  bounce: {
    animation: "x 2s",
    animationName: Radium.keyframes(bounce, "bounce"),
  },
};

// const Bounce = styled.div`
//   animation: 2s ${keyframes`${bounce}`} infinite;
// `;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

// function deletePost() {
//   axios.delete("/api/blog/deletePost").then((response) => {
//     if (response.data.success) {
//       console.log(response.data.blogs);
//       alert("Deleted this blog");
//       //   setBlogs(response.data.blogs);
//     } else {
//       alert("Couldn't delete this blog");
//     }
//   });
// }

function TilesPage(props) {
  //   const [blogs, setBlogs] = useState([]);

  //   useEffect(() => {
  //     axios.get("/api/blog/getBlogs").then((response) => {
  //       if (response.data.success) {
  //         console.log(response.data.blogs);
  //         setBlogs(response.data.blogs);
  //       } else {
  //         alert("Couldnt get blog`s lists");
  //       }
  //     });
  //   }, []);

  let index = 1;

  const classes = useStyles();

  return (
    <div className={classes.root} style={{ backgroundColor: "#d1e0e0" }}>
      <div style={{ margin: "10px" }}>
        <StyleRoot>
          <div className="test" style={styles.bounce}>
            <h1>Types of blogs</h1>
          </div>
        </StyleRoot>
        <GridList
          cellHeight={180}
          className={classes.gridList}
          justify="center"
          alignItems="center"
        >
          <GridListTile onClick={() => props.history.push("/projects")}>
            <img
              src="https://analyticsindiamag.com/wp-content/uploads/2020/01/top-10-DS-projects.png"
              alt="Title since image not found"
            />
            <GridListTileBar
              title="Projects"
              subtitle={<span>we did</span>}
              actionIcon={
                <IconButton
                  aria-label={`info about Title`}
                  // className={classes.icon}
                ></IconButton>
              }
            />
          </GridListTile>

          <GridListTile onClick={() => props.history.push("/finance")}>
            <img
              src="https://mba.uconn.edu/wp-content/uploads/sites/309/2015/12/feature_finance-concentration.jpg"
              alt="Title since image not found"
            />
            <GridListTileBar
              title="Finance"
              subtitle={<span></span>}
              actionIcon={
                <IconButton
                  aria-label={`info about Finance`}
                  // className={classes.icon}
                ></IconButton>
              }
            />
          </GridListTile>

          <GridListTile onClick={() => props.history.push("/news")}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQQZpG_FVVpqtiJ6WhPNg5pWqdpdWCm2xgBHQ&usqp=CAU"
              alt="Title since image not found"
            />
            <GridListTileBar
              title="News"
              subtitle={<span>that matter</span>}
              actionIcon={
                <IconButton
                  aria-label={`info about Title`}
                  // className={classes.icon}
                ></IconButton>
              }
            />
          </GridListTile>

          <GridListTile onClick={() => props.history.push("/technology")}>
            <img
              src="data:image/jpeg;base64,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"
              alt="Title since image not found"
            />
            <GridListTileBar
              title="Technology"
              subtitle={<span>thats changing</span>}
              actionIcon={
                <IconButton
                  aria-label={`info about Title`}
                  // className={classes.icon}
                ></IconButton>
              }
            />
          </GridListTile>
        </GridList>
      </div>
    </div>
  );
}

export default TilesPage;
