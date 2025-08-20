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
  const [logOutPopUp, setLogOutPopUp] = useState(false); // ✅ Add this!

  const user = JSON.parse(localStorage.getItem("user")); 

  const toggleSideBar = () => {
    setIssideBarOpen(!isSideBarOpen);
  };

  return (
    <div className="font-sans">
      <Top toggleSideBar={toggleSideBar} />

      <SideBar
        isSideBarOpen={isSideBarOpen}
        isAdmin={user?.role === "admin"}
        setLogOutPopUp={setLogOutPopUp} // ✅ Pass it here!
      />

      <Main>
        <Content>
          <Stats />
          <Social selected={selectedPlatform} setSelected={setSelectedPlatform} />
          <div className="flex flex-col gap-3 lg:flex-row">
            <Icon platform={selectedPlatform} />
          </div>
        </Content>
        <Profile platform={selectedPlatform} />
      </Main>

      {/* ✅ Always add your popup at the end! */}
      <logOutPopUp
        logOutPopUp={logOutPopUp}
        setLogOutPopUp={setLogOutPopUp}
      />
    </div>
  );
};

export default Dashboard;
