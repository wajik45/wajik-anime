import Wrapper from "./Wrapper";
import Container from "./Container";
import Content from "./Content";
import { Navbar, Footer } from "../components";

const MainLayout = ({ children }: { children: any }) => {
   return (
      <Wrapper>
         <Navbar />
         <Container>
            <Content>{children}</Content>
         </Container>
         <Footer />
      </Wrapper>
   );
};

export default MainLayout;
