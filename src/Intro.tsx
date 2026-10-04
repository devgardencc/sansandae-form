import logo from './assets/logo.jpg';
import './Intro.css';
function Intro() {
    return (
        <section className="intro-panel" aria-labelledby="page-title">
            <div className="topline">
                <span>SUMMIT FORM</span>
                <span>SANSANDAE</span>
            </div>
            <div className="hero-mark">
                <img
                    src={logo}
                    alt="Логотип с изображением горы и красных флажков"
                />
            </div>
            <div className="intro-copy">
                <p className="eyebrow">Собираемся выше обычного</p>
                <h1 id="page-title">
                    Встретимся
                    <br />
                    <em>у подножия</em>
                </h1>
            </div>
            <div
                className="route-note"
                aria-label="Информация о регистрации"
            ></div>
        </section>
    );
}

export default Intro;
