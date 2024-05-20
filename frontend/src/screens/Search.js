import styles from './styles/Search.module.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import FixedButton from '../components/FixedButton';
import SearchInput from '../components/SearchInput';
import FlexVariables from '../components/FlexVariables';
import Title from '../components/Title';
import Grid from '../components/Grid';
import DataItems from '../components/DataItems';
import Blocks from '../components/Blocks';
import RandomGrid from '../components/RandomGrid';
import UserList from '../components/UserList';
import Button from '../components/Button';
import { useMainContext } from '../context';
import addphoto from './images/add-photo.svg';
import GosNumber from '../components/GosNumber';

function Search() {

  const navigate = useNavigate();

  const { account, sendMessage, message, setMessage, posts, setPosts, users, select, setSelect, transportView, setTransportView, servicesView, setServicesView, services_View, setServices_View, dealersView, setDealersView } = useMainContext();

  const [variables, setVariables] = useState([
    {
      value: "transport",
      label: "Атомобили"
    },
    {
      value: "services",
      label: "Услуги"
    },
    {
      value: "services_",
      label: "Сервисы"
    },
    {
      value: "dealers",
      label: "Дилеры"
    },
    {
      value: "accounts",
      label: "Аккаунты"
    },
  ]);
  const [transport, setTransport] = useState(posts || []);
  const [services, setServices] = useState([
    {
      title: "Аренда/Прокат автомобилей",
      views_count: "3.3 млн просмотров",
      link: "/prokat" /// prokat
    },
    {
      title: "Автопутешествия",
      views_count: "3.3 млн просмотров",
      link: "/travel" /// travel
    },
    {
      title: "Помощь в оформлении документов",
      views_count: "3.3 млн просмотров",
      link: "/documents" /// documents
    },
    {
      title: "Деньги под залог ПТС",
      views_count: "3.3 млн просмотров",
      link: "/serv/4"
    },
    {
      title: "Лизинг автомобилей",
      views_count: "3.3 млн просмотров",
      link: "/serv/5"
    },
    {
      title: "Автоюрист бесплатная консультация",
      views_count: "3.3 млн просмотров",
      link: "/serv/6"
    },
    {
      title: "Срочная продажа автомобиля",
      views_count: "3.3 млн просмотров",
      link: "/serv/7"
    },
    {
      title: "Электронный полис е-ОСАГО",
      views_count: "3.3 млн просмотров",
      link: "/serv/8"
    },
    {
      title: "Техническая гарантия на автомобили с пробегом",
      views_count: "3.3 млн просмотров",
      link: "/serv/9"
    },
    {
      title: "Автокредит онлайн без первого взноса",
      views_count: "3.3 млн просмотров",
      link: "/serv/10"
    },
    {
      title: "Автомобили в рассрочку",
      views_count: "3.3 млн просмотров",
      link: "/serv/11"
    },
    {
      title: "Подбор автомобиля",
      views_count: "3.3 млн просмотров",
      link: "/serv/12"
    },
    {
      title: "Обмен автомобиля",
      views_count: "3.3 млн просмотров",
      link: "/serv/13"
    },
    {
      title: "Выкуп автомобиля",
      views_count: "3.3 млн просмотров",
      link: "/serv/14"
    },
    {
      title: "Помощь на дороге",
      views_count: "3.3 млн просмотров",
      link: "/serv/15"
    },
    {
      title: "Оформление переоборудования автомобилей",
      views_count: "3.3 млн просмотров",
      link: "/serv/16"
    },
    {
      title: "Аукцион автомобилей с пробегом",
      views_count: "3.3 млн просмотров",
      link: "/serv/17"
    },
    {
      title: "Диагностическая карта онлайн",
      views_count: "3.3 млн просмотров",
      link: "/serv/18"
    },
    {
      title: "Автозапчасти",
      views_count: "3.3 млн просмотров",
      link: "/serv/19"
    },
    {
      title: "Онлайн показ автомобиля",
      views_count: "3.3 млн просмотров",
      link: "/serv/20"
    },
    {
      title: "Лизинг авто с пробегом",
      views_count: "3.3 млн просмотров",
      link: "/serv/21"
    },
    {
      title: "Продажа с гарантией и обеспечительным платежём",
      views_count: "3.3 млн просмотров",
      link: "/serv/22"
    },
    {
      title: "Онлайн комиссия",
      views_count: "3.3 млн просмотров",
      link: "/serv/23"
    },
    {
      title: "ДТП Онлайн",
      views_count: "3.3 млн просмотров",
      link: "/serv/24"
    },
    {
      title: "Комиссионная продажа",
      views_count: "3.3 млн просмотров",
      link: "/serv/25"
    },
    {
      title: "Снятие запретов и ограничений",
      views_count: "3.3 млн просмотров",
      link: "/serv/26"
    },
    {
      title: "Помощь в покупке",
      views_count: "3.3 млн просмотров",
      link: "/serv/27"
    },
    {
      title: "Восстановление КБМ",
      views_count: "3.3 млн просмотров",
      link: "/serv/28"
    },
  ]);
  const [services_, setServices_] = useState([
    {
      title: "Проверка истории автомобиля",
      views_count: "3.3 млн просмотров",
      link: "/services/1"
    },
    {
      title: "Оценка стоимости автомобиля",
      views_count: "3.3 млн просмотров",
      link: "/services/2"
    },
    {
      title: "Договор купли-продажи",
      views_count: "3.3 млн просмотров",
      link: "/services/3"
    },
    {
      title: "Проверить и оплатить штрафы ГИБДД",
      views_count: "3.3 млн просмотров",
      link: "/services/4"
    },
    {
      title: "Калькулятор транспортного налога",
      views_count: "3.3 млн просмотров",
      link: "/services/5"
    },
    {
      title: "Заявление на регистрацию автомобиля в ГИБДД service-online.su",
      views_count: "3.3 млн просмотров",
      link: "/services/6"
    },
    {
      title: "Заявление на замену водительского удостоверения service-online.su",
      views_count: "3.3 млн просмотров",
      link: "/services/7"
    },
    {
      title: "Электронный ПТС",
      views_count: "3.3 млн просмотров",
      link: "/services/8"
    },
    {
      title: "Акт приёма-передачи автомобиля service-online.su",
      views_count: "3.3 млн просмотров",
      link: "/services/9"
    },
    {
      title: "Правила ПДД",
      views_count: "3.3 млн просмотров",
      link: "/services/10"
    },
    {
      title: "Расписка о получении денег за автомобиль",
      views_count: "3.3 млн просмотров",
      link: "/services/11"
    },
    {
      title: "Электронный акт осмотра транспортного средства",
      views_count: "3.3 млн просмотров",
      link: "/add"
    },
  ]);
  const [dealers, setDealers] = useState([
    {
      image: "https://s0.rbk.ru/rbcplus_pics/media/img/3/20/295906625023203.jpg",
      title: "ООО \"Престиж-Центр\"",
      address: "Сочи, ул. Парусная, 20/3"
    },
    {
      image: "https://s0.rbk.ru/rbcplus_pics/media/img/3/20/295906625023203.jpg",
      title: "ООО \"Престиж-Центр\"",
      address: "Сочи, ул. Парусная, 20/3"
    },
    {
      image: "https://s0.rbk.ru/rbcplus_pics/media/img/3/20/295906625023203.jpg",
      title: "ООО \"Престиж-Центр\"",
      address: "Сочи, ул. Парусная, 20/3"
    },
    {
      image: "https://s0.rbk.ru/rbcplus_pics/media/img/3/20/295906625023203.jpg",
      title: "ООО \"Престиж-Центр\"",
      address: "Сочи, ул. Парусная, 20/3"
    },
    {
      image: "https://s0.rbk.ru/rbcplus_pics/media/img/3/20/295906625023203.jpg",
      title: "ООО \"Престиж-Центр\"",
      address: "Сочи, ул. Парусная, 20/3"
    },
    {
      image: "https://s0.rbk.ru/rbcplus_pics/media/img/3/20/295906625023203.jpg",
      title: "ООО \"Престиж-Центр\"",
      address: "Сочи, ул. Парусная, 20/3"
    }
  ]);
  const [accounts, setAccounts] = useState(users || []);

  useEffect(() => {
    if (accounts.length === 0 && users.length === 0) {
      sendMessage(JSON.stringify(["user", "list"]));
    } else {
      setAccounts(users);
    }
  }, [accounts, users])

  useEffect(() => {
    sendMessage(JSON.stringify(["user", "list"]));
  }, [])

  useEffect(() => {
    if (transport.length === 0) {
      setTransport(posts);
    }
  }, [posts, transport])

  useEffect(() => {
    if (posts.length === 0) {
      console.log(posts);
      sendMessage(JSON.stringify(["posts", "list"]));
    }
  }, [posts])
  
  useEffect(() => {
    if (message) {
      if (message[0] === 'images') {
        if (message[1] === 'get') {
          setPosts(prevState => {
            // Создаем копию массива постов
            const newPosts = [...prevState];

            // Находим пост по его _id
            const postIndex = newPosts.findIndex(post => post._id === message[3]);

            // Если пост найден, обновляем его изображения
            if (postIndex !== -1) {
              newPosts[postIndex].images = message[2];
            }

            // Обновляем состояние постов
            return newPosts;
          });
        }
      } else if (message[0] === 'posts') {
        if (message[1] === 'list') {
          if (posts.length === 0) {
            setPosts(prevState => [...prevState, ...message[2]]);
            message[2].forEach(item => {
              sendMessage(JSON.stringify(["images", "get", item._id, "main"]));
            })
          }
        }
      }
      setMessage(null);
    };
  }, [message]);

  return (
    <div className={styles.view}>
      <SearchInput />
      <FlexVariables variables={variables} select={select} setSelect={setSelect} />
      {select === "transport" &&
        <>
          <Title text="Автомобили" allowGrid={() => setTransportView("grid")} allowBlocks={() => setTransportView("list")} selected={transportView}/>
          <Button text="Расширенный поиск" style={{marginBottom: 15}} small={true} handleClick={() => navigate("/search/more")} />
          <div className={styles.flex} style={{marginBottom: 10, marginTop: -5}}>
            <GosNumber />
            <div className={styles.addphoto} onClick={() => document.getElementById('photo-input').click()}>
              <img src={addphoto} alt="" />
              <input
                  id="photo-input"
                  type="file"
                  accept="image/*"
                  multiple
                  style={{ display: 'none' }}
                />
            </div>
          </div>
          {transportView === "grid" &&
            <Grid items={transport.filter((item) => item.input1 === "Автомобили")} navigate={navigate} />}
          {transportView === "list" &&
            <Blocks items={transport.filter((item) => item.input1 === "Автомобили")} />}
        </>}
      {select === "services" &&
        <>
          <Title text="Автоуслуги" allowGrid={() => setServicesView("grid")} allowBlocks={() => setServicesView("list")} selected={servicesView}/>
          {servicesView === "grid" &&
            <RandomGrid items={services} navigate={navigate} />}
          {servicesView === "list" &&
            <DataItems items={services} navigate={navigate} />}
        </>}
      {select === "dealers" &&
        <>
          <Title text="Дилеры" allowGrid={() => setDealersView("grid")} allowBlocks={() => setDealersView("list")} selected={dealersView}/>
          {dealersView === "grid" &&
          <div className={styles.line}>
            {dealers.map((item, index) => (
            <div className={styles.cellMiddle} key={index}>
              <div className={styles.image}>
                <img src={item.image} alt="" />
              </div>
              <div className={styles.information}>
                <div className={styles.title}>{item.title}</div>
                <div className={styles.price}>{item.address}</div>
              </div>
            </div>))}
          </div>}
          {dealersView === "list" &&
          <div className={styles.list}>
            {dealers.map((item, index) => (
            <div className={styles.item} key={index}>
              <div className={styles.image}>
                <img src={item.image} alt="" />
              </div>
              <div className={styles.information}>
                <div className={styles.title}>{item.title}</div>
                <div className={styles.price}>{item.address}</div>
                <Button text="Написать" small={true} style={{marginTop: 5}}/>
                <Button text="Позвонить" small={true}/>
              </div>
            </div>))}
          </div>}
        </>}
      {select === "accounts" &&
        <>
          <Title text="Аккаунты"/>
          <UserList items={accounts} navigate={navigate} />
        </>}
      {select === "services_" &&
        <>
          <Title text="Сервисы" allowGrid={() => setServices_View("grid")} allowBlocks={() => setServices_View("list")} selected={services_View}/>
          {services_View === "grid" &&
            <RandomGrid items={services_} navigate={navigate} />}
          {services_View === "list" &&
            <DataItems items={services_} navigate={navigate} />}
        </>}
      <FixedButton />
    </div>
  );
}

export default Search;
