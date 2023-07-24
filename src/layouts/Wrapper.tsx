import * as React from "react";

type ComponentProps = {
   children: React.ReactNode;
};

const Wrapper = ({ children }: ComponentProps) => {
   return (
      <div className="min-h-screen pb-[120px] relative font-sans bg-zinc-900 text-zinc-200">
         {children}
      </div>
   );
};

export default Wrapper;
