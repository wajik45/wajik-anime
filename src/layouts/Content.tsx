import * as React from "react";

const Content = ({ children }: { children: React.ReactNode }) => {
   return <div className="bg-zinc-800 p-4 rounded-md">{children}</div>;
};

export default Content;
