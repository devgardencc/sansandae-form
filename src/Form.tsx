import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import './Form.css';
import type { FormValues } from './types';
import kakaoLogo from './assets/kakao.png';

const routeInfo = {
    mountain: '마니산',
    address: '경기 김포시 김포한강9로76번길 63 아스타프라자 110호',
    addressLink: 'https://place.map.kakao.com/27603053',
    time: '2026-12-31T11:00',
    spot: '인천 강화군 화도면 해안남로1170번길 20',
    spotLink: 'https://place.map.kakao.com/23916795',
};

const initialValues: FormValues = {
    mountain: routeInfo.mountain,
    address: routeInfo.address,
    time: routeInfo.time,
    spot: routeInfo.spot,
    name: '',
    phone: '',
    telegram: '',
    club: '',
    photo: false,
};

function Form() {
    const [values, setValues] = useState<FormValues>(initialValues);
    const [status, setStatus] = useState<'editing' | 'success' | 'error'>(
        'editing'
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setValues((previous) => ({
            ...previous,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            console.info('Заявка на восхождение:', { ...values });
            setStatus('success');
        } catch {
            setStatus('error');
        }
    };

    return (
        <div className="reg-page">
            <div className="sheet">
                {status === 'editing' ? (
                    <form onSubmit={handleSubmit}>
                        <header className="form-heading">
                            <p className="eyebrow">
                                Регистрация на восхождение
                            </p>
                            <h2>Регистрация</h2>
                            <p>
                                Информация о маршруте уже задана. Заполните
                                контакты для связи с организатором.
                            </p>
                        </header>

                        <fieldset>
                            <legend>О маршруте</legend>
                            <dl className="route-info">
                                <div>
                                    <dt>Гора</dt>
                                    <dd>{values.mountain}</dd>
                                </div>
                                <div>
                                    <dt>Адрес организатора</dt>
                                    <dd>
                                        {values.address}
                                        <a
                                            className="map-link"
                                            href={routeInfo.addressLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="Открыть адрес организатора в Kakao Map"
                                        >
                                            <img src={kakaoLogo} alt="" />
                                        </a>
                                    </dd>
                                </div>
                                <div>
                                    <dt>Дата и время сбора</dt>
                                    <dd>
                                        {new Date(values.time).toLocaleString(
                                            'ru-RU',
                                            {
                                                dateStyle: 'medium',
                                                timeStyle: 'short',
                                            }
                                        )}
                                    </dd>
                                </div>
                                <div>
                                    <dt>Точка сбора</dt>
                                    <dd>
                                        {values.spot}
                                        <a
                                            className="map-link"
                                            href={routeInfo.spotLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="Открыть точку сбора в Kakao Map"
                                        >
                                            <img src={kakaoLogo} alt="" />
                                        </a>
                                    </dd>
                                </div>
                            </dl>
                        </fieldset>

                        <fieldset>
                            <legend>Ваши контакты</legend>
                            <div className="field">
                                <label htmlFor="fullName">
                                    Имя и фамилия{' '}
                                    <span aria-hidden="true">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    required
                                    autoComplete="name"
                                    placeholder="Как к вам обращаться"
                                />
                            </div>
                            <div className="row">
                                <div className="field">
                                    <label htmlFor="phone">
                                        Номер телефона{' '}
                                        <span aria-hidden="true">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={values.phone}
                                        onChange={handleChange}
                                        required
                                        autoComplete="tel"
                                        inputMode="tel"
                                        placeholder="+82 10 1234 5678"
                                    />
                                </div>
                                <div className="field">
                                    <label htmlFor="telegram">
                                        Telegram{' '}
                                        <span aria-hidden="true">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="telegram"
                                        name="telegram"
                                        value={values.telegram}
                                        onChange={handleChange}
                                        required
                                        autoComplete="off"
                                        placeholder="@username"
                                    />
                                </div>
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend>Дополнительно</legend>
                            <div className="field">
                                <span className="choice-label" id="club-label">
                                    Состоите в хайкинг-клубе?{' '}
                                    <span aria-hidden="true">*</span>
                                </span>
                                <div
                                    className="yesno"
                                    role="radiogroup"
                                    aria-labelledby="club-label"
                                >
                                    <label className="opt">
                                        <input
                                            type="radio"
                                            name="club"
                                            value="yes"
                                            checked={values.club === 'yes'}
                                            onChange={handleChange}
                                            required
                                        />
                                        <span>Да</span>
                                    </label>
                                    <label className="opt">
                                        <input
                                            type="radio"
                                            name="club"
                                            value="no"
                                            checked={values.club === 'no'}
                                            onChange={handleChange}
                                        />
                                        <span>Нет</span>
                                    </label>
                                </div>
                            </div>
                            <label className="consent" htmlFor="photoConsent">
                                <input
                                    type="checkbox"
                                    id="photoConsent"
                                    name="photo"
                                    checked={values.photo}
                                    onChange={handleChange}
                                    required
                                />
                                <span>
                                    Согласен(на) на фото- и видеосъёмку во время
                                    восхождения
                                </span>
                            </label>
                        </fieldset>

                        <button type="submit" className="submit">
                            Отправить заявку <span aria-hidden="true">↗</span>
                        </button>
                        <p className="hint">
                            Пока заявка не отправляется на сервер: данные
                            появятся в консоли браузера.
                        </p>
                    </form>
                ) : (
                    <section
                        className={`submission-state ${status}`}
                        role="status"
                        aria-live="polite"
                    >
                        <div className="submission-icon" aria-hidden="true">
                            {status === 'success' ? '✓' : '!'}
                        </div>
                        <p className="eyebrow">
                            {status === 'success'
                                ? 'Заявка отправлена'
                                : 'Не удалось отправить'}
                        </p>
                        <h2>
                            {status === 'success'
                                ? 'Данные готовы'
                                : 'Попробуйте ещё раз'}
                        </h2>
                        <p>
                            {status === 'success'
                                ? 'Заявка передана организатору. Сейчас данные только выведены в консоль браузера — API ещё не подключено.'
                                : 'Произошла ошибка. Пожалуйста, попробуйте снова через 3 секунды.'}
                        </p>
                        {status === 'error' && (
                            <button
                                className="retry-button"
                                type="button"
                                onClick={() => setStatus('editing')}
                            >
                                Вернуться к форме
                            </button>
                        )}
                    </section>
                )}
            </div>
        </div>
    );
}

export default Form;
