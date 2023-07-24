import * as React from "react";
import { Container } from ".";

type ComponentProps = {
   children: React.ReactNode;
   contentRef?: any;
};

const Content = (props: ComponentProps) => {
   const { children, contentRef } = props;
   return (
      <Container>
         <div className="bg-zinc-800 p-4 rounded-md" ref={contentRef}>
            {children}
         </div>
      </Container>
   );
};

export default Content;
