import { useState, useEffect } from 'react';
import Title from '../components/Title';
import Button from '../components/Button';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ScrollToError from '../components/ScrollToError';
import { Formik, Form } from 'formik';
import FormLIGHT from '../components/FormLIGHT';
import SendedHover from '../components/SendedHover';
import { useMainContext } from '../context';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

function multiplyPrice(priceString, multiplier) {
    // Удаляем все символы, кроме цифр и пробелов, из строки цены
    const cleanedPriceString = priceString.replace(/[^\d\s]/g, '');
    // Разбиваем очищенную строку на части: количество и валюту
    const amount = cleanedPriceString.replace(' ', '');
    // Умножаем количество на множитель и округляем до целого числа
    const totalAmount = Math.round(parseInt(amount, 10) * multiplier);
    // Форматируем сумму с разделением тысяч и добавляем валюту
    const formattedAmount = totalAmount.toLocaleString('ru-RU');
    // Возвращаем форматированную строку с суммой
    return `${formattedAmount}`;
}

function createValidationSchema(fields) {
    const shape = {};

    fields.forEach(field => {
        shape[field.name] = Yup.string().required(field.requiredMessage || "Обязательное поле");
    });

    return Yup.object().shape(shape);
}

function Cart() {
    const navigate = useNavigate();
    const [ sended, setSended ] = useState(false);
    const [ validationSchema, setValidationSchema ] = useState(createValidationSchema([
        { name: "delivery" },
        { name: "name" },
        { name: "phone" },
        { name: "city" },
        { name: "address" },
        { name: "date_of_post" },
        { name: "time_of_post" },
        { name: "receiver_name" },
        { name: "receiver_phone" },
    ]))
    const { cartItems, setCartItems, sendMessage, message, setMessage } = useMainContext();
    const [ inputs, setInputs ] = useState({
        "delivery": {
            value: "Курьером",
            error: null,
            label: "Способ доставки",
            type: "select",
            choices: [
                "Курьером", "Самовывоз"
            ],
            handleChange: (val) => {
                if (val === "Самовывоз") {
                    setValidationSchema(createValidationSchema([
                        { name: "delivery" },
                        { name: "name" },
                        { name: "phone" },
                        { name: "receiver_name" },
                        { name: "receiver_phone" },
                    ]))
                } else {
                    setValidationSchema(createValidationSchema([
                        { name: "delivery" },
                        { name: "name" },
                        { name: "phone" },
                        { name: "city" },
                        { name: "address" },
                        { name: "date_of_post" },
                        { name: "time_of_post" },
                        { name: "receiver_name" },
                        { name: "receiver_phone" },
                    ]))
                }
            }
        },
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
            type: "radio",
        },
        "city": {
            value: "Сочи",
            error: null,
            label: "Город",
            type: "select",
            choices: [
                "Сочи", "Краснодар"
            ],
        },
        "address": {
            value: null,
            isFocused: false,
            error: null,
            label: "Адрес доставки",
            type: "text",
        },
        "request_address": {
            value: "Уточнить у получателя",
            error: null,
            label: "Уточнить у получателя",
            type: "radio",
            handleChange: (val) => {
                if (val === true) {
                    setValidationSchema(createValidationSchema([
                        { name: "delivery" },
                        { name: "name" },
                        { name: "phone" },
                        { name: "date_of_post" },
                        { name: "time_of_post" },
                        { name: "receiver_name" },
                        { name: "receiver_phone" },
                    ]))
                } else {
                    setValidationSchema(createValidationSchema([
                        { name: "delivery" },
                        { name: "name" },
                        { name: "phone" },
                        { name: "address" },
                        { name: "date_of_post" },
                        { name: "time_of_post" },
                        { name: "receiver_name" },
                        { name: "receiver_phone" },
                    ]))
                }
            }
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
        "text_of_postcard": {
            value: null,
            isFocused: false,
            error: null,
            label: "Подписать открытку",
            type: "textarea"
        },
        "comment": {
            value: null,
            isFocused: false,
            error: null,
            label: "Добавить комментарий к заказу",
            type: "textarea"
        },
    });
    useEffect(() => {
        window.scrollTo({top: 0, smooth: "behavior"});
    }, [])
    const handleCart = (index, type) => {
        if (type === 1) {
            setCartItems(prevState => {
                return prevState.map((item, i) => {
                    if (i === index && item.count !== 100) {
                        return { ...item, count: item.count + 1 };
                    }
                    return item;
                });
            });
        } else if (type === 0) {
            setCartItems(prevState => {
                const updatedItem = { ...prevState[index], count: prevState[index].count - 1 };
                if (updatedItem.count === 0) {
                    // Если количество стало равным 0, удаляем элемент из массива
                    return prevState.filter((_, i) => i !== index);
                } else {
                    // Иначе обновляем количество
                    return prevState.map((item, i) => i === index ? updatedItem : item);
                }
            });
        }
    }
    const getPrice = (index) => {
        const data = cartItems[index].product
        for (let i = 0; i < data.prices?.length; i++) {
            const price = data.prices[i];
            let checked = [0, 0, 0, 0]
            if (price.colors.length > 0) {
              if (price.colors.includes(data.selectedColor)) {
                checked[0] = 1;
              }
            } else {
              checked[0] = 1;
            };
            if (price.counts.length > 0) {
              if (price.counts.includes(data.selectedCount)) {
                checked[1] = 1;
              }
            } else {
              checked[1] = 1;
            };
            if (price.packages.length > 0) {
              if (price.packages.includes(data.selectedPackage)) {
                checked[2] = 1;
              }
            } else {
              checked[2] = 1;
            };
            if (price.sizes.length > 0) {
              if (price.sizes.includes(data.selectedSize)) {
                checked[3] = 1;
              }
            } else {
              checked[3] = 1;
            };
            if (JSON.stringify(checked) === JSON.stringify([1, 1, 1, 1])) {
              return price.price
            }
        }
        return data.price
    }
    const getTotal = () => {
        let totalPrice = 0;
        for (let i = 0; i < cartItems?.length; i++) {
            let price = getPrice(i);
            price = parseInt(price.replace(/[^\d\s]/g, '').replace(' ', ''), 10);
            totalPrice += price * cartItems[i].count;
        }
        return totalPrice.toLocaleString('ru-RU')
    }
    const [ total, setTotal ] = useState(getTotal());
    useEffect(() => {
        setTotal(getTotal());
    }, [cartItems])
    const handleSubmit = (values) => {
        sendMessage(JSON.stringify(["order", "new", {...values, items: cartItems}]));
    }
    useEffect(() => {
        if (sended) {
            setTimeout(() => {
                setSended(false);
                setCartItems([]);
                navigate("/");
            }, 6000)
        }
    }, [sended])
    useEffect(() => {
        if (message) {
          if (message[0] === 'order') {
            if (message[1] === 'new') {
                setSended(true);
            }
          }
          setMessage(null);
        };
    }, [message]);
    if (cartItems.length > 0) {
        return (
            <div className="view">
                <div style={{borderBottom: "0.5px solid #18181A", marginLeft: -15, width: "100vw"}}>
                    <div style={{padding: "0 15px"}}>
                        <Title text="Информация о вашем заказе" />
                    </div>
                </div>
                <div style={{display: "flex", flexFlow: "column", rowGap: 20, marginTop: 20}}>
                    {cartItems.map((item, index) => (
                        <div style={{borderBottom: "0.5px solid #18181A", paddingBottom: 20, position: "relative", display: "flex", columnGap: 14, alignItems: "flex-start"}}>
                            <div style={{width: 80, height: 80, flexShrink: 0}}>
                                <LazyLoadImage src={item.product.images[item.product.image_color?.find((o) => o.color === item.product.selectedColor || o.count === item.product.selectedCount)?.index || 0].file} placeholderSrc={item.product.images[item.product.image_color?.find((o) => o.color === item.product.selectedColor || o.count === item.product.selectedCount)?.index || 0].file_lazy} alt="" style={{width: "100%", height: "100%", objectFit: "cover", borderRadius: 9}} />
                            </div>
                            <div style={{position: "relative", width: "calc(100% - 94px)", display: "flex", flexFlow: "column", rowGap: 5, flexShrink: 0}}>
                                <div style={{display: "flex", alignItems: "flex-end", justifyContent: "space-between", width: "100%", flexShrink: 1}}>
                                    <div style={{fontSize: 14, fontWeight: 400}}>{item.product.title}</div>
                                    <div onClick={() => {
                                        setCartItems(prevState => prevState.filter((_, i) => i !== index));
                                    }} style={{display: "flex", alignItems: "center", justifyContent: "center", position: "absolute", right: -5, top: -5}}>
                                        <img src={require("../components/images/plus.svg").default} className="" alt="close" style={{display: "flex", transform: "rotate(45deg)", filter: "brightness(.7)"}} />
                                    </div>
                                </div>
                                <div style={{display: "flex", justifyContent: "flex-start", alignItems: "center", columnGap: 10, rowGap: 10, width: "100%", flexShrink: 0, flexWrap: "wrap"}}>
                                    <div style={{display: "flex", alignItems: "center", columnGap: 8, width: "auto", flexShrink: 1}}>
                                        {item.product.selectedCount && <div style={{fontSize: 14, fontWeight: 300, color: "#bbb"}}>{item.product.selectedCount} шт</div>}
                                        {item.product.selectedSize && <div style={{fontSize: 14, fontWeight: 300, color: "#bbb"}}>{item.product.selectedSize}</div>}
                                        {item.product.selectedColor && <div style={{fontSize: 14, fontWeight: 300, color: "#bbb"}}>{item.product.selectedColor}</div>}
                                        {item.product.selectedPackage && <div style={{fontSize: 14, fontWeight: 300, color: "#bbb"}}>{item.product.selectedPackage}</div>}
                                    </div>
                                </div>
                                <div style={{display: "flex", justifyContent: "flex-start", width: "100%", flexShrink: 1, marginTop: 5}}>
                                    <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: 28}}>
                                        <div onClick={() => handleCart(index, 0)} style={{marginRight: -4, width: 28, height: 28, zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center"}}>
                                            <img src={require("./images/remove-to-cart.svg").default} alt="" style={{width: "100%", height: "100%", objectFit: "cover"}} />
                                        </div>
                                        <div style={{borderRadius: 4, width: 44, height: 28, display: "flex", alignItems: "center", justifyContent: "center", background: "#1C1C1E", zIndex: 0}}>
                                            <div style={{fontSize: 16, fontWeight: 300, lineHeight: 1}}>{item.count}</div>
                                        </div>
                                        <div onClick={() => handleCart(index, 1)} style={{marginLeft: -4, width: 28, height: 28, zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center"}}>
                                            <img src={require("./images/add-to-cart.svg").default} alt="" style={{width: "100%", height: "100%", objectFit: "cover"}} />
                                        </div>
                                    </div>
                                    <div style={{marginLeft: "auto", display: "flex", flexFlow: "column", alignItems: "flex-end", marginTop: "auto", gap: 5}}>
                                        <div style={{fontSize: 15, fontWeight: 300, color: "#fff"}}>{multiplyPrice(getPrice(index), item.count)} ₽</div>
                                        <div style={{fontSize: 14, fontWeight: 300, color: "#8F8E93"}}>{getPrice(index)} / шт</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{display: "flex", justifyContent: "space-between", padding: "10px 0"}}>
                    <div style={{fontSize: 18, fontWeight: 300, color: "#fff"}}>Сумма</div>
                    <div style={{fontSize: 18, fontWeight: 300, color: "#fff"}}>{total} ₽</div>
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
                            "delivery": "Курьером",
                            "city": "Сочи",
                            "address": "",
                            "date_of_post": "",
                            "time_of_post": "Уточнить у получателя",
                            "receiver_name": "",
                            "receiver_phone": "",
                            "text_of_postcard": "",
                            "comment": "",
                            "request_address": ""
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                    {({ errors, touched, handleSubmit, values }) => (
                        <Form>
                            <div style={{display: "flex", gap: 20, flexFlow: "column"}}>
                                <FormLIGHT inputs={Object.entries(inputs).slice(0, 1)} setInputs={setInputs} errors={errors} touched={touched} />
                                {values.delivery === "Самовывоз" &&
                                <div style={{fontSize: 14, fontWeight: 300, color: "#bbb"}}>
                                    Можно будет забрать по адресу: <span style={{color: "#fff"}}>г.Сочи, ул. Горького, 89 Б</span>    
                                </div>}
                                {values.delivery === "Курьером" &&
                                <>
                                    {values.request_address === true ?
                                      <FormLIGHT inputs={Object.entries(inputs).slice(5, 7).splice(1, 1)} setInputs={setInputs} errors={errors} touched={touched} values={values} />
                                    : <FormLIGHT inputs={Object.entries(inputs).slice(4, 7)} setInputs={setInputs} errors={errors} touched={touched} values={values} />}
                                    <FormLIGHT inputs={Object.entries(inputs).slice(7, 9)} setInputs={setInputs} errors={errors} touched={touched} />
                                </>}
                                <FormLIGHT inputs={Object.entries(inputs).slice(1, 4)} setInputs={setInputs} errors={errors} touched={touched} />
                                <FormLIGHT inputs={Object.entries(inputs).slice(9, 11)} setInputs={setInputs} errors={errors} touched={touched} />
                                <FormLIGHT inputs={Object.entries(inputs).slice(11, 14)} setInputs={setInputs} errors={errors} touched={touched} />
                                <div style={{display: "flex", flexFlow: "column", gap: 10}}>
                                    <div style={{display: "flex", justifyContent: "space-between"}}>
                                        <div style={{fontSize: 16, fontWeight: 300, color: "#bbb"}}>Сумма</div>
                                        <div style={{fontSize: 16, fontWeight: 300, color: "#bbb"}}>{total[0]} ₽</div>
                                    </div>
                                    <div style={{display: "flex", justifyContent: "space-between"}}>
                                        <div style={{fontSize: 18, fontWeight: 300, color: "#fff"}}>Итоговая сумма</div>
                                        <div style={{fontSize: 18, fontWeight: 300, color: "#fff"}}>{total[0]} ₽</div>
                                    </div>     
                                </div>
                                <Button text="Подтвердить заказ" handleClick={handleSubmit} />
                            </div>
                            <ScrollToError/>
                        </Form>
                    )}
                    </Formik>  
                </div>
                {sended && <SendedHover handleClose={() => {
                    setSended(false);
                    setCartItems([]);
                    navigate("/");
                }}/>}
            </div>
        );
    } else {
        return (
            <div style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexFlow: "column",
                gap: 20
            }}>
                <div style={{fontSize: 18, fontWeight: 300, color: "#bbb"}}>Ваша корзина пустая</div>
                <div>
                    <Button text={"Выбрать букет"} small={true} handleClick={() => navigate("/search", {replace: true})} />
                </div>
            </div>
        )
    }
    
}

export default Cart;
