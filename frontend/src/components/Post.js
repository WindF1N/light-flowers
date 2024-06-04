import styles from '../screens/styles/Post.module.css';
import styles2 from '../screens/styles/Main.module.css';
import { useState, useEffect, useRef } from 'react';
import { useSpringRef, animated, useSpring, config } from '@react-spring/web';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Slider from './Slider';
import MiniSlider from './MiniSlider';
import Button from './Button';
import Hint from './Hint';

function Post({ data, type, parent }) {
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
  const colors = [
    "Белые",
    "Красные",
    "Черные",
    "Синие",
    "Желтые", 
    "Оранжевые",
    "Розовые",
    "Микс"
  ]
  const [ selectedColors, setSelectedColors ] = useState([]);
  const counts = [
    "19 роз",
    "29 роз",
    "51 роза",
    "101 роза"
  ]
  const [ selectedCounts, setSelectedCounts ] = useState([]);
  const sizes = [
    "50 см",
    "60 см",
    "70 см",
    "80 см"
  ]
  const [ selectedSizes, setSelectedSizes ] = useState([]);
  const packages = [
    "Лента",
    "Коробка",
    "Корзина",
    "Подарочной упаковка",
    "Классика"
  ]
  const [ selectedPackages, setSelectedPackages ] = useState([]);
  const [ posts, setPosts ] = useState([
    {
      _id: "1",
      images: [
        {
          _id: "i-1",
          file: require("../screens/images/flowers.avif"),
          file_lazy: require("../screens/images/flowers.avif")
        },
        {
          _id: "i-2",
          file: require("../screens/images/flowers2.avif"),
          file_lazy: require("../screens/images/flowers2.avif")
        },
        {
          _id: "i-3",
          file: require("../screens/images/flowers3.avif"),
          file_lazy: require("../screens/images/flowers3.avif")
        },
        {
          _id: "i-4",
          file: require("../screens/images/flowers4.avif"),
          file_lazy: require("../screens/images/flowers4.avif")
        },
        {
          _id: "i-5",
          file: require("../screens/images/flowers.avif"),
          file_lazy: require("../screens/images/flowers.avif")
        },
        {
          _id: "i-6",
          file: require("../screens/images/flowers2.avif"),
          file_lazy: require("../screens/images/flowers2.avif")
        },
        {
          _id: "i-7",
          file: require("../screens/images/flowers3.avif"),
          file_lazy: require("../screens/images/flowers3.avif")
        },
        {
          _id: "i-8",
          file: require("../screens/images/flowers4.avif"),
          file_lazy: require("../screens/images/flowers4.avif")
        }
      ],
      title: "Букет из 19 роз",
      price: "2 700,00 ₽",
      oldPrice: "4 400,00 ₽"
    },
    {
      _id: "2",
      images: [
        {
          _id: "i-2",
          file: require("../screens/images/flowers2.avif"),
          file_lazy: require("../screens/images/flowers2.avif")
        }
      ],
      title: "Букет из 29 роз",
      price: "5 100,00 ₽",
      oldPrice: "7 500,00 ₽"
    },
    {
      _id: "3",
      images: [
        {
          _id: "i-3",
          file: require("../screens/images/flowers3.avif"),
          file_lazy: require("../screens/images/flowers3.avif")
        }
      ],
      title: "Букет из 51 розы",
      price: "8 700,00 ₽",
      oldPrice: "10 100,00 ₽"
    },
    {
      _id: "4",
      images: [
        {
          _id: "i-4",
          file: require("../screens/images/flowers4.avif"),
          file_lazy: require("../screens/images/flowers4.avif")
        }
      ],
      title: "Букет кустовых роз Лав Лидия",
      price: "8 700,00 ₽",
      oldPrice: "9 900,00 ₽"
    },
    {
      _id: "5",
      images: [
        {
          _id: "i-5",
          file: require("../screens/images/flowers5.avif"),
          file_lazy: require("../screens/images/flowers5.avif")
        }
      ],
      title: "Букет кустовых роз Лав Лидия",
      price: "8 700,00 ₽",
      oldPrice: "9 900,00 ₽"
    },
    {
      _id: "6",
      images: [
        {
          _id: "i-6",
          file: require("../screens/images/flowers5.avif"),
          file_lazy: require("../screens/images/flowers5.avif")
        }
      ],
      title: "Букет кустовых роз Лав Лидия",
      price: "8 700,00 ₽",
      oldPrice: "9 900,00 ₽"
    }
  ]);
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
  return (
    <>
      {type === "block" &&
        <animated.div style={{width: "calc(50vw - 20px)", position: "relative", height: "100%", zIndex: 1, ...props}}>
          <div ref={postDivRef} onClick={toggle} style={{position: "relative", display: "flex", flexFlow: "column", rowGap: 10, height: "100%"}}>
            <div style={{flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", borderRadius: 9}}>
              <img src={data.images[0].file} alt="" style={{width: "100%", height: "100%", objectFit: "cover"}} />
            </div>
            <div style={{width: 28, height: 28, position: "absolute", top: "calc(50vw - 53px)", right: 0, left: 0, margin: "auto", opacity: .75}}>
              <img src={require("../screens/images/add-to-cart.svg").default} alt="" style={{width: "100%", height: "100%", objectFit: "cover"}} />
            </div>
            {/* <div style={{display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", top: "calc(50vw - 53px)", width: "calc(50vw - 20px)"}}>
              <div style={{width: 28, height: 28, marginRight: -3, zIndex: 1}}>
                <img src={require("./images/remove-to-cart.svg").default} alt="" style={{width: "100%", height: "100%", objectFit: "cover"}} />
              </div>
              <div style={{width: 34, height: 28, display: "flex", alignItems: "center", justifyContent: "center", background: "#1C1C1E", zIndex: 0}}>
                <div style={{fontSize: 16, fontWeight: 300, lineHeight: 1}}>1</div>
              </div>
              <div style={{width: 28, height: 28, marginLeft: -3, zIndex: 1}}>
                <img src={require("./images/add-to-cart.svg").default} alt="" style={{width: "100%", height: "100%", objectFit: "cover"}} />
              </div>
            </div> */}
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
              <img src={data.images[0].file} alt="" style={{width: "100%", height: "100%", objectFit: "cover"}} />
            </div>
            <div style={{height: "100%", display: "flex", flexFlow: "column", rowGap: 5, padding: "0 5px 5px 5px"}}>
              <div style={{fontSize: 14, fontWeight: 400}}>{data.title}</div>
              <div style={{fontSize: 14, fontWeight: 300, color: "#8F8E93"}}>{data.price}</div>
            </div>
          </div>
        </animated.div>}
      {type === "line" &&
        <div onClick={toggle}>
          <animated.div ref={postDivRef} style={{display: "flex", columnGap: 14, alignItems: "center", ...props}}>
            <div style={{minHeight: 80}}>
              <div style={{width: 80, height: 80, flexShrink: 0, overflow: "hidden", borderRadius: 9}}>
                <LazyLoadImage src={data.images[0].file} placeholderSrc={data.images[0].file_lazy} alt="" style={{width: "100%", height: "100%", objectFit: "cover"}} />
              </div>
            </div>
            <div style={{display: "flex", flexFlow: "column", rowGap: 5}}>
              <div style={{fontSize: 14, fontWeight: 400}}>{data.title}</div>
              <div style={{fontSize: 14, fontWeight: 300, color: "#8F8E93"}}>{data.price} <span style={{display: "inline-block", textDecoration: "line-through", transform: "scale(.8)"}}>{data.oldPrice}</span></div>
            </div>
            <div style={{marginLeft: "auto"}}>
              <div style={{width: 28, height: 28}}>
                <img src={require("../screens/images/add-to-cart.svg").default} alt="" style={{width: "100%", height: "100%", objectFit: "cover"}} />
              </div>
            </div>
            {/* <div style={{marginLeft: "auto", display: "flex", alignItems: "center", columnGap: 10}}>
              <div style={{width: 28, height: 28}}>
                <img src={require("./images/remove-to-cart.svg").default} alt="" style={{width: "100%", height: "100%", objectFit: "cover"}} />
              </div>
              <div style={{fontSize: 16, fontWeight: 300, lineHeight: 1}}>1</div>
              <div style={{width: 28, height: 28}}>
                <img src={require("./images/add-to-cart.svg").default} alt="" style={{width: "100%", height: "100%", objectFit: "cover"}} />
              </div>
            </div> */}
          </animated.div>
        </div>}
      {type === "old-normal" &&
        <animated.div onClick={toggle} ref={postDivRef} style={{width: "calc(50vw - 20px)", position: "relative", height: "100%", borderRadius: 9, overflow: "hidden", ...props}}>
          <div>
            <div style={{position: "relative", background: "#1C1C1E", display: "flex", flexFlow: "column", rowGap: 10, height: "100%", borderRadius: 9}}>
              <div style={{flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", borderRadius: 9}}>
                <img src={data.images[0].file} alt="" style={{width: "100%", height: "100%", objectFit: "cover"}} />
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
              <img src={data.images[0].file} alt="" style={{width: "100%", height: "100%", objectFit: "cover"}} />
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
              <img src={data.images[0].file} alt="" style={{width: "100%", height: "100%", objectFit: "cover"}} />
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
                <div style={{fontSize: 20, fontWeight: 300}}>{data.title} </div>
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
              <div className={styles.title} style={{padding: "0 15px"}}>{data.price} <span style={{display: "inline-block", textDecoration: "line-through", transform: "scale(.8)", color: "#8F8E93"}}>{data.oldPrice}</span></div>
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
                          background: selectedColors.includes(color) ? "#fff" : "rgb(24, 24, 26)",
                          fontSize: 14,
                          fontWeight: 300,
                          color: selectedColors.includes(color) ? "#000" : "#fff"
                        }}
                        onClick={() => {
                          if (selectedColors.includes(color)) {
                            setSelectedColors(prevState => prevState.filter((selectedColor) => color !== selectedColor))
                          } else {
                            setSelectedColors(prevState => [...prevState, color])
                          }
                        }}
                    >
                      {color}
                    </div>
                  ))}
                </div>
              </div>
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
                          background: selectedCounts.includes(count) ? "#fff" : "rgb(24, 24, 26)",
                          fontSize: 14,
                          fontWeight: 300,
                          color: selectedCounts.includes(count) ? "#000" : "#fff"
                        }}
                        onClick={() => {
                          if (selectedCounts.includes(count)) {
                            setSelectedCounts(prevState => prevState.filter((selectedCount) => count !== selectedCount))
                          } else {
                            setSelectedCounts(prevState => [...prevState, count])
                          }
                        }}
                    >
                      {count}
                    </div>
                  ))}
                </div>
              </div>
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
                          background: selectedSizes.includes(size) ? "#fff" : "rgb(24, 24, 26)",
                          fontSize: 14,
                          fontWeight: 300,
                          color: selectedSizes.includes(size) ? "#000" : "#fff"
                        }}
                        onClick={() => {
                          if (selectedSizes.includes(size)) {
                            setSelectedSizes(prevState => prevState.filter((selectedSize) => size !== selectedSize))
                          } else {
                            setSelectedSizes(prevState => [...prevState, size])
                          }
                        }}
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{padding: "0 15px 30px 15px"}}>
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
                          background: selectedPackages.includes(pckg) ? "#fff" : "rgb(24, 24, 26)",
                          fontSize: 14,
                          fontWeight: 300,
                          color: selectedPackages.includes(pckg) ? "#000" : "#fff"
                        }}
                        onClick={() => {
                          if (selectedPackages.includes(pckg)) {
                            setSelectedPackages(prevState => prevState.filter((selectedPackage) => pckg !== selectedPackage))
                          } else {
                            setSelectedPackages(prevState => [...prevState, pckg])
                          }
                        }}
                    >
                      {pckg}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{padding: "0 15px", display: "flex", alignItems: "center"}}>
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
              <div style={{padding: "30px 15px 15px 15px", fontSize: 16, fontWeight: 300}}>
                Смотрите также
              </div>
              <div style={{overflowX: "auto", width: "100vw"}} className="no-scrollbar">
                <div style={{padding: "0 15px", display: "flex", flexWrap: "nowrap", gap: 10}}>
                  {posts.map((post, index) => (
                    <div key={post._id} style={{paddingRight: index === posts.length - 1 ? 15 : 0}}>
                      <Post data={post} type="block-small" parent={
                        {
                          api,
                          modalApi,
                          modalApiMain,
                          modalApiCart,
                          setIsOpenPost
                        }
                      } />
                    </div>
                  ))}
                </div>
              </div>
              <div style={{padding: "15px", fontSize: 16, fontWeight: 300}}>
                Рекомендуем дополнить букет
              </div>
              <div style={{overflowX: "auto", width: "100vw"}} className="no-scrollbar">
                <div style={{padding: "0 15px", display: "flex", flexWrap: "nowrap", gap: 10}}>
                  {posts.map((post, index) => (
                    <div key={post._id} style={{paddingRight: index === posts.length - 1 ? 15 : 0}}>
                      <Post data={post} type="block-small" parent={
                        {
                          api,
                          modalApi,
                          modalApiMain,
                          modalApiCart,
                          setIsOpenPost
                        }
                      } />
                    </div>
                  ))}
                </div>
              </div>
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
                                    ...modalPropsCart}}>
                <div style={{display: "flex", flexFlow: "column"}}>
                  <div style={{fontSize: 14, fontWeight: 300, color: "#bbb", marginTop: "auto"}}>{data.price} <span style={{display: "inline-block", color: "#8F8E93", textDecoration: "line-through", transform: "scale(.8)"}}>{data.oldPrice}</span></div>
                  <div style={{fontSize: 14, fontWeight: 300, marginTop: 5}}>{data.title}</div>
                  <div style={{fontSize: 11, fontWeight: 300, marginTop: 2, color: "#8F8E93"}}>Открытка в подарок</div>
                </div>
                <div>
                  <Button text="В корзину" small={true} />
                </div>
              </animated.div>
            </animated.div>
          </div>
        </animated.div>}
    </>
  )
}

export default Post;
