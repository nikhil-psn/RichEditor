import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";

import PostPage from "./views/PostPage/PostPage";
import BlogPage from "./views/BlogPage/BlogPage";
import FinancePage from "./views/BlogPage/FinancePage";
import ProjectsPage from "./views/BlogPage/ProjectsPage";
import NewsPage from "./views/BlogPage/NewsPage";
import TechnologyPage from "./views/BlogPage/TechnologyPage";
import TilesPage from "./views/BlogPage/TilesPage";
import CreateBlogPage from "./views/BlogPage/Section.js/CreatePage";
import EditBlogPage from "./views/BlogPage/Section.js/EditPage2";
import DeleteBlogPage from "./views/BlogPage/Section.js/DeletePage";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/blog" component={Auth(BlogPage, null)} />
          <Route exact path="/finance" component={Auth(FinancePage, null)} />
          <Route exact path="/projects" component={Auth(ProjectsPage, null)} />
          <Route
            exact
            path="/technology"
            component={Auth(TechnologyPage, null)}
          />
          <Route exact path="/news" component={Auth(NewsPage, null)} />
          <Route exact path="/tiles" component={Auth(TilesPage, null)} />
          <Route
            exact
            path="/blog/create"
            component={Auth(CreateBlogPage, null)}
          />
          <Route
            exact
            path="/blog/edit/:postId"
            component={Auth(EditBlogPage, null)}
          />
          <Route
            exact
            path="/blog/delete/:postId"
            component={Auth(DeleteBlogPage, null)}
          />
          <Route
            exact
            path="/blog/post/:postId"
            component={Auth(PostPage, null)}
          />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
