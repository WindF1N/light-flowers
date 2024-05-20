import styles from './styles/Title.module.css';
import { useState } from 'react';

function Title({ text, allowGrid, allowBlocks, allowActions, actions, selected, showMore }) {

  return (
    <div className={styles.title}>
      <div className={styles.text}>
        {text}
        {showMore && 
        <div onClick={showMore}>
          Показать всё <img src={require("./images/arrow-right.svg").default} alt="" />
        </div>}
      </div>
      <div className={styles.views}>
        {allowGrid &&
          <div className={styles.view} onClick={allowGrid}>
            {selected === "grid" ?
              <img src={require("./images/display1-active.svg").default} alt="" />
            :
              <img src={require("./images/display1.svg").default} alt="" />}
          </div>}
        {allowBlocks &&
          <div className={styles.view} onClick={allowBlocks}>
            {selected === "list" ?
              <img src={require("./images/display2-active.svg").default} alt="" />
            :
              <img src={require("./images/display2.svg").default} alt="" />}
          </div>}
        {allowActions &&
          actions.map((action) => (
            <div className={styles.view} onClick={action.onClick}>
              <img src={action.icon} alt="" />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Title;
