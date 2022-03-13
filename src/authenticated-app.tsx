import styled from "@emotion/styled";
import { Button } from "antd";
import { useAuth } from "context/auth-context";
import ProjectScreen from "screens/project-list";

export const AuthenticatedApp = () => {
  // 有登录 所以也有登出
  const { logout } = useAuth();
  return (
    <Container>
      <Header>
        <HeaderLeft>
          <h3>Logo</h3>
          <h3>项目</h3>
          <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
          <Button type={"primary"} onClick={() => logout()}>
            退出
          </Button>
        </HeaderRight>
      </Header>
      <Nav>nav</Nav>
      <Main>
        <ProjectScreen></ProjectScreen>
      </Main>
      <Aside>aside</Aside>

      <Footer>footer</Footer>
    </Container>
  );
};

// 如果不使用grid布局  那就要写很多的小模块,但是用了就不用写那么多了
// 但是具体的几个小元素还是要的  只是大框架可以定了 比如
// 使用grid之后 这五个小元素也就只用给取名字了 不用写什么其他的了 -- 其他的布局信息会被汇总到container上

// 不用grid之前 每个都要定义宽高长短啥的  定义之后就不需要了.  需要的就是对里面的元素或者颜色描述,而不用写宽高了
// const PageHeader = styled.header`
//   height: 6rem;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
// `;
// const Main = styled.main`
//   height: calc(100vh - 6rem);
// `;

const Header = styled.header`
  grid-area: header;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
//定义header相关的元素
const HeaderLeft = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
`;
const HeaderRight = styled.div`
  width: 10rem;
`;

const Main = styled.main`
  grid-area: main;
`;
const Nav = styled.nav`
  grid-area: nav;
`;
const Aside = styled.aside`
  grid-area: aside;
`;
const Footer = styled.footer`
  /* 用来给子元素起名字 , 随便取,只是有意义的名字好理解*/
  grid-area: footer;
`;

// grid 容器
const Container = styled.div`
  display: grid;
  /* 指从上到下  header/footer  高6rem  中间1fr 就表示减去两个6rem是多少就是多少  总高度又设置了 100vh */
  grid-template-rows: 6rem 1fr 6rem; /* 描述了三行 */
  grid-template-columns: 20rem 1fr 20rem; /* 描述了三列  分别宽20rem 1fr 20rem*/
  /* 最强大的属性,最难理解  就是表示子元素是怎么排列的 , 不需要逗号*/
  grid-template-areas:
    "header header header"
    "nav main aside"
    "footer footer footer";
  height: 100vh;
  /* 加间距 */
  /* grid-gap: 10rem; */
`;

// flex 和 grid 分别在什么地方使用? 各自的使用场景
/*
  1. 要考虑一维布局还是二维布局. 一般来说一维布局用flex  二维用grid
  2. 是从内容出发还是从布局出发?
     从内容出发: 你先有一组内容(数量不固定),然后希望它们能均匀的分布在容器中,由内容自己的大小决定 占据的空间.
     从布局出发: 先规划网格(一般网格数量固定),然后再把元素往里填充

  从内容出发 用flex ,从布局出发用grid

*/
