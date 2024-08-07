import Category from './components/category';
import Review from './components/review';
import Strick from './components/strick';
import Tier from './components/tier';
import TopBar from '@/components/top-bar/TopBar';

const MainPage = () => {
  return (
    <>
      <TopBar type='Main' backgroundColor='#fff' title={''} />
      <Category />
      <Tier />
      <Strick />
      <Review />
    </>
  );
};

export default MainPage;
