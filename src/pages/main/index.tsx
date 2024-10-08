import Category from './components/category';
import Review from './components/review';
import Strick from './components/strick';
import Tier from './components/tier';
import TopBar, { HEADER_HEIGHT } from '@/components/features/layout/top-bar';
import styled from '@emotion/styled';

const MainPage = () => {
  return (
    <>
      <TopBar type='Main' backgroundColor='#fff' title={''} />
      <Wrapper>
        <Category />
        <Tier />
        <Strick />
        <Review />
      </Wrapper>
    </>
  );
};

export default MainPage;

const Wrapper = styled.div`
  min-height: calc(100vh - ${HEADER_HEIGHT});
`;
