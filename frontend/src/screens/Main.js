import styles from './styles/Main.module.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Post from '../components/Post';
import Title from '../components/Title';
import Button from '../components/Button';
import FixedButton from '../components/FixedButton';
import { useMainContext } from '../context';
import { LazyLoadImage } from 'react-lazy-load-image-component';


function Main() {

  const navigate = useNavigate();

  const { sendMessage, posts, setPosts, message, setMessage } = useMainContext();
  const [ isOpenPromo, setIsOpenPromo ] = useState(false);

  useEffect(() => {
    if (posts.length === 0) {
      sendMessage(JSON.stringify(["posts", "list"]));
    }
  }, [])

  useEffect(() => {
    if (message) {
      if (message[0] === 'images') {
        if (message[1] === 'get') {
          setPosts(prevState => {
            // Найдите пост, к которому нужно добавить изображения
            const postToUpdate = prevState.find(post => post._id === message[3]);

            // Если пост найден, добавьте изображения
            if (postToUpdate) {
              const newImages = [...message[2]];
              const updatedPost = { ...postToUpdate, images: newImages };

              // Замените старый пост в состоянии на обновленный
              return prevState.map(post => (post._id === message[3] ? updatedPost : post));
            }

            // Если пост не найден, верните предыдущее состояние
            return prevState;
          });
        }
      } else if (message[0] === 'user') {
        if (message[1] === 'get') {
          setPosts(prevState => {
            // Найдите пост, к которому нужно добавить изображения
            const postToUpdate = prevState.find(post => post._id === message[3]);

            // Если пост найден, добавьте изображения
            if (postToUpdate) {
              const updatedPost = { ...postToUpdate, user: message[2] };

              // Замените старый пост в состоянии на обновленный
              return prevState.map(post => (post._id === message[3] ? updatedPost : post));
            }

            // Если пост не найден, верните предыдущее состояние
            return prevState;
          });
        }
      } else if (message[0] === 'comments') {
        if (message[1] === 'last') {
          setPosts(prevState => {
            // Найдите пост, к которому нужно добавить изображения
            const postToUpdate = prevState.find(post => post._id === message[3]);

            // Если пост найден, добавьте изображения
            if (postToUpdate) {
              var newComments;
              if ('comments' in postToUpdate) {
                newComments = [...postToUpdate.comments, message[2]];
              } else {
                newComments = [message[2]];
              }
              const updatedPost = { ...postToUpdate, comments: newComments };

              // Замените старый пост в состоянии на обновленный
              return prevState.map(post => (post._id === message[3] ? updatedPost : post));
            }

            // Если пост не найден, верните предыдущее состояние
            return prevState;
          });
        } else if (message[1] === 'count') {
          setPosts(prevState => {
            // Найдите пост, к которому нужно добавить изображения
            const postToUpdate = prevState.find(post => post._id === message[3]);

            // Если пост найден, добавьте изображения
            if (postToUpdate) {
              const updatedPost = { ...postToUpdate, comments_count: message[2] };

              // Замените старый пост в состоянии на обновленный
              return prevState.map(post => (post._id === message[3] ? updatedPost : post));
            }

            // Если пост не найден, верните предыдущее состояние
            return prevState;
          });
        }
      } else if (message[0] === 'favorite_posts') {
        if (message[1] === 'check') {
          setPosts(prevState => {
            // Найдите пост, к которому нужно добавить изображения
            const postToUpdate = prevState.find(post => post._id === message[3]);
  
            // Если пост найден, добавьте изображения
            if (postToUpdate) {
              const updatedPost = { ...postToUpdate, isFavorite: message[2] };
  
              // Замените старый пост в состоянии на обновленный
              return prevState.map(post => (post._id === message[3] ? updatedPost : post));
            }
  
            // Если пост не найден, верните предыдущее состояние
            return prevState;
          });
        }
      }
      setMessage(null);
    };
  }, [message]);

  const [ view, setView ] = useState("grid");

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
  }, [])

  return (
    <div className="view">
      <div className={styles.header}>
        <div>
          <img src={require("./images/logo.svg").default} alt="" />
        </div>
        <div>
          Для тех кто ценит качество, удобство и свой комфорт
        </div>
      </div>
      <div className={styles.block}>
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
      <Title text="Каталог" allowGrid={() => setView("grid")} allowBlocks={() => setView("list")} selected={view} showMore={() => navigate("/search")}/>
      {view === "grid" &&
      <div style={{display: "flex", flexWrap: "wrap", gap: 10}}>
        <div style={{position: "relative", width: "calc(50vw - 20px)", background: "#1C1C1E", borderRadius: 9, display: "flex", flexFlow: "column", rowGap: 10}}>
          <div style={{width: "calc(50vw - 20px)", height: "calc(50vw - 20px)", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <img src={require("./images/flowers.avif")} alt="" style={{width: "100%", height: "100%", objectFit: "cover", borderRadius: 9}} />
          </div>
          <div style={{width: 28, height: 28, position: "absolute", top: "calc(50vw - 53px)", right: 0, left: 0, margin: "auto", opacity: .75}}>
            <img src={require("./images/add-to-cart.svg").default} alt="" style={{width: "100%", height: "100%", objectFit: "cover"}} />
          </div>
          <div style={{height: "100%",display: "flex", flexFlow: "column", rowGap: 5, padding: "0 10px 10px 10px"}}>
            <div style={{fontSize: 14, fontWeight: 400}}>Букет из 19 роз</div>
            <div style={{fontSize: 14, fontWeight: 300, color: "#8F8E93", marginTop: "auto"}}>2 700,00 ₽ <span style={{display: "inline-block", textDecoration: "line-through", transform: "scale(.8)"}}>4 400,00 ₽</span></div>
          </div>
        </div>
        <div style={{position: "relative", width: "calc(50vw - 20px)", background: "#1C1C1E", borderRadius: 9, display: "flex", flexFlow: "column", rowGap: 10}}>
          <div style={{width: "calc(50vw - 20px)", height: "calc(50vw - 20px)", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <img src={require("./images/flowers2.avif")} alt="" style={{width: "100%", height: "100%", objectFit: "cover", borderRadius: 9}} />
          </div>
          <div style={{display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", top: "calc(50vw - 53px)", width: "calc(50vw - 20px)"}}>
            <div style={{width: 28, height: 28, marginRight: -3, zIndex: 1}}>
              <img src={require("./images/remove-to-cart.svg").default} alt="" style={{width: "100%", height: "100%", objectFit: "cover"}} />
            </div>
            <div style={{width: 34, height: 28, display: "flex", alignItems: "center", justifyContent: "center", background: "#1C1C1E", zIndex: 0}}>
              <div style={{fontSize: 16, fontWeight: 300, lineHeight: 1}}>1</div>
            </div>
            <div style={{width: 28, height: 28, marginLeft: -3, zIndex: 1}}>
              <img src={require("./images/add-to-cart.svg").default} alt="" style={{width: "100%", height: "100%", objectFit: "cover"}} />
            </div>
          </div>
          <div style={{height: "100%",display: "flex", flexFlow: "column", rowGap: 5, padding: "0 10px 10px 10px"}}>
            <div style={{fontSize: 14, fontWeight: 400}}>Букет из 29 роз</div>
            <div style={{fontSize: 14, fontWeight: 300, color: "#8F8E93", marginTop: "auto"}}>5 100,00 ₽ <span style={{display: "inline-block", textDecoration: "line-through", transform: "scale(.8)"}}>7 500,00 ₽</span></div>
          </div>
        </div>
        <div style={{position: "relative", width: "calc(50vw - 20px)", background: "#1C1C1E", borderRadius: 9, display: "flex", flexFlow: "column", rowGap: 10}}>
          <div style={{width: "calc(50vw - 20px)", height: "calc(50vw - 20px)", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <img src={require("./images/flowers3.avif")} alt="" style={{width: "100%", height: "100%", objectFit: "cover", borderRadius: 9}} />
          </div>
          <div style={{width: 28, height: 28, position: "absolute", top: "calc(50vw - 53px)", right: 0, left: 0, margin: "auto", opacity: .75}}>
            <img src={require("./images/add-to-cart.svg").default} alt="" style={{width: "100%", height: "100%", objectFit: "cover"}} />
          </div>
          <div style={{height: "100%", display: "flex", flexFlow: "column", rowGap: 5, padding: "0 10px 10px 10px"}}>
            <div style={{fontSize: 14, fontWeight: 400}}>Букет из 51 розы</div>
            <div style={{fontSize: 14, fontWeight: 300, color: "#8F8E93", marginTop: "auto"}}>8 700,00 ₽ <span style={{display: "inline-block", textDecoration: "line-through", transform: "scale(.8)"}}>10 100,00 ₽</span></div>
          </div>
        </div>
        <div style={{position: "relative", width: "calc(50vw - 20px)", background: "#1C1C1E", borderRadius: 9, display: "flex", flexFlow: "column", rowGap: 10}}>
          <div style={{width: "calc(50vw - 20px)", height: "calc(50vw - 20px)", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <img src={require("./images/flowers4.avif")} alt="" style={{width: "100%", height: "100%", objectFit: "cover", borderRadius: 9}} />
          </div>
          <div style={{width: 28, height: 28, position: "absolute", top: "calc(50vw - 53px)", right: 0, left: 0, margin: "auto", opacity: .75}}>
            <img src={require("./images/add-to-cart.svg").default} alt="" style={{width: "100%", height: "100%", objectFit: "cover"}} />
          </div>
          <div style={{height: "100%", display: "flex", flexFlow: "column", rowGap: 5, padding: "0 10px 10px 10px"}}>
            <div style={{fontSize: 14, fontWeight: 400, maxWidth: "100%"}}>Букет кустовых роз Лав Лидия</div>
            <div style={{fontSize: 14, fontWeight: 300, color: "#8F8E93", marginTop: "auto"}}>8 700,00 ₽ <span style={{display: "inline-block", textDecoration: "line-through", transform: "scale(.8)"}}>9 900,00 ₽</span></div>
          </div>
        </div>
      </div>}
      {view === "list" && 
      <div style={{display: "flex", flexFlow: "column", rowGap: 20, marginTop: 5}}>
        <div>
          <div style={{display: "flex", columnGap: 14, alignItems: "center"}}>
            <div style={{width: 80, height: 80, flexShrink: 0}}>
              <LazyLoadImage src={require("./images/flowers.avif")} placeholderSrc={require("./images/flowers.avif")} alt="" style={{width: "100%", height: "100%", objectFit: "cover", borderRadius: 9}} />
            </div>
            <div style={{display: "flex", flexFlow: "column", rowGap: 5}}>
              <div style={{fontSize: 14, fontWeight: 400}}>Букет из 19 роз</div>
              <div style={{fontSize: 14, fontWeight: 300, color: "#8F8E93"}}>2 700,00 ₽ <span style={{display: "inline-block", textDecoration: "line-through", transform: "scale(.8)"}}>4 400,00 ₽</span></div>
            </div>
            <div style={{marginLeft: "auto"}}>
              <div style={{width: 28, height: 28}}>
                <img src={require("./images/add-to-cart.svg").default} alt="" style={{width: "100%", height: "100%", objectFit: "cover"}} />
              </div>
            </div>
          </div>
          <div>
            
          </div>
        </div>
        <div>
          <div style={{display: "flex", columnGap: 14, alignItems: "center"}}>
            <div style={{width: 80, height: 80, flexShrink: 0}}>
              <LazyLoadImage src={require("./images/flowers2.avif")} placeholderSrc={require("./images/flowers.avif")} alt="" style={{width: "100%", height: "100%", objectFit: "cover", borderRadius: 9}} />
            </div>
            <div style={{display: "flex", flexFlow: "column", rowGap: 5}}>
              <div style={{fontSize: 14, fontWeight: 400}}>Букет из 29 роз</div>
              <div style={{fontSize: 14, fontWeight: 300, color: "#8F8E93"}}>5 100,00 ₽ <span style={{display: "inline-block", textDecoration: "line-through", transform: "scale(.8)"}}>7 500,00 ₽</span></div>
            </div>
            <div style={{marginLeft: "auto", display: "flex", alignItems: "center", columnGap: 10}}>
              <div style={{width: 28, height: 28}}>
                <img src={require("./images/remove-to-cart.svg").default} alt="" style={{width: "100%", height: "100%", objectFit: "cover"}} />
              </div>
              <div style={{fontSize: 16, fontWeight: 300, lineHeight: 1}}>1</div>
              <div style={{width: 28, height: 28}}>
                <img src={require("./images/add-to-cart.svg").default} alt="" style={{width: "100%", height: "100%", objectFit: "cover"}} />
              </div>
            </div>
          </div>
          <div>
            
          </div>
        </div>
        <div>
          <div style={{display: "flex", columnGap: 14, alignItems: "center"}}>
            <div style={{width: 80, height: 80, flexShrink: 0}}>
              <LazyLoadImage src={require("./images/flowers3.avif")} placeholderSrc={require("./images/flowers.avif")} alt="" style={{width: "100%", height: "100%", objectFit: "cover", borderRadius: 9}} />
            </div>
            <div style={{display: "flex", flexFlow: "column", rowGap: 5}}>
              <div style={{fontSize: 14, fontWeight: 400}}>Букет из 51 розы</div>
              <div style={{fontSize: 14, fontWeight: 300, color: "#8F8E93"}}>8 700,00 ₽ <span style={{display: "inline-block", textDecoration: "line-through", transform: "scale(.8)"}}>10 100,00 ₽</span></div>
            </div>
            <div style={{marginLeft: "auto", display: "flex", alignItems: "center", columnGap: 10}}>
              <div style={{width: 28, height: 28}}>
                <img src={require("./images/add-to-cart.svg").default} alt="" style={{width: "100%", height: "100%", objectFit: "cover"}} />
              </div>
            </div>
          </div>
          <div>
            
          </div>
        </div>
        <div>
          <div style={{display: "flex", columnGap: 14, alignItems: "center"}}>
            <div style={{width: 80, height: 80, flexShrink: 0}}>
              <LazyLoadImage src={require("./images/flowers4.avif")} placeholderSrc={require("./images/flowers.avif")} alt="" style={{width: "100%", height: "100%", objectFit: "cover", borderRadius: 9}} />
            </div>
            <div style={{display: "flex", flexFlow: "column", rowGap: 5}}>
              <div style={{fontSize: 14, fontWeight: 400}}>Букет кустовых роз Лав Лидия</div>
              <div style={{fontSize: 14, fontWeight: 300, color: "#8F8E93"}}>8 700,00 ₽ <span style={{display: "inline-block", textDecoration: "line-through", transform: "scale(.8)"}}>9 900,00 ₽</span></div>
            </div>
            <div style={{marginLeft: "auto", display: "flex", alignItems: "center", columnGap: 10}}>
              <div style={{width: 28, height: 28}}>
                <img src={require("./images/remove-to-cart.svg").default} alt="" style={{width: "100%", height: "100%", objectFit: "cover"}} />
              </div>
              <div style={{fontSize: 16, fontWeight: 300, lineHeight: 1}}>1</div>
              <div style={{width: 28, height: 28}}>
                <img src={require("./images/add-to-cart.svg").default} alt="" style={{width: "100%", height: "100%", objectFit: "cover"}} />
              </div>
            </div>
          </div>
          <div>
            
          </div>
        </div>
      </div>}
      <div style={{marginTop: 20}}>
        <Button text="Показать всё" handleClick={() => navigate("/search")} />
      </div>
      <div className={styles.information}>
        <div className={styles.informationblocks}>
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
