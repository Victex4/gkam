import React from "react";
import Name from "./Name";

const Icon = ({ platform }) => {
  return (
    <div className="bg-[#FFE6FE] p-5 rounded-2xl flex-1 flex-col gap-5 md:ml-4 flex shadow-[0_4px_8px_rgba(0,0,0,0.1)]">
      {/* Pass platform prop to Name */}
      <Name platform={platform} />
    </div>
  );
};

export default Icon;
