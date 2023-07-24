type ComponentProps = {
   route: string;
   message?: string;
   secondMessage?: string;
   className?: string;
};

const Header = (props: ComponentProps) => {
   const { route, message, secondMessage, className } = props;
   return (
      <div>
         <h1 className={`py-6 text-xl msm:text-lg ${className}`}>
            {route} {message ? ">" : ""} {message} {secondMessage}
         </h1>
      </div>
   );
};

export default Header;
