import React, { useState } from "react";
import Main from "../ui/Main";
import Content from "../ui/Content";
import Stats from "../components/stats/Stats";
import Icon from "../components/socials/Icon";
import Profile from "../components/profle/Profile";
import Top from "../components/header/Top";
import SideBar from "../components/sideBar/SideBar";
import Social from "../components/Media/Social";

const Dashboard = () => {
  const [isSideBarOpen, setIssideBarOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState("ALL");

  const toggleSideBar = () => {
    setIssideBarOpen(!isSideBarOpen);
  };

  return (
    <div className="font-sans">
      <Top toggleSideBar={toggleSideBar} />
      <SideBar isSideBarOpen={isSideBarOpen} />

      <Main>
        <Content>
          <Stats />
          {/* Pass selected and setter for platform */}
          <Social selected={selectedPlatform} setSelected={setSelectedPlatform} />
          <div className="flex flex-col gap-3 lg:flex-row">
            {/* Pass platform to Icon */}
            <Icon platform={selectedPlatform} />
          </div>
        </Content>
        <Profile platform={selectedPlatform} />
      </Main>
    </div>
  );
};

export default Dashboard;
