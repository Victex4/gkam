import ShortCut from "./ShortCut";
import Task from "./Task";
import User from "./User";

const Profile = ({ platform }) => {
  return (
    <div className="px-3 py-4 bg-[#FFE6FE] mt-3 rounded-lg w-full lg:w-60 xl:w-[35%] flex flex-col justify-between gap-4">
      <User />
      <Task />
      <ShortCut platform={platform} />
    </div>
  );
};

export default Profile;
