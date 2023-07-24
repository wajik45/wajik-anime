import * as React from "react";

type ComponentProps = {
   children: React.ReactNode;
};

const Container = ({ children }: ComponentProps) => {
   return <div className="container mx-auto px-4">{children}</div>;
};

export default Container;
