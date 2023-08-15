import * as React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
   return <div className="container mx-auto px-4">{children}</div>;
};

export default Container;
