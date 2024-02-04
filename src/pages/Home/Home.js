import React from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <Header />
      <Content />
    </div>
  );
}

export default Home;
