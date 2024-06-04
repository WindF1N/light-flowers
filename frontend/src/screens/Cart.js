import styles from './styles/Settings.module.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Title from '../components/Title';
import Button from '../components/Button';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ScrollToError from '../components/ScrollToError';
import { Formik, Form } from 'formik';
import FormLIGHT from '../components/FormLIGHT';
import { a } from '@react-spring/web';

function Cart() {
    const [ inputs, setInputs ] = useState({
        "name": {
          value: null,
          isFocused: false,
          error: null,
          label: "Ваше имя",
          type: "text",
        },
        "phone": {
            value: null,
            isFocused: false,
            error: null,
            label: "Ваш телефон",
            type: "text",
            mask: [
                '+', '7', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/
            ]
        },
        "anonymous": {
            value: "Оставаться анонимным для получателя",
            error: null,
            label: "Оставаться анонимным для получателя",
            type: "radio"
        },
        "delivery": {
            value: "Не выбрано",
            error: null,
            label: "Способ доставки",
            type: "select",
            choices: [
                "Курьером", "Самовывоз"
            ]
        },
        "address": {
            value: null,
            isFocused: false,
            error: null,
            label: "Адрес доставки *",
            type: "text",
        },
        "date_of_post": {
            value: null,
            isFocused: false,
            error: null,
            label: "Дата доставки",
            type: "text",
            mask: [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/]
        },
        "time_of_post": {
            value: "Не выбрано",
            error: null,
            label: "Интервал времени доставки",
            type: "select",
            choices: [
                "09:00 - 12:00", "12:00 - 15:00", "15:00 - 18:00", "18:00 - 21:00", "Уточнить у получателя"
            ]
        },
        "receiver_name": {
            value: null,
            isFocused: false,
            error: null,
            label: "Имя получателя",
            type: "text",
        },
        "receiver_phone": {
            value: null,
            isFocused: false,
            error: null,
            label: "Телефон получателя *",
            type: "text",
            mask: [
                '+', '7', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/
            ]
        },
        "sign_the_postcard": {
            value: "Подписать открытку",
            error: null,
            label: "Подписать открытку",
            type: "radio"
        },
        "text_of_postcard": {
            value: null,
            isFocused: false,
            error: null,
            label: "Текст для открытки",
            type: "textarea"
        },
        "with_comment": {
            value: "Добавить комментарий",
            error: null,
            label: "Добавить комментарий",
            type: "radio"
        },
        "comment": {
            value: null,
            isFocused: false,
            error: null,
            label: "Ваш комментарий",
            type: "textarea"
        },
    });
    useEffect(() => {
        window.scrollTo({top: 0, smooth: "behavior"});
    }, [])
    return (
        <div className="view">
            <div style={{borderBottom: "0.5px solid #18181A", marginLeft: -15, width: "100vw"}}>
                <div style={{padding: "0 15px"}}>
                    <Title text="Информация о вашем заказе" />
                </div>
            </div>
            <div style={{display: "flex", flexFlow: "column", rowGap: 20, marginTop: 20}}>
                
                <div style={{borderBottom: "0.5px solid #18181A", paddingBottom: 20, position: "relative", display: "flex", columnGap: 14, alignItems: "flex-start"}}>
                    <div style={{width: 80, height: 80, flexShrink: 0}}>
                        <LazyLoadImage src={require("./images/flowers4.avif")} placeholderSrc={require("./images/flowers.avif")} alt="" style={{width: "100%", height: "100%", objectFit: "cover", borderRadius: 9}} />
                    </div>
                    <div style={{position: "relative", width: "calc(100% - 94px)", display: "flex", flexFlow: "column", rowGap: 5, flexShrink: 0}}>
                        <div style={{display: "flex", alignItems: "flex-end", justifyContent: "space-between", width: "100%", flexShrink: 1}}>
                            <div style={{fontSize: 14, fontWeight: 400}}>Букет кустовых роз Лав Лидия</div>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "center", position: "absolute", right: -5, top: -5}}>
                                <img src={require("../components/images/plus.svg").default} className="" alt="close" style={{display: "flex", transform: "rotate(45deg)", filter: "brightness(.7)"}} />
                            </div>
                        </div>
                        <div style={{display: "flex", justifyContent: "flex-start", alignItems: "center", columnGap: 10, rowGap: 10, width: "100%", flexShrink: 0, flexWrap: "wrap"}}>
                            <div style={{display: "flex", alignItems: "center", columnGap: 8, width: "auto", flexShrink: 1}} onClick={() => {
                                document.getElementById(`sort1`).focus();
                                document.getElementById(`arrow1`).style.transform = "rotate(270deg)";
                            }}>
                                <div style={{fontSize: 15, fontWeight: 300, color: "#bbb"}}>101 роза</div> <img id="arrow1" src={require("../components/images/arrow-right.svg").default} alt="arrow right" style={{transition: ".2s", filter: "brightness(.6)", transform: "rotate(90deg)"}}/>
                                <select id="sort1" style={{opacity: 0, width: 0, height: 0, margin: 0, padding: 0}} onChange={(e) => {document.getElementById(`arrow1`).style.transform = "rotate(90deg)"}} onBlur={() => {document.getElementById(`arrow1`).style.transform = "rotate(90deg)"}}>
                                    <option value="19 роз">19 роз</option>
                                    <option value="29 роз">29 роз</option>
                                    <option value="51 роза">51 роза</option>
                                    <option value="101 роза">101 роза</option>
                                </select>
                            </div>
                            <div style={{display: "flex", alignItems: "center", columnGap: 8, width: "auto", flexShrink: 1}} onClick={() => {
                                document.getElementById(`sort2`).focus();
                                document.getElementById(`arrow2`).style.transform = "rotate(270deg)";
                            }}>
                                <div style={{fontSize: 15, fontWeight: 300, color: "#bbb"}}>50 см</div> <img id="arrow2" src={require("../components/images/arrow-right.svg").default} alt="arrow right" style={{transition: ".2s", filter: "brightness(.6)", transform: "rotate(90deg)"}}/>
                                <select id="sort2" style={{opacity: 0, width: 0, height: 0, margin: 0, padding: 0}} onChange={(e) => {document.getElementById(`arrow2`).style.transform = "rotate(90deg)"}} onBlur={() => {document.getElementById(`arrow2`).style.transform = "rotate(90deg)"}}>
                                    <option value="50 см">50 см</option>
                                    <option value="60 см">60 см</option>
                                    <option value="70 см">70 см</option>
                                    <option value="80 см">80 см</option>
                                    <option value="90 см">90 см</option>
                                </select>
                            </div>
                            <div style={{display: "flex", alignItems: "center", columnGap: 8, width: "auto", flexShrink: 1}} onClick={() => {
                                document.getElementById(`sort3`).focus();
                                document.getElementById(`arrow3`).style.transform = "rotate(270deg)";
                            }}>
                                <div style={{fontSize: 15, fontWeight: 300, color: "#bbb"}}>Оранжевые</div> <img id="arrow3" src={require("../components/images/arrow-right.svg").default} alt="arrow right" style={{transition: ".2s", filter: "brightness(.6)", transform: "rotate(90deg)"}}/>
                                <select id="sort3" style={{opacity: 0, width: 0, height: 0, margin: 0, padding: 0}} onChange={(e) => {document.getElementById(`arrow3`).style.transform = "rotate(90deg)"}} onBlur={() => {document.getElementById(`arrow3`).style.transform = "rotate(90deg)"}}>
                                    <option value="Белые">Белые</option>
                                    <option value="Красные">Красные</option>
                                    <option value="Черные">Черные</option>
                                    <option value="Синие">Синие</option>
                                    <option value="Розовые">Розовые</option>
                                    <option value="Желтые">Желтые</option>
                                    <option value="Оранжевые">Оранжевые</option>
                                    <option value="Розовые">Розовые</option>
                                    <option value="Микс">Микс</option>
                                </select>
                            </div>
                            <div style={{display: "flex", alignItems: "center", columnGap: 8, width: "auto", flexShrink: 1}} onClick={() => {
                                document.getElementById(`sort4`).focus();
                                document.getElementById(`arrow4`).style.transform = "rotate(270deg)";
                            }}>
                                <div style={{fontSize: 15, fontWeight: 300, color: "#bbb"}}>Классика</div> <img id="arrow4" src={require("../components/images/arrow-right.svg").default} alt="arrow right" style={{transition: ".2s", filter: "brightness(.6)", transform: "rotate(90deg)"}}/>
                                <select id="sort4" style={{opacity: 0, width: 0, height: 0, margin: 0, padding: 0}} onChange={(e) => {document.getElementById(`arrow4`).style.transform = "rotate(90deg)"}} onBlur={() => {document.getElementById(`arrow4`).style.transform = "rotate(90deg)"}}>
                                    <option value="Лента">Лента</option>
                                    <option value="Коробка">Коробка</option>
                                    <option value="Корзина">Корзина</option>
                                    <option value="Подарочной упаковка">Подарочной упаковка</option>
                                    <option value="Классика">Классика</option>
                                </select>
                            </div>
                        </div>
                        <div style={{display: "flex", justifyContent: "flex-start", width: "100%", flexShrink: 1}}>
                            <div style={{display: "flex", alignItems: "center", columnGap: 10, marginTop: 10}}>
                                <div style={{width: 28, height: 28}}>
                                    <img src={require("./images/remove-to-cart.svg").default} alt="" style={{width: "100%", height: "100%", objectFit: "cover"}} />
                                </div>
                                <div style={{fontSize: 16, fontWeight: 300, lineHeight: 1}}>2</div>
                                <div style={{width: 28, height: 28}}>
                                    <img src={require("./images/add-to-cart.svg").default} alt="" style={{width: "100%", height: "100%", objectFit: "cover"}} />
                                </div>
                            </div>
                            <div style={{marginLeft: "auto", display: "flex", flexFlow: "column", alignItems: "flex-end", marginTop: "auto", gap: 5}}>
                                <div style={{fontSize: 15, fontWeight: 300, color: "#fff"}}>5 400 ₽ <span style={{display: "inline-block", textDecoration: "line-through", transform: "scale(.8)", transformOrigin: "right center", color: "#8F8E93"}}>8 800 ₽</span></div>
                                <div style={{fontSize: 14, fontWeight: 300, color: "#8F8E93"}}>2 700 ₽ / шт</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{borderBottom: "0.5px solid #18181A", paddingBottom: 20, position: "relative", display: "flex", columnGap: 14, alignItems: "flex-start"}}>
                    <div style={{width: 80, height: 80, flexShrink: 0}}>
                        <LazyLoadImage src={require("./images/flowers4.avif")} placeholderSrc={require("./images/flowers.avif")} alt="" style={{width: "100%", height: "100%", objectFit: "cover", borderRadius: 9}} />
                    </div>
                    <div style={{position: "relative", width: "calc(100% - 94px)", display: "flex", flexFlow: "column", rowGap: 5, flexShrink: 0}}>
                        <div style={{display: "flex", alignItems: "flex-end", justifyContent: "space-between", width: "100%", flexShrink: 1}}>
                            <div style={{fontSize: 14, fontWeight: 400}}>Букет кустовых роз Лав Лидия</div>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "center", position: "absolute", right: -5, top: -5}}>
                                <img src={require("../components/images/plus.svg").default} className="" alt="close" style={{display: "flex", transform: "rotate(45deg)", filter: "brightness(.7)"}} />
                            </div>
                        </div>
                        <div style={{display: "flex", justifyContent: "flex-start", alignItems: "center", columnGap: 10, rowGap: 10, width: "100%", flexShrink: 0, flexWrap: "wrap"}}>
                            <div style={{display: "flex", alignItems: "center", columnGap: 8, width: "auto", flexShrink: 1}} onClick={() => {
                                document.getElementById(`sort5`).focus();
                                document.getElementById(`arrow5`).style.transform = "rotate(270deg)";
                            }}>
                                <div style={{fontSize: 15, fontWeight: 300, color: "#bbb"}}>101 роза</div> <img id="arrow5" src={require("../components/images/arrow-right.svg").default} alt="arrow right" style={{transition: ".2s", filter: "brightness(.6)", transform: "rotate(90deg)"}}/>
                                <select id="sort5" style={{opacity: 0, width: 0, height: 0, margin: 0, padding: 0}} onChange={(e) => {document.getElementById(`arrow5`).style.transform = "rotate(90deg)"}} onBlur={() => {document.getElementById(`arrow5`).style.transform = "rotate(90deg)"}}>
                                    <option value="19 роз">19 роз</option>
                                    <option value="29 роз">29 роз</option>
                                    <option value="51 роза">51 роза</option>
                                    <option value="101 роза">101 роза</option>
                                </select>
                            </div>
                            <div style={{display: "flex", alignItems: "center", columnGap: 8, width: "auto", flexShrink: 1}} onClick={() => {
                                document.getElementById(`sort6`).focus();
                                document.getElementById(`arrow6`).style.transform = "rotate(270deg)";
                            }}>
                                <div style={{fontSize: 15, fontWeight: 300, color: "#bbb"}}>50 см</div> <img id="arrow6" src={require("../components/images/arrow-right.svg").default} alt="arrow right" style={{transition: ".2s", filter: "brightness(.6)", transform: "rotate(90deg)"}}/>
                                <select id="sort6" style={{opacity: 0, width: 0, height: 0, margin: 0, padding: 0}} onChange={(e) => {document.getElementById(`arrow6`).style.transform = "rotate(90deg)"}} onBlur={() => {document.getElementById(`arrow6`).style.transform = "rotate(90deg)"}}>
                                    <option value="50 см">50 см</option>
                                    <option value="60 см">60 см</option>
                                    <option value="70 см">70 см</option>
                                    <option value="80 см">80 см</option>
                                    <option value="90 см">90 см</option>
                                </select>
                            </div>
                            <div style={{display: "flex", alignItems: "center", columnGap: 8, width: "auto", flexShrink: 1}} onClick={() => {
                                document.getElementById(`sort7`).focus();
                                document.getElementById(`arrow7`).style.transform = "rotate(270deg)";
                            }}>
                                <div style={{fontSize: 15, fontWeight: 300, color: "#bbb"}}>Оранжевые</div> <img id="arrow7" src={require("../components/images/arrow-right.svg").default} alt="arrow right" style={{transition: ".2s", filter: "brightness(.6)", transform: "rotate(90deg)"}}/>
                                <select id="sort7" style={{opacity: 0, width: 0, height: 0, margin: 0, padding: 0}} onChange={(e) => {document.getElementById(`arrow7`).style.transform = "rotate(90deg)"}} onBlur={() => {document.getElementById(`arrow7`).style.transform = "rotate(90deg)"}}>
                                    <option value="Белые">Белые</option>
                                    <option value="Красные">Красные</option>
                                    <option value="Черные">Черные</option>
                                    <option value="Синие">Синие</option>
                                    <option value="Розовые">Розовые</option>
                                    <option value="Желтые">Желтые</option>
                                    <option value="Оранжевые">Оранжевые</option>
                                    <option value="Розовые">Розовые</option>
                                    <option value="Микс">Микс</option>
                                </select>
                            </div>
                            <div style={{display: "flex", alignItems: "center", columnGap: 8, width: "auto", flexShrink: 1}} onClick={() => {
                                document.getElementById(`sort8`).focus();
                                document.getElementById(`arrow8`).style.transform = "rotate(270deg)";
                            }}>
                                <div style={{fontSize: 15, fontWeight: 300, color: "#bbb"}}>Классика</div> <img id="arrow8" src={require("../components/images/arrow-right.svg").default} alt="arrow right" style={{transition: ".2s", filter: "brightness(.6)", transform: "rotate(90deg)"}}/>
                                <select id="sort8" style={{opacity: 0, width: 0, height: 0, margin: 0, padding: 0}} onChange={(e) => {document.getElementById(`arrow8`).style.transform = "rotate(90deg)"}} onBlur={() => {document.getElementById(`arrow8`).style.transform = "rotate(90deg)"}}>
                                    <option value="Лента">Лента</option>
                                    <option value="Коробка">Коробка</option>
                                    <option value="Корзина">Корзина</option>
                                    <option value="Подарочной упаковка">Подарочной упаковка</option>
                                    <option value="Классика">Классика</option>
                                </select>
                            </div>
                        </div>
                        <div style={{display: "flex", justifyContent: "flex-start", width: "100%", flexShrink: 1}}>
                            <div style={{display: "flex", alignItems: "center", columnGap: 10, marginTop: 10}}>
                                <div style={{width: 28, height: 28}}>
                                    <img src={require("./images/remove-to-cart.svg").default} alt="" style={{width: "100%", height: "100%", objectFit: "cover"}} />
                                </div>
                                <div style={{fontSize: 16, fontWeight: 300, lineHeight: 1}}>2</div>
                                <div style={{width: 28, height: 28}}>
                                    <img src={require("./images/add-to-cart.svg").default} alt="" style={{width: "100%", height: "100%", objectFit: "cover"}} />
                                </div>
                            </div>
                            <div style={{marginLeft: "auto", display: "flex", flexFlow: "column", alignItems: "flex-end", marginTop: "auto", gap: 5}}>
                                <div style={{fontSize: 15, fontWeight: 300, color: "#fff"}}>5 400 ₽ <span style={{display: "inline-block", textDecoration: "line-through", transform: "scale(.8)", transformOrigin: "right center", color: "#8F8E93"}}>8 800 ₽</span></div>
                                <div style={{fontSize: 14, fontWeight: 300, color: "#8F8E93"}}>2 700 ₽ / шт</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{borderBottom: "0.5px solid #18181A", paddingBottom: 20, position: "relative", display: "flex", columnGap: 14, alignItems: "flex-start"}}>
                    <div style={{width: 80, height: 80, flexShrink: 0}}>
                        <LazyLoadImage src={require("./images/flowers4.avif")} placeholderSrc={require("./images/flowers.avif")} alt="" style={{width: "100%", height: "100%", objectFit: "cover", borderRadius: 9}} />
                    </div>
                    <div style={{position: "relative", width: "calc(100% - 94px)", display: "flex", flexFlow: "column", rowGap: 5, flexShrink: 0}}>
                        <div style={{display: "flex", alignItems: "flex-end", justifyContent: "space-between", width: "100%", flexShrink: 1}}>
                            <div style={{fontSize: 14, fontWeight: 400}}>Букет кустовых роз Лав Лидия</div>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "center", position: "absolute", right: -5, top: -5}}>
                                <img src={require("../components/images/plus.svg").default} className="" alt="close" style={{display: "flex", transform: "rotate(45deg)", filter: "brightness(.7)"}} />
                            </div>
                        </div>
                        <div style={{display: "flex", justifyContent: "flex-start", alignItems: "center", columnGap: 10, rowGap: 10, width: "100%", flexShrink: 0, flexWrap: "wrap"}}>
                            <div style={{display: "flex", alignItems: "center", columnGap: 8, width: "auto", flexShrink: 1}} onClick={() => {
                                document.getElementById(`sort9`).focus();
                                document.getElementById(`arrow9`).style.transform = "rotate(270deg)";
                            }}>
                                <div style={{fontSize: 15, fontWeight: 300, color: "#bbb"}}>101 роза</div> <img id="arrow9" src={require("../components/images/arrow-right.svg").default} alt="arrow right" style={{transition: ".2s", filter: "brightness(.6)", transform: "rotate(90deg)"}}/>
                                <select id="sort9" style={{opacity: 0, width: 0, height: 0, margin: 0, padding: 0}} onChange={(e) => {document.getElementById(`arrow9`).style.transform = "rotate(90deg)"}} onBlur={() => {document.getElementById(`arrow9`).style.transform = "rotate(90deg)"}}>
                                    <option value="19 роз">19 роз</option>
                                    <option value="29 роз">29 роз</option>
                                    <option value="51 роза">51 роза</option>
                                    <option value="101 роза">101 роза</option>
                                </select>
                            </div>
                            <div style={{display: "flex", alignItems: "center", columnGap: 8, width: "auto", flexShrink: 1}} onClick={() => {
                                document.getElementById(`sort10`).focus();
                                document.getElementById(`arrow10`).style.transform = "rotate(270deg)";
                            }}>
                                <div style={{fontSize: 15, fontWeight: 300, color: "#bbb"}}>50 см</div> <img id="arrow10" src={require("../components/images/arrow-right.svg").default} alt="arrow right" style={{transition: ".2s", filter: "brightness(.6)", transform: "rotate(90deg)"}}/>
                                <select id="sort10" style={{opacity: 0, width: 0, height: 0, margin: 0, padding: 0}} onChange={(e) => {document.getElementById(`arrow10`).style.transform = "rotate(90deg)"}} onBlur={() => {document.getElementById(`arrow10`).style.transform = "rotate(90deg)"}}>
                                    <option value="50 см">50 см</option>
                                    <option value="60 см">60 см</option>
                                    <option value="70 см">70 см</option>
                                    <option value="80 см">80 см</option>
                                    <option value="90 см">90 см</option>
                                </select>
                            </div>
                            <div style={{display: "flex", alignItems: "center", columnGap: 8, width: "auto", flexShrink: 1}} onClick={() => {
                                document.getElementById(`sort11`).focus();
                                document.getElementById(`arrow11`).style.transform = "rotate(270deg)";
                            }}>
                                <div style={{fontSize: 15, fontWeight: 300, color: "#bbb"}}>Оранжевые</div> <img id="arrow11" src={require("../components/images/arrow-right.svg").default} alt="arrow right" style={{transition: ".2s", filter: "brightness(.6)", transform: "rotate(90deg)"}}/>
                                <select id="sort11" style={{opacity: 0, width: 0, height: 0, margin: 0, padding: 0}} onChange={(e) => {document.getElementById(`arrow11`).style.transform = "rotate(90deg)"}} onBlur={() => {document.getElementById(`arrow11`).style.transform = "rotate(90deg)"}}>
                                    <option value="Белые">Белые</option>
                                    <option value="Красные">Красные</option>
                                    <option value="Черные">Черные</option>
                                    <option value="Синие">Синие</option>
                                    <option value="Розовые">Розовые</option>
                                    <option value="Желтые">Желтые</option>
                                    <option value="Оранжевые">Оранжевые</option>
                                    <option value="Розовые">Розовые</option>
                                    <option value="Микс">Микс</option>
                                </select>
                            </div>
                            <div style={{display: "flex", alignItems: "center", columnGap: 8, width: "auto", flexShrink: 1}} onClick={() => {
                                document.getElementById(`sort12`).focus();
                                document.getElementById(`arrow12`).style.transform = "rotate(270deg)";
                            }}>
                                <div style={{fontSize: 15, fontWeight: 300, color: "#bbb"}}>Подарочной упаковка</div> <img id="arrow12" src={require("../components/images/arrow-right.svg").default} alt="arrow right" style={{transition: ".2s", filter: "brightness(.6)", transform: "rotate(90deg)"}}/>
                                <select id="sort12" style={{opacity: 0, width: 0, height: 0, margin: 0, padding: 0}} onChange={(e) => {document.getElementById(`arrow12`).style.transform = "rotate(90deg)"}} onBlur={() => {document.getElementById(`arrow12`).style.transform = "rotate(90deg)"}}>
                                    <option value="Лента">Лента</option>
                                    <option value="Коробка">Коробка</option>
                                    <option value="Корзина">Корзина</option>
                                    <option value="Подарочной упаковка">Подарочной упаковка</option>
                                    <option value="Классика">Классика</option>
                                </select>
                            </div>
                        </div>
                        <div style={{display: "flex", justifyContent: "flex-start", width: "100%", flexShrink: 1}}>
                            <div style={{display: "flex", alignItems: "center", columnGap: 10, marginTop: 10}}>
                                <div style={{width: 28, height: 28}}>
                                    <img src={require("./images/remove-to-cart.svg").default} alt="" style={{width: "100%", height: "100%", objectFit: "cover"}} />
                                </div>
                                <div style={{fontSize: 16, fontWeight: 300, lineHeight: 1}}>2</div>
                                <div style={{width: 28, height: 28}}>
                                    <img src={require("./images/add-to-cart.svg").default} alt="" style={{width: "100%", height: "100%", objectFit: "cover"}} />
                                </div>
                            </div>
                            <div style={{marginLeft: "auto", display: "flex", flexFlow: "column", alignItems: "flex-end", marginTop: "auto", gap: 5}}>
                                <div style={{fontSize: 15, fontWeight: 300, color: "#fff"}}>5 400 ₽ <span style={{display: "inline-block", textDecoration: "line-through", transform: "scale(.8)", transformOrigin: "right center", color: "#8F8E93"}}>8 800 ₽</span></div>
                                <div style={{fontSize: 14, fontWeight: 300, color: "#8F8E93"}}>2 700 ₽ / шт</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div style={{display: "flex", justifyContent: "space-between", padding: "10px 0"}}>
                <div style={{fontSize: 18, fontWeight: 300, color: "#fff"}}>Сумма</div>
                <div style={{fontSize: 18, fontWeight: 300, color: "#fff"}}><span style={{display: "inline-block", textDecoration: "line-through", transform: "scale(.8)", transformOrigin: "left center", color: "#8F8E93"}}>26 400 ₽</span> 16 200 ₽</div>
            </div>
            <div style={{fontSize: 14, fontWeight: 300, color: "#bbb"}}>
                Минимальное время сборки и доставки - 2 часа.
                Пожалуйста, будьте внимательны при оформлении заказа.
            </div>
            <div style={{padding: "20px 0"}}>
                <Formik
                    initialValues={{
                        "name": "",
                        "phone": "",
                        "anonymous": "",
                        "delivery": "Не выбрано",
                        "address": "",
                        "date_of_post": "",
                        "time_of_post": "Не выбрано",
                        "receiver_name": "",
                        "receiver_phone": "",
                        "sign_the_postcard": "Подписать открытку",
                        "text_of_postcard": "",
                        "with_comment": "Добавить комментарий",
                        "comment": "",
                    }}
                    onSubmit={(values) => alert(JSON.stringify(values))}
                >
                {({ errors, touched, handleSubmit, values }) => (
                    <Form>
                        <div style={{display: "flex", gap: 20, flexFlow: "column"}}>
                            <FormLIGHT inputs={Object.entries(inputs).slice(0, 3)} setInputs={setInputs} errors={errors} touched={touched} />
                            <FormLIGHT inputs={Object.entries(inputs).slice(3, 7)} setInputs={setInputs} errors={errors} touched={touched} />
                            <FormLIGHT inputs={Object.entries(inputs).slice(7, 9)} setInputs={setInputs} errors={errors} touched={touched} />
                            <FormLIGHT inputs={Object.entries(inputs).slice(9, 11)} setInputs={setInputs} errors={errors} touched={touched} />
                            <FormLIGHT inputs={Object.entries(inputs).slice(11, 13)} setInputs={setInputs} errors={errors} touched={touched} />
                            <div style={{display: "flex", flexFlow: "column", gap: 10}}>
                                <div style={{display: "flex", justifyContent: "space-between"}}>
                                    <div style={{fontSize: 16, fontWeight: 300, color: "#bbb"}}>Сумма</div>
                                    <div style={{fontSize: 16, fontWeight: 300, color: "#bbb"}}>16 200 ₽</div>
                                </div>
                                <div style={{display: "flex", justifyContent: "space-between"}}>
                                    <div style={{fontSize: 18, fontWeight: 300, color: "#fff"}}>Итоговая сумма</div>
                                    <div style={{fontSize: 18, fontWeight: 300, color: "#fff"}}>16 200 ₽</div>
                                </div>     
                            </div>
                            <Button text="Оплатить" />
                        </div>
                        <ScrollToError/>
                    </Form>
                )}
                </Formik>  
            </div>
        </div>
    );
}

export default Cart;
