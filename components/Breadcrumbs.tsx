import React from "react";

const Breadcrumbs = ({
  title,
  breadcrumbs,
}: {
  title: string;
  breadcrumbs: string;
}) => {
  return (
    <div className="background-overlay  ">
      <div className="flex flex-col gap-2 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 items-center justify-center">
        {" "}
        <h1 className="text-[#0B1120] text-4xl font-bold ">{title}</h1>
        <p className="text-[#0B1120] font-semibold text-sm bg-[#0B1120]/20 px-4 py-2 rounded-full w-fit">
          {breadcrumbs}
        </p>
      </div>
    </div>
  );
};

export default Breadcrumbs;
