import { Routes, Route } from 'react-router-dom';
import { useMainContext } from './context';

import FixedButton from './components/FixedButton';

import Main from './screens/Main';
import Loading from './screens/Loading';
import LoadUserInfo from './screens/LoadUserInfo';

import Search from './screens/Search';
import SelectCategory from './screens/SelectCategory';
import Add from './screens/Add';
import Cart from './screens/Cart';

const Navigate = () => {

  const { loading, loadUserInfo } = useMainContext();

  return (
    !loading ?
      <div>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/add" element={<Add />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<Search />} />
        </Routes>
        <FixedButton />
      </div>
    :
      <Loading />
  );
};

export default Navigate;
