import * as React from "react";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
   return (
      <div className="min-h-screen pb-[120px] relative font-sans bg-zinc-900 text-zinc-200">
         {children}
      </div>
   );
};

export default Wrapper;
