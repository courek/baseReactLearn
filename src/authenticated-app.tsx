import styled from "@emotion/styled";
import { Button, Dropdown, Menu } from "antd";
import { Row } from "components/lib";
import { useAuth } from "context/auth-context";
import ProjectScreen from "screens/project-list";

// import softwareLogo from "assets/software-logo.svg"; // 这样是直接以img形式去渲染的
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg"; // 这样可以以svg形式去渲染的,做成一个 SoftwareLogo 组件

export const AuthenticatedApp = () => {
  // 有登录 所以也有登出
  const { logout, user } = useAuth();
  return (
    <Container>
      {/* 布尔类型,不写值  只要有这个属性,就能为true */}
      <Header between>
        <HeaderLeft gap={true}>
          {/* 假设你使用了headerItem 但是不想用 h3标签了.  可以 headerItem as={'div'}  就会变成div了,像范型  但是就是感觉不是很好的方案*/}
          {/* 所以使用 emotion 带有的变量 */}
          {/* 在 HeaderLeft 定义的style 中传入Row (自己写的)*/}
          {/*  然后调用 HeaderLeft 的时候就可以传入gap={ ... 你定义的属性/变量 } */}
          {/* 这样还是以图片的形式渲染,希望是直接用svg的形式去渲染,因为svg形式可以自定义样式,但是img的形式,渲染了就没办法改变样式了 */}
          {/* <img src={softwareLogo} alt="logo"></img> */}
          {/*  这种形式就是 直接svg渲染了,并且能直接改svg的样式 */}
          <SoftwareLogo
            width="18rem"
            color={"rgba(38,132,255,1)"}
          ></SoftwareLogo>
          <h3>项目</h3>
          <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
          {/* 换成下拉列表 */}
          {/* <Button type={"primary"} onClick={() => logout()}>
            退出
          </Button> */}
          {/* 是指我们鼠标移上去会显示的内容  这里写菜单栏  */}
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key={"logout"}>
                  <a href="void" onClick={logout}>
                    退出
                  </a>
                </Menu.Item>
              </Menu>
            }
          >
            {/* Dropdown 里面要显示的内容 */}
            <a
              href="#"
              onClick={(e) => {
                // e.defaultPrevented();
                console.log(e);
              }}
            >
              Hi,{user?.name}
            </a>
          </Dropdown>
        </HeaderRight>
      </Header>
      {/* <Nav>nav</Nav>  当前业务不需要 只是拿来学习grid布局 */}
      <Main>
        <ProjectScreen></ProjectScreen>
      </Main>
      {/* <Aside>aside</Aside>
      <Footer>footer</Footer> */}
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

// const headerItem = styled.h3`
//   margin-left: 12px;
// `;

const Header = styled(Row)`
  /* grid-area: header; */
  /* display: flex;
  flex-direction: row;
  align-items: center; */
  /* 统一继承了,抽离出来的公共样式了 */
  padding: 3.2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1;
  /* justify-content: space-between;  顺便把这句抽离了 */
`;
//定义header相关的元素 -- 因为要使用 Row(自己.非antd)
// const HeaderLeft = styled.div`
//   flex: 1;
//   min-width: 0;
//   display: flex;
// `;

// 然后 相关的 有display:flex  row 类型的就都可以直接  styled(Row)  等于是scss中的 继承了,少写那些display
//然后继续页面上调用就行,反撇号还是要保留的 不然就不是 css-in-js了
const HeaderLeft = styled(Row)`
  flex: 1;
  min-width: 0;
`;

const HeaderRight = styled.div`
  width: 10rem;
`;

const Main = styled.main`
  /* grid-area: main; */
`;
// const Nav = styled.nav`
//   grid-area: nav;
// `;
// const Aside = styled.aside`
//   grid-area: aside;
// `;
// const Footer = styled.footer`
//   /* 用来给子元素起名字 , 随便取,只是有意义的名字好理解*/
//   grid-area: footer;
// `;

// grid 容器
const Container = styled.div`
  display: grid;
  /* 指从上到下  header/footer  高6rem  中间1fr 就表示减去两个6rem是多少就是多少  总高度又设置了 100vh */
  /* 描述了三行 */
  grid-template-rows: 6rem 1fr 6rem;
  /* 描述了三列  分别宽20rem 1fr 20rem*/
  /* grid-template-columns: 20rem 1fr 20rem; */
  /* 最强大的属性,最难理解  就是表示子元素是怎么排列的 , 不需要逗号*/
  /* 如果没有 这个属性, 那么子元素的 grid-area: main; 也去掉,不然还是会生效*/
  /* grid-template-areas:
    "header header header"
    "nav main aside"
    "footer footer footer"; */
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
