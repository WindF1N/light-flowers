import styles from './styles/Main.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Title from '../components/Title';
import Filter from '../components/Filter';
import Post from '../components/Post';
import { useMainContext } from '../context';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function Search() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const cardId = params.get('card_id');
  const { sendMessage, message, setMessage } = useMainContext();
  const navigate = useNavigate();
  const [ view, setView ] = useState("grid");
  const [ sortBy, setSortBy ] = useState("Сначала популярные");
  const [ posts, setPosts ] = useState([]);
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
  const [ selectedColors, setSelectedColors ] = useState([]);
  const [ selectedSizes, setSelectedSizes ] = useState([]);
  const [ selectedPackages, setSelectedPackages ] = useState([]);
  const [ price, setPrice ] = useState([1000, 5000]);
  const categories = [
    "Розы с любовью",
    "Подарки"
  ]
  const [ selectedCategory, setSelectedCategory ] = useState("Розы с любовью");
  useEffect(() => {
    if (message && window.location.pathname === "/search") {
      if (message[0] === 'cards') {
        if (message[1] === 'filter') {
          setPosts(prevState => [...prevState, ...message[2].filter(item => {
            const isInMessage = prevState.some(msgItem => msgItem._id === item._id);
            return !isInMessage;
          })]);
        }
      }
      setMessage(null);
    };
  }, [message]);
  useEffect(() => {
    let sort = 0;
    if (sortBy === "Сначала недорогие") {
      sort = 2
    } else if (sortBy === "Сначала дорогие") {
      sort = 1
    };
    if (selectedCounts.length > 0 || selectedColors.length > 0 || selectedSizes.length > 0 || selectedPackages.length > 0) {
      let filter_query = {}
      if (selectedCategory === "Розы с любовью") {
        if (selectedCounts.length > 0) {
          filter_query["counts"] = { $in: selectedCounts }
        }
        if (selectedColors.length > 0) {
          filter_query["colors"] = { $in: selectedColors }
        }
        if (selectedColors.length > 0) {
          filter_query["sizes"] = { $in: selectedSizes }
        }
        if (selectedColors.length > 0) {
          filter_query["packages"] = { $in: selectedPackages }
        }
      }
      setPosts(prevState => prevState.filter((item) => item.category !== selectedCategory))
      sendMessage(JSON.stringify(["cards", "filter", {"category": selectedCategory, ...filter_query}, 25, sort, price]));
    } else {
      sendMessage(JSON.stringify(["cards", "filter", {"category": selectedCategory}, 25, sort, price]));
    }
    if (cardId) {
      sendMessage(JSON.stringify(["cards", "filter", {"_id": cardId}, 1]))
    }
  }, [selectedCounts, selectedColors, selectedSizes, selectedPackages, selectedCategory, sortBy])
  return (
    <>
      <div className="view">
        <div className={styles.header} style={{paddingBottom: 15, paddingTop: 15, borderBottom: "0.5px solid #18181A", marginLeft: -15, width: "100vw", paddingLeft: 15}}>
          <div style={{display: "flex", alignItems: "center", gap: 15}}>
            <div>
              <img src={require("./images/splash.svg").default} alt="" style={{width: 40}} />
            </div>
            <div style={{marginBottom: 4}}>
              <div style={{fontSize: 20, fontWeight: 300}}>Студия <span>Роз</span></div>
              <div style={{fontSize: 11, fontWeight: 300, color: "#999999"}}>Нежность в каждом лепестке</div>
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
              <option value="Сначала недорогие" selected={sortBy === "Сначала недорогие"}>Сначала недорогие</option>
              <option value="Сначала дорогие" selected={sortBy === "Сначала дорогие"}>Сначала дорогие</option>
              <option value="Сначала популярные" selected={sortBy === "Сначала популярные"}>Сначала популярные</option>
            </select>
          </div>
          <div style={{display: "flex", alignItems: "center", columnGap: 8}} onClick={openFilter}>
            <img src={require("../screens/images/compare.svg").default} alt="" style={{filter: "brightness(.6)"}} /> <div style={{fontSize: 15, fontWeight: 300}}>Фильтры</div>
          </div>
        </div>
        {selectedCategory === "Розы с любовью" &&
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
        </div>}
        {view === "grid" &&
        <div style={{display: "flex", flexWrap: "wrap", gap: 10}}>
          {posts.filter((post) => post.category === selectedCategory).sort((a, b) => {
            if (sortBy === "Сначала дорогие") {
              return b.price_number - a.price_number
            } else if (sortBy === "Сначала недорогие") {
              return a.price_number - b.price_number
            }
          }).map((post) => (
            <div key={post._id}>
              <Post postData={post} type="block" basePathUrl="/search" />
            </div>
          ))}
        </div>}
        {view === "list" && 
        <div style={{display: "flex", flexFlow: "column", rowGap: 20, marginTop: 5}}>
          {posts.filter((post) => post.category === selectedCategory).sort((a, b) => b.price_number - a.price_number).map((post) => (
            <div key={post._id}>
              <Post postData={post} type="line" basePathUrl="/search" />
            </div>
          ))}
        </div>}
        {posts.filter((post) => post.category === selectedCategory).length === 0 &&
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100vw",
          fontSize: 16,
          color: "#bbb",
          fontWeight: 300
        }}>
          Список товаров пуст  
        </div>}
      </div>
      {isOpenFilter &&
        <Filter setIsOpenFilter={setIsOpenFilter} 
                selectedColors={selectedColors} 
                setSelectedColors={setSelectedColors}
                selectedCounts={selectedCounts}
                setSelectedCounts={setSelectedCounts}
                selectedSizes={selectedSizes}
                setSelectedSizes={setSelectedSizes}
                selectedPackages={selectedPackages}
                setSelectedPackages={setSelectedPackages}
                selectedCategory={selectedCategory}
                price={price}
                setPrice={setPrice} />}
    </>
  );
}

export default Search;
