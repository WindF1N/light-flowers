import { useState, useEffect, useRef } from 'react';
import { useSpringRef, animated, useSpring, config } from '@react-spring/web';
import ScrollToError from './ScrollToError';
import { Formik, Form } from 'formik';
import Button from './Button';
import FormLIGHT from './FormLIGHT';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

function AddPrice({ data }) {
  const [ inputs, setInputs ] = useState({
    "price": {
      value: null,
      isFocused: false,
      error: null,
      label: "Цена, ₽",
      type: "text",
      mask: createNumberMask({
        prefix: '',
        suffix: ' ₽',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: ' ',
        allowDecimal: false,
        decimalSymbol: null,
        decimalLimit: 0, // количество знаков после запятой
        integerLimit: 12, // максимальное количество цифр до запятой
        allowNegative: false,
        allowLeadingZeroes: false,
      })
    },
    "oldPrice": {
      value: null,
      isFocused: false,
      error: null,
      label: "Старая цена, ₽",
      type: "text",
      mask: createNumberMask({
        prefix: '',
        suffix: ' ₽',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: ' ',
        allowDecimal: false,
        decimalSymbol: null,
        decimalLimit: 0, // количество знаков после запятой
        integerLimit: 12, // максимальное количество цифр до запятой
        allowNegative: false,
        allowLeadingZeroes: false,
      })
    },
  });
  const [ isOpen, setIsOpen ] = useState(false);
  const api = useSpringRef();
  const modalApi = useSpringRef();
  const modalApiMain = useSpringRef();
  const modalMainRef = useRef();
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
  const scrollY = useRef();
  const toggle = () => {
    api.start({ transform: "scale(1.05)", config: { duration: 200 } });
    setTimeout(() => {
      api.start({ transform: "scale(1)", config: { duration: 200 } });
    }, 200);
    if (!isOpen) {
      modalApi.start({ backdropFilter: "blur(0.5vh)", WebkitBackdropFilter: "blur(0.5vh)", background: "rgba(0, 0, 0, .4)", config: { duration: 300 } });
      setTimeout(() => {
        modalApiMain.start({ top: "0vh", config: { duration: 300 } });
      }, 100)
      scrollY.current = window.scrollY;
      document.querySelector("html").style.overflow = "hidden";
      document.querySelector("body").style.overflow = "hidden";
      document.querySelector("body").style.position = "fixed";
      document.querySelector("body").style.top = `-${scrollY.current}px`
    }
    setIsOpen(!isOpen);
  }
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
        if (modalMainRef.current?.getBoundingClientRect().top > window.innerHeight * .7) {
          closing.current = true;
          modalApiMain.set({ top: `${e.touches[0].screenY - touchStartY}px`})
          modalApi.start({ backdropFilter: "blur(0vh)", WebkitBackdropFilter: "blur(0vh)", background: "rgba(0, 0, 0, 0)", config: { duration: 300 } });
          setTimeout(() => {
            modalApiMain.start({ top: `${window.innerHeight}px`, config: { duration: 200 } });
          }, 100)
          setTimeout(() => {
            document.querySelector("html").style.overflow = "auto";
            document.querySelector("body").style.overflow = "auto";
            document.querySelector("body").style.position = "relative";
            document.querySelector("body").style.top = "0px";
            window.scrollTo({ top: scrollY.current })
            closing.current = false;
            setIsOpen(false);
          }, 600)
        }
      }
    }
  }
  const handleTouchEnd = (e) => {
    if (modalMainRef.current?.getBoundingClientRect().top < window.innerHeight * .7 && !closing.current) {
      modalApiMain.set({ top: `${modalMainRef.current?.getBoundingClientRect().top - window.innerHeight * .2}px` })
      setTimeout(() => {
        modalApiMain.start({ top: `0px`, config: { duration: 200 } });
      }, 100)
    }
  }
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
  return (
    <>
        <animated.div style={{display: "flex", alignItems: "center", gap: 5, marginTop: 0, ...props}} onClick={toggle}>
            <div style={{height: 27}}>
                <img src={require("./images/plus.svg").default} className="" alt="whatsapp" style={{height: "100%"}} />
            </div>
            <div style={{
                fontWeight: 300,
                fontSize: 15
            }}>
                Добавить цену
            </div>
        </animated.div>
      {isOpen &&
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
                                  borderTopLeftRadius: 25, 
                                  borderTopRightRadius: 25, 
                                  position: "relative",
                                  marginTop: "20vh",
                                  ...modalPropsMain}}
                          ref={modalMainRef}>
              <div
                style={{position: "absolute", top: "-20vh", height: "20vh", width: "100vw", display: "flex", justifyContent: "center"}}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div style={{marginTop: "auto", marginBottom: 20, width: "40vw", height: 4, borderRadius: 2, backgroundColor: "#bbb"}}></div>
              </div>
              <div style={{padding: "30px 20px 15px 20px", fontSize: 16, fontWeight: 300}}>
                Добавьте цену для отдельных<br/>характеристик букета
              </div>
              <div style={{padding: "0px 20px 20px 20px"}}>
                <Formik
                    initialValues={{
                        "price": "",
                        "oldPrice": ""
                    }}
                    onSubmit={(values) => alert(JSON.stringify(values))}
                >
                {({ errors, touched, handleSubmit, values }) => (
                    <Form>
                        <div style={{display: "flex", gap: 20, flexFlow: "column"}}>
                            <div>
                              <div style={{fontSize: 14, fontWeight: 300, paddingBottom: 10, color: "#bbb"}}>Выберите цвет(-а)</div>
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
                          <div>
                            <div style={{fontSize: 14, fontWeight: 300, paddingBottom: 10, color: "#bbb"}}>Выберите количество цветов</div>
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
                          <div>
                            <div style={{fontSize: 14, fontWeight: 300, paddingBottom: 10, color: "#bbb"}}>Выберите размер(-ы) букета</div>
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
                          <div>
                            <div style={{fontSize: 14, fontWeight: 300, paddingBottom: 10, color: "#bbb"}}>Выберите упаковку(-и)</div>
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
                          <FormLIGHT inputs={Object.entries(inputs).slice(0, 3)} setInputs={setInputs} errors={errors} touched={touched} />
                          <Button text="Сохранить" />
                        </div>
                        <ScrollToError/>
                    </Form>
                )}
                </Formik>  
              </div>
            </animated.div>
          </div>
        </animated.div>}
    </>
  )
}

export default AddPrice;
