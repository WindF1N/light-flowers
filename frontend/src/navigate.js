import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useMainContext } from './context';

import Main from './screens/Main';
import Loading from './screens/Loading';
import LoadUserInfo from './screens/LoadUserInfo';

import SignIn from './screens/SignIn';
import Verify from './screens/Verify';
import Search from './screens/Search';
import SearchMore from './screens/SearchMore';
import Comments from './screens/Comments';
import Post from './screens/Post';
import User from './screens/User';
import SelectCategory from './screens/SelectCategory';
import AddCar from './screens/Add';
import AddService from './screens/AddService';
import Settings from './screens/Settings';
import Service from './screens/Service';
import Page from './screens/Page';
import Serv from './screens/Serv';
import AddDamage from './screens/AddDamage';
import Activity from './screens/Activity';
import Passwords from './screens/Passwords';
import Password from './screens/Password';
import Messenger from './screens/Messenger';
import Redirect from './screens/Redirect';

const Navigate = () => {

  const { loading, loadUserInfo } = useMainContext();

  return (
    !loading ?
      ( !loadUserInfo ?
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/add" element={<SelectCategory />} />
            <Route path="/add/car" element={<AddCar />} />
            <Route path="/add/service" element={<AddService />} />
            <Route path="/search" element={<Search />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/passwords" element={<Passwords />} />
            <Route path="/password" element={<Password />} />
            <Route path="/messenger" element={<Messenger />} />
            <Route path="/search/more" element={<SearchMore />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/posts/:id" element={<Post />} />
            <Route path="/posts/:id/comments" element={<Comments />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/services/:id" element={<Service />} />
            <Route path="/page/:id" element={<Page />} />
            <Route path="/serv/:id" element={<Serv />} />
            <Route path="/add-damage/" element={<AddDamage />} />
            <Route path="/prokat" element={<Redirect link={"http://prolbrm2.beget.tech"} />} />
            <Route path="/travel" element={<Redirect link={"http://objectnss.beget.tech"} />} />
            <Route path="/documents" element={<Redirect link={"http://kostya.prolbrm2.beget.tech:5000"} />} />
          </Routes>
        </BrowserRouter>
        : <LoadUserInfo />
      )

    :
      <Loading />
  );
};

export default Navigate;
