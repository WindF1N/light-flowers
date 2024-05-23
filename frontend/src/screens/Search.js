import styles from './styles/Search.module.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import FixedButton from '../components/FixedButton';
import SearchInput from '../components/SearchInput';
import Title from '../components/Title';
import { useMainContext } from '../context';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function Search() {

  const navigate = useNavigate();

  const { account, sendMessage, message, setMessage, posts, setPosts, users, select, setSelect, transportView, setTransportView, servicesView, setServicesView, services_View, setServices_View, dealersView, setDealersView } = useMainContext();
  const [ view, setView ] = useState("grid");
  const [ sortBy, setSortBy ] = useState("Сначала недорогие");

  useEffect(() => {
    window.scrollTo({top: 0, smooth: "behavior"});
    console.log("behavior")
  }, [])

  return (
    <div className="view">
      <Title text="Каталог" allowGrid={() => setView("grid")} allowBlocks={() => setView("list")} selected={view}/>
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
        <div style={{display: "flex", alignItems: "center", columnGap: 8}}>
          <img src={require("../screens/images/compare.svg").default} alt="" style={{filter: "brightness(.6)"}} /> <div style={{fontSize: 15, fontWeight: 300}}>Фильтры</div>
        </div>
      </div>
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
    </div>
  );
}

export default Search;
