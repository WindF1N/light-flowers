import styles from '../screens/styles/Post.module.css';
import styles2 from '../screens/styles/Main.module.css';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpringRef, animated, useSpring, config } from '@react-spring/web';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Slider from './Slider';
import MiniSlider from './MiniSlider';
import Button from './Button';
import Hint from './Hint';
import { useMainContext } from '../context';

function Post({ postData, type, parent, basePathUrl }) {
  const navigate = useNavigate();
  const [ data, setData ] = useState(postData);
  const { sendMessage, message, setMessage, cartItems, setCartItems } = useMainContext();
  const postDivRef = useRef();
  const [ isOpenPost, setIsOpenPost ] = useState(false);
  const api = useSpringRef();
  const modalApi = useSpringRef();
  const modalApiMain = useSpringRef();
  const modalMainRef = useRef();
  const modalApiCart = useSpringRef();
  const props = useSpring({
    ref: api,
    from: { transform: "scale(1)" },
  })
  const modalProps = useSpring({
    ref: modalApi,
    from: { backdropFilter: "blur(0vh)", WebkitBackdropFilter: "blur(0vh)", background: "rgba(0, 0, 0, 0)" },
  })
  const modalPropsMain = useSpring({
    ref: modalApiMain,
    from: { top: "100vh" },
  })
  const modalPropsCart = useSpring({
    ref: modalApiCart,
    from: { bottom: "-12vh" },
  })
  const scrollY = useRef();
  const toggle = () => {
    window.history.replaceState({}, '', '/card/' + data._id);
    sendMessage(JSON.stringify(["cards", "filter", {"category": "Розы с любовью" }, 6]))
    sendMessage(JSON.stringify(["cards", "filter", {"category": "Подарки"}, 6]))
    api.start({ transform: "scale(1.05)", config: { duration: 200 } });
    setTimeout(() => {
      api.start({ transform: "scale(1)", config: { duration: 200 } });
    }, 200);
    if (!isOpenPost) {
      modalApi.start({ backdropFilter: "blur(0.5vh)", WebkitBackdropFilter: "blur(0.5vh)", background: "rgba(0, 0, 0, .4)", config: { duration: 300 } });
      setTimeout(() => {
        modalApiMain.start({ top: "0vh", config: { duration: 300 } });
      }, 100)
      setTimeout(() => {
        modalApiCart.start({ bottom: "0vh", config: { duration: 300 } });
      }, 300)
      if (!parent) {
        scrollY.current = window.scrollY;
        document.querySelector("html").style.overflow = "hidden";
        document.querySelector("body").style.overflow = "hidden";
        document.querySelector("body").style.position = "fixed";
        document.querySelector("body").style.top = `-${scrollY.current}px`
      }
    }
    setIsOpenPost(!isOpenPost);
  }
  const imagesDivRef = useRef();
  const [ activeImage, setActiveImage ] = useState(null);
  const colors = data.colors || [];
  const [ selectedColor, setSelectedColor ] = useState(null);
  const counts = data.counts || [];
  const [ selectedCount, setSelectedCount ] = useState(null);
  const sizes = data.sizes || [];
  const [ selectedSize, setSelectedSize ] = useState(null);
  const packages = data.packages || [];
  const [ selectedPackage, setSelectedPackage ] = useState(null);
  const [ posts, setPosts ] = useState([]);
  const [ touchStartY, setTouchStartY ] = useState(null);
  const [ modalMainTopOffset, setModalMainTopOffset ] = useState(null);
  const closing = useRef(false);
  const handleTouchStart = (e) => {
    setTouchStartY(e.touches[0].screenY);
    if (modalMainRef.current) {
      setModalMainTopOffset(modalMainRef.current.getBoundingClientRect().top)
    }
  }
  const handleTouchMove = (e) => {
    if (modalMainRef.current && !closing.current) {
      if (touchStartY < e.touches[0].screenY) {
        modalMainRef.current.style.top = `${e.touches[0].screenY - touchStartY}px`;
        if (modalMainRef.current?.getBoundingClientRect().top > window.innerHeight * .4) {
          if (!parent) {
            window.history.replaceState({}, '', basePathUrl);
          } else {
            window.history.replaceState({}, '', '/card/' + parent._id);
          }
          setPosts([]);
          closing.current = true;
          modalApiMain.set({ top: `${e.touches[0].screenY - touchStartY}px`})
          modalApi.start({ backdropFilter: "blur(0vh)", WebkitBackdropFilter: "blur(0vh)", background: "rgba(0, 0, 0, 0)", config: { duration: 300 } });
          setTimeout(() => {
            modalApiMain.start({ top: `${window.innerHeight}px`, config: { duration: 200 } });
          }, 100)
          setTimeout(() => {
            modalApiCart.start({ bottom: "-12vh", config: { duration: 100 } });
          }, 300)
          setTimeout(() => {
            if (!parent) {
              document.querySelector("html").style.overflow = "auto";
              document.querySelector("body").style.overflow = "auto";
              document.querySelector("body").style.position = "relative";
              document.querySelector("body").style.top = "0px";
              window.scrollTo({ top: scrollY.current })
            }
            closing.current = false;
            setIsOpenPost(false);
          }, 600)
        }
      }
    }
  }
  const handleTouchEnd = (e) => {
    if (modalMainRef.current?.getBoundingClientRect().top < window.innerHeight * .4 && !closing.current) {
      modalApiMain.set({ top: `${modalMainRef.current?.getBoundingClientRect().top - window.innerHeight / 10}px` })
      setTimeout(() => {
        modalApiMain.start({ top: `0px`, config: { duration: 200 } });
      }, 100)
    }
  }
  const [ newPrice, setNewPrice ] = useState(null);
  useEffect(() => {
    setData(prevState => ({...prevState, selectedColor: selectedColor, selectedCount: selectedCount, selectedPackage: selectedPackage, selectedSize: selectedSize }))
    for (let i = 0; i < data.prices?.length; i++) {
      const price = data.prices[i];
      let checked = [0, 0, 0, 0]
      if (price.colors.length > 0) {
        if (price.colors.includes(selectedColor)) {
          checked[0] = 1;
        }
      } else {
        checked[0] = 1;
      };
      if (price.counts.length > 0) {
        if (price.counts.includes(selectedCount)) {
          checked[1] = 1;
        }
      } else {
        checked[1] = 1;
      };
      if (price.packages.length > 0) {
        if (price.packages.includes(selectedPackage)) {
          checked[2] = 1;
        }
      } else {
        checked[2] = 1;
      };
      if (price.sizes.length > 0) {
        if (price.sizes.includes(selectedSize)) {
          checked[3] = 1;
        }
      } else {
        checked[3] = 1;
      };
      if (JSON.stringify(checked) === JSON.stringify([1, 1, 1, 1])) {
        setNewPrice(price);
        return
      }
    }
    setNewPrice(null)
  }, [selectedColor, selectedCount, selectedPackage, selectedSize]);
  useEffect(() => {
    if (message && window.location.pathname === '/card/' + data._id) {
      if (message[0] === 'cards') {
        if (message[1] === 'filter') {
          setPosts(prevState => [...prevState.filter(item => {
            const isInMessage = message[2].some(msgItem => msgItem._id === item._id);
            return !isInMessage;
          }), ...message[2]]);
        }
      }
      setMessage(null);
    };
  }, [message]);
  const apiRemoveFromCart = useSpringRef();
  const propsRemoveFromCart = useSpring({
    ref: apiRemoveFromCart,
    from: { right: 0, left: 0 },
  })
  const apiAddFromCart = useSpringRef();
  const propsAddFromCart = useSpring({
    ref: apiAddFromCart,
    from: { right: 0, left: 0 },
  })
  const divCountItemsCartRef = useRef();
  const apiCountItemsCart = useSpringRef();
  const propsCountItemsCart = useSpring({
    ref: apiCountItemsCart,
    from: { opacity: 0 },
  })
  const handleCart = (e, type) => {
    e.stopPropagation();
    if (type === 1) {
      setCartItems(prevState => {
        // Ищем индекс элемента в массиве, который мы хотим обновить
        const index = prevState.findIndex(item => JSON.stringify(item.product) === JSON.stringify(data));
        // Если элемент найден, увеличиваем его count на 1
        if (index !== -1) {
          return prevState.map((item, i) => {
            if (i === index && item.count !== 100) {
              return { ...item, count: item.count + 1 };
            }
            return item;
          });
        }
        // Если элемент не найден, добавляем новый элемент в массив с count равным 1
        return [...prevState, { product: data, count: 1 }];
      });
      if (divCountItemsCartRef.current) {
        apiRemoveFromCart.start({right: divCountItemsCartRef.current.clientWidth, config: {duration: 200}});
        apiAddFromCart.start({left: divCountItemsCartRef.current.clientWidth, config: {duration: 200}});
        apiCountItemsCart.start({opacity: 1, config: {duration: 400}});
      }
    } else if (type === 0) {
      setCartItems(prevState => {
        // Ищем индекс элемента в массиве, который мы хотим обновить
        const index = prevState.findIndex(item => JSON.stringify(item.product) === JSON.stringify(data));
        // Если элемент найден, уменьшаем его count на 1
        if (index !== -1) {
          const updatedItem = { ...prevState[index], count: prevState[index].count - 1 };
          if (updatedItem.count === 0) {
            if (divCountItemsCartRef.current) {
              apiRemoveFromCart.start({right: 0, config: {duration: 200}});
              apiAddFromCart.start({left: 0, config: {duration: 200}});
              apiCountItemsCart.start({opacity: 0, config: {duration: 200}});
            }
            // Если количество стало равным 0, удаляем элемент из массива
            return prevState.filter((_, i) => i !== index);
          } else {
            if (divCountItemsCartRef.current) {
              apiRemoveFromCart.start({right: divCountItemsCartRef.current.clientWidth, config: {duration: 200}});
              apiAddFromCart.start({left: divCountItemsCartRef.current.clientWidth, config: {duration: 200}});
              apiCountItemsCart.start({opacity: 1, config: {duration: 400}});
            }
            // Иначе обновляем количество
            return prevState.map((item, i) => i === index ? updatedItem : item);
          }
        }
        if (divCountItemsCartRef.current) {
          apiRemoveFromCart.start({right: divCountItemsCartRef.current.clientWidth, config: {duration: 200}});
          apiAddFromCart.start({left: divCountItemsCartRef.current.clientWidth, config: {duration: 200}});
          apiCountItemsCart.start({opacity: 1, config: {duration: 400}});
        }
        // Если элемент не найден, возвращаем предыдущее состояние
        return prevState;
      });
    };
  }
  useEffect(() => {
    if (divCountItemsCartRef.current) {
      if (cartItems.filter((item) => JSON.stringify(item.product) === JSON.stringify(data)).length > 0) {
        apiRemoveFromCart.start({right: divCountItemsCartRef.current.clientWidth, config: {duration: 200}});
        apiAddFromCart.start({left: divCountItemsCartRef.current.clientWidth, config: {duration: 200}});
        apiCountItemsCart.start({opacity: 1, config: {duration: 400}});
      }
    };
    setData(prevState => ({...prevState, selectedColor: selectedColor, selectedCount: selectedCount, selectedPackage: selectedPackage, selectedSize: selectedSize }))
  }, [divCountItemsCartRef.current])
  return (
    <>
      {type === "block" &&
        <animated.div style={{width: "calc(50vw - 20px)", position: "relative", height: "100%", zIndex: 1, ...props}}>
          <div ref={postDivRef} onClick={toggle} style={{position: "relative", display: "flex", flexFlow: "column", rowGap: 10, height: "100%"}}>
            <div style={{flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", borderRadius: 9, height: "calc(50vw - 20px)"}}>
              <LazyLoadImage src={data.images[0].file} placeholderSrc={data.images[0].file_lazy} style={{width: "100%", height: "100%", objectFit: "cover"}} />
            </div>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", top: "calc(50vw - 53px)", width: "calc(50vw - 20px)", height: 28}}>
              <animated.div onClick={(e) => handleCart(e, 0)} style={{width: 28, height: 28, zIndex: 1, position: "absolute", left: 0, right: 0, margin: "auto", display: "flex", alignItems: "center", justifyContent: "center", ...propsRemoveFromCart}}>
                <img src={require("../screens/images/remove-to-cart.svg").default} alt="" style={{width: "100%", height: "100%", objectFit: "cover"}} />
              </animated.div>
              <animated.div ref={divCountItemsCartRef} style={{borderRadius: 4, padding: "0 28px", height: 28, display: "flex", alignItems: "center", justifyContent: "center", background: "#1C1C1E", zIndex: 0, ...propsCountItemsCart}}>
                <div style={{fontSize: 16, fontWeight: 300, lineHeight: 1}}>{cartItems.filter((item) => JSON.stringify(item.product) === JSON.stringify(data))[0]?.count}</div>
              </animated.div>
              <animated.div onClick={(e) => handleCart(e, 1)} style={{width: 28, height: 28, zIndex: 1, position: "absolute", left: 0, right: 0, margin: "auto", display: "flex", alignItems: "center", justifyContent: "center", ...propsAddFromCart}}>
                <img src={require("../screens/images/add-to-cart.svg").default} alt="" style={{width: "100%", height: "100%", objectFit: "cover"}} />
              </animated.div>
            </div>
            <div style={{height: "100%", display: "flex", flexFlow: "column", rowGap: 5, padding: "0 5px 5px 5px"}}>
              <div style={{fontSize: 14, fontWeight: 400}}>{data.title}</div>
              <div style={{fontSize: 14, fontWeight: 300, color: "#8F8E93"}}>{data.price} <span style={{display: "inline-block", textDecoration: "line-through", transform: "scale(.8)"}}>{data.oldPrice}</span></div>
            </div>
          </div>
        </animated.div>}
      {type === "block-small" &&
        <animated.div style={{width: "calc(40vw - 20px)", position: "relative", height: "100%", zIndex: 1, ...props}}>
          <div ref={postDivRef} onClick={toggle} style={{position: "relative", display: "flex", flexFlow: "column", rowGap: 10, height: "100%"}}>
            <div style={{flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", borderRadius: 9}}>
              <LazyLoadImage visibleByDefault={true} src={data.images[0].file} placeholderSrc={data.images[0].file_lazy} style={{width: "100%", height: "100%", objectFit: "cover"}} />
            </div>
            <div style={{height: "100%", display: "flex", flexFlow: "column", rowGap: 5, padding: "0 5px 5px 5px"}}>
              <div style={{fontSize: 14, fontWeight: 400}}>{data.title}</div>
              <div style={{fontSize: 14, fontWeight: 300, color: "#8F8E93"}}>{data.price}</div>
            </div>
          </div>
        </animated.div>}
      {type === "line" &&
        <div onClick={toggle}>
          <animated.div ref={postDivRef} style={{display: "flex", columnGap: 14, alignItems: "center", position: "relative", ...props}}>
            <div style={{minHeight: 80}}>
              <div style={{width: 80, height: 80, flexShrink: 0, overflow: "hidden", borderRadius: 9}}>
                <LazyLoadImage src={data.images[0].file} placeholderSrc={data.images[0].file_lazy} alt="" style={{width: "100%", height: "100%", objectFit: "cover"}} />
              </div>
            </div>
            <div style={{display: "flex", flexFlow: "column", rowGap: 5}}>
              <div style={{fontSize: 14, fontWeight: 400}}>{data.title}</div>
              <div style={{fontSize: 14, fontWeight: 300, color: "#8F8E93"}}>{data.price} <span style={{display: "inline-block", textDecoration: "line-through", transform: "scale(.8)"}}>{data.oldPrice}</span></div>
            </div>
            <div style={{marginLeft: "auto", height: 28, width: 86, position: "relative", flexShrink: 0}}>
              <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: 28, flexShrink: 0, width: "100%"}}>
                <animated.div onClick={(e) => handleCart(e, 0)} style={{width: 28, height: 28, zIndex: 1, position: "absolute", left: 0, right: 0, marginLeft: "auto", display: "flex", alignItems: "center", justifyContent: "center", ...propsRemoveFromCart}}>
                  <img src={require("../screens/images/remove-to-cart.svg").default} alt="" style={{width: "100%", height: "100%", objectFit: "cover"}} />
                </animated.div>
                <animated.div ref={divCountItemsCartRef} style={{width: "67.5%", height: 28, display: "flex", alignItems: "center", justifyContent: "center", background: "#1C1C1E", zIndex: 0, ...propsCountItemsCart}}>
                  <div style={{fontSize: 16, fontWeight: 300, lineHeight: 1}}>{cartItems.filter((item) => JSON.stringify(item.product) === JSON.stringify(data))[0]?.count}</div>
                </animated.div>
                <animated.div onClick={(e) => handleCart(e, 1)} style={{width: 28, height: 28, zIndex: 1, position: "absolute", left: 0, right: 0, marginLeft: "auto", display: "flex", alignItems: "center", justifyContent: "center", ...propsAddFromCart}}>
                  <img src={require("../screens/images/add-to-cart.svg").default} alt="" style={{width: "100%", height: "100%", objectFit: "cover"}} />
                </animated.div>
              </div>
            </div>
          </animated.div>
        </div>}
      {type === "old-normal" &&
        <animated.div onClick={toggle} ref={postDivRef} style={{width: "calc(50vw - 20px)", position: "relative", height: "100%", borderRadius: 9, overflow: "hidden", ...props}}>
          <div>
            <div style={{position: "relative", background: "#1C1C1E", display: "flex", flexFlow: "column", rowGap: 10, height: "100%", borderRadius: 9}}>
              <div style={{flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", borderRadius: 9, height: "calc(50vw - 20px)"}}>
                <LazyLoadImage src={data.images[0].file} placeholderSrc={data.images[0].file_lazy} style={{width: "100%", height: "100%", objectFit: "cover"}} />
              </div>
              <div style={{width: "calc(100% - 20px)", display: "flex", flexFlow: "column", rowGap: 5, padding: "60px 10px 10px 10px", position: "absolute", bottom: 0, left: 0, background: "linear-gradient(to top, rgba(24, 24, 26, .9) 10%, rgba(24, 24, 26, 0) 100%)"}}>
                <div style={{fontSize: 14, fontWeight: 400, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>{data.title}</div>
                <div style={{fontSize: 14, fontWeight: 300, color: "#8F8E93", marginTop: "auto"}}>{data.price} <span style={{display: "inline-block", textDecoration: "line-through", transform: "scale(.8)"}}>{data.oldPrice}</span></div>
              </div>
            </div>
          </div>
        </animated.div>}
      {type === "old-big" &&
        <animated.div onClick={toggle} ref={postDivRef} style={{width: "calc(100vw - 30px)", height: "calc(60vw - 30px)", position: "relative", borderRadius: 9, overflow: "hidden", ...props}}>
          <div style={{position: "relative", background: "#1C1C1E", display: "flex", flexFlow: "column", rowGap: 10, height: "100%", borderRadius: 9}}>
            <div style={{flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", borderRadius: 9}}>
              <LazyLoadImage src={data.images[0].file} placeholderSrc={data.images[0].file_lazy} style={{width: "100%", height: "100%", objectFit: "cover"}} />
            </div>
            <div style={{width: "calc(100% - 20px)", display: "flex", flexFlow: "column", rowGap: 5, padding: "60px 10px 10px 10px", position: "absolute", bottom: 0, left: 0, background: "linear-gradient(to top, rgba(24, 24, 26, .9) 10%, rgba(24, 24, 26, 0) 100%)"}}>
              <div style={{fontSize: 14, fontWeight: 400, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>{data.title}</div>
              <div style={{fontSize: 14, fontWeight: 300, color: "#8F8E93", marginTop: "auto"}}>{data.price} <span style={{display: "inline-block", textDecoration: "line-through", transform: "scale(.8)"}}>{data.oldPrice}</span></div>
            </div>
          </div>
        </animated.div>}
      {type === "old-small" &&
        <animated.div onClick={toggle} ref={postDivRef} style={{width: "calc(33.3333vw - 17px)", height: "calc(33.3333vw - 15px)", position: "relative", borderRadius: 9, overflow: "hidden", ...props}}>
          <div style={{position: "relative", background: "#1C1C1E", display: "flex", flexFlow: "column", rowGap: 10, height: "100%", borderRadius: 9}}>
            <div style={{flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", borderRadius: 9}}>
              <LazyLoadImage src={data.images[0].file} placeholderSrc={data.images[0].file_lazy} style={{width: "100%", height: "100%", objectFit: "cover"}} />
            </div>
            <div style={{width: "calc(100% - 20px)", display: "flex", flexFlow: "column", rowGap: 5, padding: "60px 10px 10px 10px", position: "absolute", bottom: 0, left: 0, background: "linear-gradient(to top, rgba(24, 24, 26, .9) 10%, rgba(24, 24, 26, 0) 100%)"}}>
              <div style={{fontSize: 14, fontWeight: 400, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>{data.title}</div>
              <div style={{fontSize: 14, fontWeight: 300, color: "#8F8E93", marginTop: "auto"}}>{data.price}</div>
            </div>
          </div>
        </animated.div>}
      {isOpenPost &&
        <animated.div style={{
                        position: "fixed", 
                        left: 0, 
                        top: 0, 
                        width: "100vw", 
                        height: "100vh",
                        zIndex: 99999,
                        display: "flex",
                        ...modalProps
                      }}>
          <div style={{
            overflowY: "auto",
            overflowX: "hidden",
          }}>
            <animated.div style={{background: "linear-gradient(to top, rgba(0, 0, 0, 1) 50%, rgba(26, 24, 24, 1) 100%)", 
                                  width: "100vw",
                                  minHeight: "100vh",
                                  paddingBottom: 300,
                                  borderTopLeftRadius: 25, 
                                  borderTopRightRadius: 25, 
                                  position: "relative",
                                  marginTop: "10vh",
                                  ...modalPropsMain}}
                          ref={modalMainRef}>
              <div
                style={{position: "absolute", top: "-10vh", height: "10vh", width: "100vw", display: "flex", justifyContent: "center"}}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div style={{marginTop: "auto", marginBottom: 20, width: "40vw", height: 4, borderRadius: 2, backgroundColor: "#bbb"}}></div>
              </div>
              <Slider images={data.images} imagesDivRef={imagesDivRef} setActiveImage={setActiveImage} />
              {data.images.length > 1 &&
                <div style={{marginTop: "-18vw", position: "relative", zIndex: 3}}>
                  <MiniSlider images={data.images} imagesDivRef={imagesDivRef} activeImage={activeImage} />
                </div>}
              <div className={styles.price} style={{padding: data.images.length > 1 ? "30px 15px 10px 15px" : "10px 15px 10px 15px"}}>
                <div className={styles.title}>{!newPrice ? data.price : newPrice.price} <span style={{display: "inline-block", textDecoration: "line-through", transform: "scale(.8)", color: "#8F8E93"}}>{!newPrice ? data.oldPrice : newPrice.oldPrice}</span></div>
                <div className={styles.actions}>
                  <div className={styles.action} style={{color: "#8F8E93"}}>
                    <img src={require("../screens/images/compare.svg").default} alt="" />
                    Сравнить
                  </div>
                  <div className={styles.action} style={{color: "#8F8E93"}}>
                    <img src={require("../components/images/like.svg").default} alt="" />
                    Избранное
                  </div>
                  <div className={styles.action} style={{color: "#8F8E93"}}>
                    <img src={require("../screens/images/share.svg").default} alt="" />
                    Поделиться
                  </div>
                </div>
              </div>
              <div style={{fontSize: 18, fontWeight: 300, padding: "5px 15px"}}>{data.title} </div>
              {colors.length > 0 &&
              <div style={{padding: "20px 15px 30px 15px"}}>
                <div style={{fontSize: 16, fontWeight: 300, paddingBottom: 10, color: "#bbb"}}>Цвет</div>
                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 10
                }}>
                  {colors.map((color, index) => (
                    <div key={"color" + index} 
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "4px 7px",
                          borderRadius: 4,
                          background: selectedColor === color ? "#fff" : "rgb(24, 24, 26)",
                          fontSize: 14,
                          fontWeight: 300,
                          color: selectedColor === color ? "#000" : "#fff"
                        }}
                        onClick={() => {
                          if (selectedColor === color) {
                            setSelectedColor(null);
                          } else {
                            setSelectedColor(color);
                          }
                        }}
                    >
                      {color}
                    </div>
                  ))}
                </div>
              </div>}
              {counts.length > 0 &&    
              <div style={{padding: "0 15px 30px 15px"}}>
                <div style={{fontSize: 16, fontWeight: 300, paddingBottom: 10, color: "#bbb"}}>Количество цветов</div>
                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 10
                }}>
                  {counts.map((count, index) => (
                    <div key={"count" + index} 
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "4px 7px",
                          borderRadius: 4,
                          background: selectedCount === count ? "#fff" : "rgb(24, 24, 26)",
                          fontSize: 14,
                          fontWeight: 300,
                          color: selectedCount === count ? "#000" : "#fff"
                        }}
                        onClick={() => {
                          if (selectedCount === count) {
                            setSelectedCount(null)
                          } else {
                            setSelectedCount(count)
                          }
                        }}
                    >
                      {count}
                    </div>
                  ))}
                </div>
              </div>}
              {sizes.length > 0 &&
              <div style={{padding: "0 15px 30px 15px"}}>
                <div style={{fontSize: 16, fontWeight: 300, paddingBottom: 10, color: "#bbb"}}>Размер букета</div>
                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 10
                }}>
                  {sizes.map((size, index) => (
                    <div key={"size" + index} 
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "4px 7px",
                          borderRadius: 4,
                          background: selectedSize === size ? "#fff" : "rgb(24, 24, 26)",
                          fontSize: 14,
                          fontWeight: 300,
                          color: selectedSize === size ? "#000" : "#fff"
                        }}
                        onClick={() => {
                          if (selectedSize === size) {
                            setSelectedSize(null)
                          } else {
                            setSelectedSize(size)
                          }
                        }}
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>}
              {sizes.length > 0 &&
              <div style={{padding: "0 15px 0px 15px"}}>
                <div style={{fontSize: 16, fontWeight: 300, paddingBottom: 10, color: "#bbb"}}>Упаковка</div>
                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 10
                }}>
                  {packages.map((pckg, index) => (
                    <div key={"package" + index} 
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "4px 7px",
                          borderRadius: 4,
                          background: selectedPackage === pckg ? "#fff" : "rgb(24, 24, 26)",
                          fontSize: 14,
                          fontWeight: 300,
                          color: selectedPackage === pckg ? "#000" : "#fff"
                        }}
                        onClick={() => {
                          if (selectedPackage === pckg) {
                            setSelectedPackage(null)
                          } else {
                            setSelectedPackage(pckg)
                          }
                        }}
                    >
                      {pckg}
                    </div>
                  ))}
                </div>
              </div>}
              <div style={{padding: "30px 15px 0 15px", display: "flex", alignItems: "center"}}>
                <div style={{marginLeft: -12, display: "flex", alignItems: "center"}}>
                  <img src={require("../screens/images/clock.svg").default} alt="" height={50} />
                </div>
                <div style={{fontSize: 15, fontWeight: 300}}>
                  Купить в один клик
                </div>
              </div>
              <div style={{padding: "0 15px", display: "flex", gap: 8}}>
                <div style={{width: "100%"}}>
                  <Button text={"Позвонить"} />
                </div>
                <div>
                  <img src={require("../screens/images/telegram.svg").default} className="" alt="telegram" style={{height: 47}} />
                </div>
                <div>
                  <img src={require("../screens/images/whatsapp.svg").default} className="" alt="whatsapp" style={{height: 47}} />
                </div>
              </div>
              <Hint />
              {posts.filter((post) => post.category === "Розы с любовью" && post._id !== data._id).length > 0 &&
              <>
                <div style={{padding: "30px 15px 15px 15px", fontSize: 16, fontWeight: 300}}>
                  Смотрите также
                </div>
                <div style={{overflowX: "auto", width: "100vw"}} className="no-scrollbar">
                  <div style={{padding: "0 15px", display: "flex", flexWrap: "nowrap", gap: 10}}>
                    {posts.filter((post) => post.category === "Розы с любовью" && post._id !== data._id).map((post, index) => (
                      <div key={post._id} style={{paddingRight: index === posts.length - 1 ? 15 : 0}}>
                        <Post postData={post} type="block-small" parent={
                          {
                            api,
                            modalApi,
                            modalApiMain,
                            modalApiCart,
                            setIsOpenPost,
                            _id: data._id
                          }
                        } />
                      </div>
                    ))}
                  </div>
                </div>
              </>}
              {(posts.filter((post) => post.category === "Подарки" && post._id !== data._id).length > 0) &&
              <>
                <div style={{padding: "15px", fontSize: 16, fontWeight: 300}}>
                  Рекомендуем дополнить букет
                </div>
                <div style={{overflowX: "auto", width: "100vw"}} className="no-scrollbar">
                  <div style={{padding: "0 15px", display: "flex", flexWrap: "nowrap", gap: 10}}>
                    {posts.filter((post) => post.category === "Подарки" && post._id !== data._id).map((post, index) => (
                      <div key={post._id} style={{paddingRight: index === posts.length - 1 ? 15 : 0}}>
                        <Post postData={post} type="block-small" parent={
                          {
                            api,
                            modalApi,
                            modalApiMain,
                            modalApiCart,
                            setIsOpenPost,
                            _id: data._id
                          }
                        } />
                      </div>
                    ))}
                  </div>
                </div>
              </>}
              <footer className={styles2.footer} style={{minHeight: "0", marginTop: 20}}>
                <div style={{display: "flex", flexFlow: "column", padding: "20px 15px 10px 15px"}}>
                  <div style={{fontSize: 16, fontWeight: 300, color: "#fff", paddingBottom: 5}}>Не нашли что искали?</div>
                  <div style={{fontSize: 14, fontWeight: 300, color: "#bbb"}}>
                    Отправьте сообщение или позвоните
                    подберем самый подходящий букет для
                    вашего мероприятия
                  </div>
                </div>
                <div className={styles2.contacts} style={{padding: "0 15px"}}>
                  <div className={styles2.telephone}>+7 966 775 79 66</div>
                  <div className={styles2.icons}>
                    <img src={require("../screens/images/telegram.svg").default} className="" alt="telegram" />
                    <img src={require("../screens/images/whatsapp.svg").default} className="" alt="whatsapp" />
                  </div>
                </div>
              </footer>
              <animated.div style={{width: "100%",
                                    boxSizing: "border-box",
                                    height: "12vh",
                                    padding: "0 20px",
                                    background: "linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(26, 24, 24, 1) 100%)", 
                                    position: "fixed",
                                    marginTop: 30, 
                                    zIndex: 10000,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    paddingBottom: 5,
                                    gap: 10,
                                    ...modalPropsCart}}>
                <div style={{display: "flex", flexFlow: "column"}}>
                  <div style={{fontSize: 14, fontWeight: 300, color: "#bbb", marginTop: "auto"}}>{!newPrice ? data.price : newPrice.price} <span style={{display: "inline-block", color: "#8F8E93", textDecoration: "line-through", transform: "scale(.8)"}}>{!newPrice ? data.oldPrice : newPrice.oldPrice}</span></div>
                  <div style={{fontSize: 14, fontWeight: 300, marginTop: 5}}>{data.title}</div>
                  <div style={{fontSize: 11, fontWeight: 300, marginTop: 2, color: "#8F8E93"}}>Открытка в подарок</div>
                </div>
                <div style={{flexShrink: 0}}>
                  {cartItems.filter((item) => JSON.stringify(item.product) === JSON.stringify(data)).length > 0 ?
                  <div style={{display: "flex", alignItems: "flex-end", flexFlow: "column", gap: 10}}>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: 28, flexShrink: 0}}>
                      <div onClick={(e) => handleCart(e, 0)} style={{marginRight: -4, width: 28, height: 28, zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <img src={require("../screens/images/remove-to-cart.svg").default} alt="" style={{width: "100%", height: "100%", objectFit: "cover"}} />
                      </div>
                      <div style={{width: 44, height: 28, display: "flex", alignItems: "center", justifyContent: "center", background: "#1C1C1E", zIndex: 0}}>
                        <div style={{fontSize: 16, fontWeight: 300, lineHeight: 1}}>{cartItems.filter((item) => JSON.stringify(item.product) === JSON.stringify(data))[0]?.count}</div>
                      </div>
                      <div onClick={(e) => handleCart(e, 1)} style={{marginLeft: -4, width: 28, height: 28, zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <img src={require("../screens/images/add-to-cart.svg").default} alt="" style={{width: "100%", height: "100%", objectFit: "cover"}} />
                      </div>
                    </div>
                    <Button text="Оформить" small={true} handleClick={(e) => {
                      document.querySelector("html").style.overflow = "auto";
                      document.querySelector("body").style.overflow = "auto";
                      document.querySelector("body").style.position = "relative";
                      document.querySelector("body").style.top = "0px";
                      navigate("/cart")
                    }} />
                  </div>
                  : <Button text="В корзину" small={true} handleClick={(e) => handleCart(e, 1)} />}
                </div>
              </animated.div>
            </animated.div>
          </div>
        </animated.div>}
    </>
  )
}

export default Post;
