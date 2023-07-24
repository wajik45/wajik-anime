import * as React from "react";
import { Container } from ".";

type ComponentProps = {
   children: React.ReactNode;
};

const Content = ({ children }: ComponentProps) => {
   return (
      <Container>
         <div className="bg-zinc-800 p-4 rounded-md">{children}</div>
      </Container>
   );
};

export default Content;
