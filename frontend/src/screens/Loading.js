import styles from './styles/Loading.module.css';

function Loading() {
  return (
    <div className="view">
      <div className={styles.emptyPage}>
        <div className={styles.loading}>
          <div>
            <img src={require("./images/splash.svg").default} alt="" style={{width: 74}} />
            <div style={{fontSize: 15, fontWeight: 300, marginTop: 5, textAlign: "center", color: "#D9CBCB"}}>
              AutoLIGHT
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
