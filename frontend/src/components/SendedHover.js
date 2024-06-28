import styles from './styles/LoadingHover.module.css';

function SendedHover({ handleClose }) {
  return (
    <div className={styles.hoverWrapper}>
      <div className={styles.hover}>
        <div style={{position: "relative", width: "300px", height: "200px", background: "linear-gradient(to top, rgb(0, 0, 0) 50%, rgb(26, 24, 24) 100%)", borderRadius: 9, display: "flex", alignItems: "flex-start", justifyContent: "center", flexFlow: "column"}}>
          <div style={{fontWeight: 400, fontSize: 18, padding: "20px"}}>
            Спасибо!<br/>
            Заявка отправлена!
          </div>
          <div style={{fontWeight: 300, fontSize: 14, padding: "20px"}}>
            Сейчас наши специалисты пляшут от радости,
            Как только они успокоятся сразу же вам перезвонят)
          </div>
          <div style={{position: "absolute", padding: 15, top: 0, right: 0}} onClick={handleClose}>
            <img src={require("./images/close.svg").default} alt='' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SendedHover;
