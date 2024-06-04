import styles from './styles/Main.module.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Title from '../components/Title';
import Filter from '../components/Filter';
import Post from '../components/Post';
import { useMainContext } from '../context';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function Search() {

  const navigate = useNavigate();
  const [ view, setView ] = useState("grid");
  const [ sortBy, setSortBy ] = useState("Сначала недорогие");
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
  useEffect(() => {
    window.scrollTo({top: 0, smooth: "behavior"});
  }, [])
  const [ isOpenFilter, setIsOpenFilter ] = useState(false);
  const openFilter = () => {
    setIsOpenFilter(true);
  }
  useEffect(() => {
    if (isOpenFilter) {
      const scrollY = window.scrollY;
      document.querySelector("html").style.overflow = "hidden";
      document.querySelector("body").style.overflow = "hidden";
      document.querySelector("body").style.position = "fixed";
      document.querySelector("body").style.top = `-${scrollY}px`
    }
  }, [isOpenFilter])
  const counts = [
    "19 роз",
    "29 роз",
    "51 роза",
    "101 роза"
  ]
  const [ selectedCounts, setSelectedCounts ] = useState([]);
  const categories = [
    "Розы с любовью",
    "Подарки"
  ]
  const [ selectedCategory, setSelectedCategory ] = useState("Розы с любовью");
  return (
    <>
      <div className="view">
        <div className={styles.header} style={{paddingBottom: 15, paddingTop: 15, borderBottom: "0.5px solid #18181A", marginLeft: -15, width: "100vw", paddingLeft: 15}}>
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
        <Title text={selectedCategory} allowGrid={() => setView("grid")} allowBlocks={() => setView("list")} selected={view} canChangeTitle={true} choices={categories} selectedChoice={selectedCategory} setSelectedChoice={setSelectedCategory} />
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 20}}>
          <div style={{display: "flex", alignItems: "center", columnGap: 8}} onClick={() => {
            document.getElementById(`sort`).focus();
            document.getElementById(`arrow`).style.transform = "rotate(270deg)";
          }}>
            <div style={{fontSize: 15, fontWeight: 300}}>{sortBy}</div> <img id="arrow" src={require("../components/images/arrow-right.svg").default} alt="arrow right" style={{transition: ".2s", filter: "brightness(.6)", transform: "rotate(90deg)"}}/>
            <select id="sort" style={{opacity: 0, width: 0, height: 0, margin: 0, padding: 0}} onChange={(e) => {document.getElementById(`arrow`).style.transform = "rotate(90deg)";setSortBy(e.target.value)}} onBlur={() => {document.getElementById(`arrow`).style.transform = "rotate(90deg)"}}>
              <option value="Сначала недорогие">Сначала недорогие</option>
              <option value="Сначала дорогие">Сначала дорогие</option>
              <option value="Сначала популярные">Сначала популярные</option>
            </select>
          </div>
          <div style={{display: "flex", alignItems: "center", columnGap: 8}} onClick={openFilter}>
            <img src={require("../screens/images/compare.svg").default} alt="" style={{filter: "brightness(.6)"}} /> <div style={{fontSize: 15, fontWeight: 300}}>Фильтры</div>
          </div>
        </div>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          paddingBottom: 20
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
                    fontSize: 15,
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
        {view === "grid" &&
        <div style={{display: "flex", flexWrap: "wrap", gap: 10}}>
          {posts.map((post) => (
            <div key={post._id}>
              <Post data={post} type="block" />
            </div>
          ))}
        </div>}
        {view === "list" && 
        <div style={{display: "flex", flexFlow: "column", rowGap: 20, marginTop: 5}}>
          {posts.map((post) => (
            <div key={post._id}>
              <Post data={post} type="line" />
            </div>
          ))}
        </div>}
      </div>
      {isOpenFilter &&
        <Filter setIsOpenFilter={setIsOpenFilter} />}
    </>
  );
}

export default Search;
