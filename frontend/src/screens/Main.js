import styles from './styles/Main.module.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Post from '../components/Post';
import Button from '../components/Button';
import Items from '../components/Items';
import { useMainContext } from '../context';

function Main() {
  const { sendMessage, message, setMessage } = useMainContext();
  const navigate = useNavigate();
  const [ posts, setPosts ] = useState([]);
  const handleClick = (e) => {
    if (e.currentTarget.classList.contains('active')) {
      e.currentTarget.children[1].style.transform = 'rotate(0deg)';
      e.currentTarget.parentElement.children[1].style.height = '0';
      e.currentTarget.classList.remove('active');
    } else {
      e.currentTarget.children[1].style.transform = 'rotate(90deg)';
      e.currentTarget.parentElement.children[1].style.height = "auto";
      e.currentTarget.classList.add('active');
    }
  };
  useEffect(() => {
    window.scrollTo({top: 0, smooth: "behavior"});
    sendMessage(JSON.stringify(["cards", "filter", {"category": "Розы с любовью"}, 6]))
  }, [])
  useEffect(() => {
    if (message && window.location.pathname === "/") {
      if (message[0] === 'cards') {
        if (message[1] === 'filter') {
          setPosts(message[2]);
        }
      }
      setMessage(null);
    };
  }, [message]);
  return (
    <div className="view">
      <div className={styles.header} style={{paddingBottom: 15, paddingTop: 15, borderBottom: "0.5px solid #18181A", marginLeft: -15, width: "100vw", paddingLeft: 15, marginBottom: 20}}>
        <div style={{display: "flex", alignItems: "center", gap: 15}}>
          <div>
            <img src={require("./images/splash.svg").default} alt="" style={{width: 50}} />
          </div>
          <div>
            <div style={{fontSize: 24, fontWeight: 300}}>Студия <span>Роз</span></div>
            <div style={{fontSize: 12, fontWeight: 300, color: "#999999"}}>Нежность в каждом лепестке</div>
          </div>
        </div>
      </div>
      {/* <div className={styles.block}>
        <div className={styles.itemsWrapper}>
          <div className={styles.items}>
            <div className={styles.item}>
              <span style={{zIndex: 1}}>Фотоотчёт</span>
              <div style={{zIndex: 1}}>Присылаем фото собранного букета и фотоотчёт о вручении</div>
              <img src={require("./images/photo.svg").default} alt="" style={{position: "absolute", top: 0, right: 0, width: 80, transform: "rotate(14.5deg)", filter: "brightness(.3)"}} />
            </div>
            <div className={styles.item}>
              <span style={{zIndex: 1}}>Оплата при получении</span>
              <div style={{zIndex: 1}}>Наличными курьеру или переводом</div>
              <img src={require("./images/rouble.svg").default} alt="" style={{position: "absolute", top: 0, right: -10, width: 80, transform: "rotate(14.5deg)", filter: "brightness(.3)"}} />
            </div>
            <div className={styles.item}>
              <span style={{zIndex: 1}}>Бесплатная доставка</span>
              <div style={{zIndex: 1}}>При заказе от 4500 ₽</div>
              <img src={require("./images/delivery.svg").default} alt="" style={{position: "absolute", top: 0, right: 0, width: 80, transform: "rotate(14.5deg)", filter: "brightness(.3)"}} />
            </div>
            <div className={styles.item}>
              <span style={{zIndex: 1}}>Круглосуточно</span>
              <div style={{zIndex: 1}}>Режим работы 24/7</div>
              <img src={require("./images/clock.svg").default} alt="" style={{position: "absolute", top: 0, right: 0, width: 80, transform: "rotate(14.5deg)", filter: "brightness(.3)"}} />
            </div>
          </div>
        </div>
      </div> */}
      <div style={{fontSize: 14, fontWeight: 300, paddingBottom: 20}}>
        Cвежие цветы | Доставка | Гарантия | Круглосуточно
      </div>
      <div style={{position: "relative", width: "100%", height: "120px", borderRadius: 9, overflow: "hidden"}}>
        <img src={require("./images/woman.avif")} alt="" style={{borderRadius: 9, display: "flex", width: "100%", height: "100%", objectFit: "cover", position: "absolute", zIndex: 1}} />
        <div style={{position: "relative", 
                     boxSizing: "border-box", 
                     background: "linear-gradient(10deg, rgba(24, 24, 26, .7) 45%, rgba(24, 24, 26, 0)) 55%", 
                     width: "100%", 
                     height: "100%", 
                     zIndex: 2, 
                     padding: 15,
                     display: "flex",
                     alignItems: "flex-end"}}>
          <div style={{zIndex: 1, display: "flex", flexFlow: "column", rowGap: 5}}>
            <div style={{fontSize: 16, fontWeight: 300}}>Вы приводите клиентов - мы за это платим</div>
            <div style={{fontSize: 12, fontWeight: 300, color: "#bbb"}}>Рекомендуйте наши букеты и получаете до 5 000₽ за каждый букет, купленный по вашему промокоду</div>
          </div>
        </div>
      </div>
      {/* <div className={styles.posts}>
        {posts.map((post, index) => (
          <Post data={post} key={index}/>
        ))}
      </div> */}
      <div style={{display: "flex", flexWrap: "wrap", gap: 10, paddingTop: 20, borderBottom: "0.5px solid rgb(24, 24, 26)", paddingBottom: 20}}>
        {posts.length > 0 ?
          <>
            {posts.map((post, index) => (
              <div key={post._id}>
                {index === 2 &&
                <Post postData={post} type="old-big" basePathUrl="/" />}
                {[0, 1].includes(index) &&
                <Post postData={post} type="old-normal" basePathUrl="/" />}
                {![0, 1, 2].includes(index) &&
                <Post postData={post} type="old-small" basePathUrl="/" />}
              </div>
            ))}
          </>
          :
          <div style={{width: "100%", height: "50vw", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <div style={{fontSize: 16, fontWeight: 300, color: "#bbb"}}>Букеты отсутствуют</div>
          </div>
        }
      </div>
      {posts.length > 0 &&
      <div style={{marginTop: 15, display: "flex", justifyContent: "center", color: "#bbb", fontWeight: 300, fontSize: 15, alignItems: "center", gap: 8}} onClick={() => navigate("/search")}>
        Показать всё <img src={require("../components/images/arrow-right.svg").default} alt="" style={{display: "flex", marginTop: 1, filter: "brightness(.6)"}} />
      </div>}
      <div className={styles.information}>
        <div className={styles.informationblocks}>
          <div className={styles.informationblock}>
            <div className={styles.informationtitle} onClick={handleClick}>
              <span>Доставка</span>  <img src={require("../components/images/arrow-right.svg").default} alt="arrow right"/>
            </div>
            <div className={styles.informationdescription}>
              <Items items={[
                {
                  label: "Сочи",
                  value: "Бесплатно"
                },
                {
                  label: "Адлер",
                  value: "Бесплатно"
                },
                {
                  label: "Краснодар",
                  value: "Бесплатно"
                },
              ]} />
            </div>
          </div>
          <div className={styles.informationblock}>
            <div className={styles.informationtitle} onClick={handleClick}>
              <span>Почему мы?</span>  <img src={require("../components/images/arrow-right.svg").default} alt="arrow right"/>
            </div>
            <div className={styles.informationdescription}>
              <span className={styles.ptitle}>Доверие клиентов</span>
              <p>
                Наши клиенты остаются довольны сервисом и обращаются вновь, а так же рекомендуют нас своим друзьям и знакомым: Многие годы на рынке авто проката позволяют учесть все потребности и у удовлетворить все возникшие вопросы. 
              </p>
              <span className={styles.ptitle}>Безупречная репутация</span>
              <p>
                Годы успешной работы в сфере проката авто подтверждены высоким рейтингом на площадках Яндекс, Авито, 2ГИС
              </p>
              <span className={styles.ptitle}>Широкий ассортимент</span>
              <p>
                Наш парк укомплектован автомобилями различных классов. Все фото и видео материалы сняты нашими фотографами, что гарантирует Вам аренду именно того авто, что вы выбрали на сайте.
              </p>
            </div>
          </div>
          <div className={styles.informationblock}>
            <div className={styles.informationtitle} onClick={handleClick}>
              <span>Часто задаваемые вопросы</span>  <img src={require("../components/images/arrow-right.svg").default} alt="arrow right"/>
            </div>
            <div className={styles.informationdescription}>
              <div style={{backgroundColor: "#1C1C1E", borderRadius: 9, padding: 12, marginBottom: 20}}>
                <span className={styles.ptitle}>Как я могу заказать цветы?</span>
                <p style={{marginBottom: 0, fontSize: 14, fontWeight: 300}}>
                Чтобы оформить заказ на букет цветов на нашем сайте, вам нужно выбрать понравившийся букет, нажать кнопку "В корзину", затем перейти в "корзину" и заполнить форму заказа, указав необходимую информацию, включая ваше имя, адрес доставки и контактную информацию. После этого вы сможете выбрать удобный способ оплаты и подтвердить заказ.
                </p>
              </div>
              <div style={{backgroundColor: "#1C1C1E", borderRadius: 9, padding: 12, marginBottom: 20}}>
                <span className={styles.ptitle}>Как выполняется и доставляется заказ?</span>
                <p style={{marginBottom: 0, fontSize: 14, fontWeight: 300}}>
                  Наша команда флористов соберет выбранный Вами букет . Менеджер свяжется с Вами и предоставит Вам фото собранного букета . После чего курьер привезёт букет в удобное для получателя время.
                </p>
              </div>
              <div style={{backgroundColor: "#1C1C1E", borderRadius: 9, padding: 12, marginBottom: 20}}>
                <span className={styles.ptitle}>Могу ли я что то изменить в выбранном букете?</span>
                <p style={{marginBottom: 0, fontSize: 14, fontWeight: 300}}>
                  Да, конечно. Свяжитесь с нами и мы с радостью внесем изменения в Ваш букет.
                </p>
              </div>
              <div style={{backgroundColor: "#1C1C1E", borderRadius: 9, padding: 12, marginBottom: 20}}>
                <span className={styles.ptitle}>Предоставляете ли вы бесплатную доставку?</span>
                <p style={{marginBottom: 0, fontSize: 14, fontWeight: 300}}>
                  Бесплатная доставка осуществляется для заказов от 2 500 ₽.
                </p>
              </div>
              <div style={{marginTop: 10, paddingBottom: 20}}>
                <Button text="Задать свой вопрос" />
              </div>
            </div>
          </div>
          <div className={styles.informationblock}>
            <div className={styles.informationtitle}>
              <span>Отзывы наших клиентов<div style={{marginTop: 5, fontSize: 11, fontWeight: 300, color: "#8F8E93", lineHeight: "120%"}}>Нажми на рейтинг справа, для того<br/>чтобы перейти к отзывам</div></span>  <iframe src="https://yandex.ru/sprav/widget/rating-badge/101836494062?type=rating" width="150" height="50" frameBorder="0"></iframe>
            </div>
          </div>
        </div>
      </div>
      <footer className={styles.footer}>
        <div style={{display: "flex", flexFlow: "column", padding: "20px 0 10px 0"}}>
          <div style={{fontSize: 16, fontWeight: 300, color: "#fff", paddingBottom: 5}}>Не нашли что искали?</div>
          <div style={{fontSize: 14, fontWeight: 300, color: "#bbb"}}>
            Отправьте сообщение или позвоните
            подберем самый подходящий букет для
            вашего мероприятия
          </div>
        </div>
        <div className={styles.contacts}>
          <div className={styles.telephone}>+7 966 775 79 66</div>
          <div className={styles.icons}>
            <img src={require("./images/telegram.svg").default} className="" alt="telegram" />
            <img src={require("./images/whatsapp.svg").default} className="" alt="whatsapp" />
          </div>
        </div>
        <div className={styles.map}>
          <div className={styles.mapaddress}>г.Сочи, ул. Горького, 89</div>
          <div className={styles.map_24124}>
            <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A324f2a829909632c05ad04a5f1cba2f0c66ffca76e9f9e47b9c030c9501a45b2&amp;source=constructor" width="100%" height="200" frameBorder="0"></iframe>
          </div>
        </div>
        <div className={styles.labelBy}>
          powered by <span>LIGHT Business</span> © 2024
        </div>
      </footer>
    </div>
  );
}

export default Main;
