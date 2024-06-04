import styles from './styles/Add.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useMainContext } from '../context';
import Slider from '../components/Slider';
import MiniSlider from '../components/MiniSlider';
import FormLIGHT from '../components/FormLIGHT';
import Button from '../components/Button';
import LoadingHover from '../components/LoadingHover';
import ScrollToError from '../components/ScrollToError';
import AddPrice from '../components/AddPrice';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

const validationSchema = Yup.object().shape({
  "input1": Yup.string()
    .max(100, 'Макс. длина 100')
    .required("Обязательное поле")
});

function Add() {

  const navigate = useNavigate();

  const { state, setState, accessToken, refreshToken, sendMessage, setLoading, postId, setPostId, message, setMessage } = useMainContext();

  const [ more, setMore ] = useState(false);
  const imagesDivRef = useRef();
  const [ images, setImages ] = useState([]);
  const [ activeImage, setActiveImage ] = useState(0);
  const [ photosError, setPhotosError ] = useState(null);
  const [ images2, setImages2 ] = useState([]);
  const [ inputs, setInputs ] = useState({
    "category": {
      value: null,
      isFocused: false,
      error: null,
      label: "Категория",
      type: "select",
      choices: [
        "Розы с любовью",
        "Подарки"
      ]
    },
    "title": {
      value: null,
      isFocused: false,
      error: null,
      label: "Название",
      type: "text"
    },
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
  const [ saving, setSaving ] = useState(false);

  useEffect(() => {
    window.scrollTo({top: 0});
  }, [])

  // useEffect(() => {
  //   if (!postId) {
  //     sendMessage(JSON.stringify(["posts", "create"]));
  //   }
  // }, [postId])

  const handleSubmit = (values) => {
    if (images.length === 0) {
      setPhotosError("Добавьте хотя бы 1 фотографию");
      return
    }
    images.forEach((image, index) => {
      sendMessage(JSON.stringify(["images", "add", postId, image.file, "main", index]));
    });
    sendMessage(JSON.stringify(["posts", "update", postId, {...values, status: 1}]));
    setSaving(true);
  }

  useEffect(() => {
    if (message) {
      if (message[0] === 'posts') {
        if (message[1] === 'new') {
          navigate("/posts/" + postId, {replace: true});
        }
      }
      setMessage(null);
    };
  }, [message]);

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
    <div className="view">
      <div className={styles.wrapper} style={{marginBottom: 20}}>
        <Slider images={images}
                imagesDivRef={imagesDivRef}
                setActiveImage={setActiveImage}
                canAdd={true}
                activeImage={activeImage}
                setImages={setImages}
                maxImagesCount={10}
                photosError={photosError}
                setPhotosError={setPhotosError}
                />
        {images.length > 0 &&
          <MiniSlider images={images}
                      imagesDivRef={imagesDivRef}
                      activeImage={activeImage}
                      canAdd={true}
                      setImages={setImages}
                      maxImagesCount={10}
                      />}
      </div>
      <Formik
        initialValues={{
          "category": "Розы с любовью",
          "title": ""
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
      {({ errors, touched, handleSubmit, values }) => (
        <Form>
          <div className={styles.flex20gap}>
            <FormLIGHT inputs={Object.entries(inputs).slice(0, 1)} setInputs={setInputs} errors={errors} touched={touched} />
            <FormLIGHT inputs={Object.entries(inputs).slice(1, 2)} setInputs={setInputs} errors={errors} touched={touched} />
            <div>
                <div style={{fontSize: 14, fontWeight: 300, paddingBottom: 10, color: "#bbb"}}>Доступные цвета</div>
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
              <div style={{fontSize: 14, fontWeight: 300, paddingBottom: 10, color: "#bbb"}}>Доступное количество цветов</div>
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
              <div style={{fontSize: 14, fontWeight: 300, paddingBottom: 10, color: "#bbb"}}>Доступные размеры букета</div>
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
              <div style={{fontSize: 14, fontWeight: 300, paddingBottom: 10, color: "#bbb"}}>Доступные упаковки</div>
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
            <FormLIGHT inputs={Object.entries(inputs).slice(2)} setInputs={setInputs} errors={errors} touched={touched} />
            <AddPrice />
            <Button text="Сохранить" />
          </div>
          <ScrollToError/>
        </Form>
      )}
      </Formik>
      {saving && <LoadingHover />}
    </div>
  );
}

export default Add;
