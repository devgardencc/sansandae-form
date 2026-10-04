import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
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

const fieldsetClass =
    'm-0 min-w-0 border-0 border-b border-solid border-[#d9d3c8] p-0 pb-[27px] [&+fieldset]:pt-[27px]';
const legendClass =
    'w-full pb-[18px] text-[11px] font-bold uppercase tracking-[.14em] text-[#171715]';
const fieldClass = 'mb-[18px] min-w-0 last:mb-0';
const labelClass =
    'mb-2 block text-[12px] font-semibold text-[#77736b] [&>span]:text-[#d73428]';
const inputClass =
    'h-[47px] w-full min-w-0 rounded-[2px] border border-[#d9d3c8] bg-white px-3 text-sm text-[#171715] outline-none transition placeholder:text-[#aaa69d] focus-visible:border-[#171715] focus-visible:ring-[3px] focus-visible:ring-[#f5d9d3]';
const rowClass =
    'grid grid-cols-2 gap-4 max-[560px]:grid-cols-1 max-[560px]:gap-0';
const mapLinkClass =
    'mt-[7px] flex w-fit items-center gap-[5px] text-[11px] font-semibold text-[#77736b] no-underline transition hover:text-[#d73428] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#d73428]';

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
        <div className="w-full text-[#171715]">
            {status === 'editing' ? (
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <header className="mb-[30px]">
                        <p className="mb-3 text-[11px] font-bold uppercase tracking-[.13em] text-[#d73428]">
                            Регистрация на восхождение
                        </p>
                        <h2 className="font-display text-[clamp(27px,3vw,36px)] font-semibold leading-[1.08] tracking-[-.04em]">
                            Регистрация
                        </h2>
                        <p className="mt-3 text-sm leading-[1.55] text-[#77736b]">
                            Информация о маршруте уже задана. Заполните контакты
                            для связи с организатором.
                        </p>
                    </header>

                    <fieldset className={fieldsetClass}>
                        <legend className={legendClass}>О маршруте</legend>
                        <dl className="m-0 grid gap-0 bg-[#f4f0e8] px-4 py-1">
                            <div className="grid grid-cols-[minmax(125px,.7fr)_1.3fr] gap-[14px] border-b border-solid border-[#d9d3c8] py-[11px] last:border-b-0 max-[560px]:grid-cols-1 max-[560px]:gap-1">
                                <dt className="text-xs text-[#77736b]">Гора</dt>
                                <dd className="m-0 wrap-anywhere text-[13px] font-semibold">
                                    {values.mountain}
                                </dd>
                            </div>
                            <div className="grid grid-cols-[minmax(125px,.7fr)_1.3fr] gap-[14px] border-b border-solid border-[#d9d3c8] py-[11px] last:border-b-0 max-[560px]:grid-cols-1 max-[560px]:gap-1">
                                <dt className="text-xs text-[#77736b]">
                                    Адрес горы
                                </dt>
                                <dd className="m-0 wrap-anywhere text-[13px] font-semibold">
                                    {values.address}
                                    <a
                                        className={mapLinkClass}
                                        href={routeInfo.addressLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Открыть адрес организатора в Kakao Map"
                                    >
                                        <img
                                            className="block h-[36px] w-[72px] shrink-0 object-contain"
                                            src={kakaoLogo}
                                            alt=""
                                        />
                                    </a>
                                </dd>
                            </div>
                            <div className="grid grid-cols-[minmax(125px,.7fr)_1.3fr] gap-[14px] border-b border-solid border-[#d9d3c8] py-[11px] last:border-b-0 max-[560px]:grid-cols-1 max-[560px]:gap-1">
                                <dt className="text-xs text-[#77736b]">
                                    Дата и время сбора
                                </dt>
                                <dd className="m-0 wrap-anywhere text-[13px] font-semibold">
                                    {new Date(values.time).toLocaleString(
                                        'ru-RU',
                                        {
                                            dateStyle: 'medium',
                                            timeStyle: 'short',
                                        }
                                    )}
                                </dd>
                            </div>
                            <div className="grid grid-cols-[minmax(125px,.7fr)_1.3fr] gap-[14px] border-b border-solid border-[#d9d3c8] py-[11px] last:border-b-0 max-[560px]:grid-cols-1 max-[560px]:gap-1">
                                <dt className="text-xs text-[#77736b]">
                                    Точка сбора
                                </dt>
                                <dd className="m-0 wrap-anywhere text-[13px] font-semibold">
                                    {values.spot}
                                    <a
                                        className={mapLinkClass}
                                        href={routeInfo.spotLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Открыть точку сбора в Kakao Map"
                                    >
                                        <img
                                            className="block h-[36px] w-[72px] shrink-0 object-contain"
                                            src={kakaoLogo}
                                            alt=""
                                        />
                                    </a>
                                </dd>
                            </div>
                        </dl>
                    </fieldset>

                    <fieldset className={fieldsetClass}>
                        <legend className={legendClass}>Ваши контакты</legend>
                        <div className={fieldClass}>
                            <label className={labelClass} htmlFor="fullName">
                                Имя и фамилия <span aria-hidden="true">*</span>
                            </label>
                            <input
                                className={inputClass}
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
                        <div className={rowClass}>
                            <div className={fieldClass}>
                                <label className={labelClass} htmlFor="phone">
                                    Номер телефона{' '}
                                    <span aria-hidden="true">*</span>
                                </label>
                                <input
                                    className={inputClass}
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
                            <div className={fieldClass}>
                                <label
                                    className={labelClass}
                                    htmlFor="telegram"
                                >
                                    Telegram <span aria-hidden="true">*</span>
                                </label>
                                <input
                                    className={inputClass}
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

                    <fieldset className={fieldsetClass}>
                        <legend className={legendClass}>Дополнительно</legend>
                        <div className={fieldClass}>
                            <span
                                className={`${labelClass} mb-2`}
                                id="club-label"
                            >
                                Состоите в хайкинг-клубе?{' '}
                                <span aria-hidden="true">*</span>
                            </span>
                            <div
                                className="grid grid-cols-2 gap-2"
                                role="radiogroup"
                                aria-labelledby="club-label"
                            >
                                <label className="relative m-0 cursor-pointer">
                                    <input
                                        className="peer sr-only"
                                        type="radio"
                                        name="club"
                                        value="yes"
                                        checked={values.club === 'yes'}
                                        onChange={handleChange}
                                        required
                                    />
                                    <span className="block border border-[#d9d3c8] p-3 text-center text-[13px] text-[#77736b] transition peer-checked:border-[#171715] peer-checked:bg-[#171715] peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#d73428]">
                                        Да
                                    </span>
                                </label>
                                <label className="relative m-0 cursor-pointer">
                                    <input
                                        className="peer sr-only"
                                        type="radio"
                                        name="club"
                                        value="no"
                                        checked={values.club === 'no'}
                                        onChange={handleChange}
                                    />
                                    <span className="block border border-[#d9d3c8] p-3 text-center text-[13px] text-[#77736b] transition peer-checked:border-[#171715] peer-checked:bg-[#171715] peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#d73428]">
                                        Нет
                                    </span>
                                </label>
                            </div>
                        </div>
                        <label className="mt-[22px] grid cursor-pointer grid-cols-[18px_1fr] items-start gap-[10px] text-xs leading-[1.5] text-[#77736b]">
                            <input
                                className="mt-px h-[17px] w-[17px] accent-[#d73428]"
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

                    <button
                        className="mt-[25px] flex min-h-[55px] w-full cursor-pointer items-center justify-between border border-[#d73428] bg-[#d73428] px-[18px] text-left text-xs font-bold uppercase tracking-[.08em] text-white transition hover:border-[#171715] hover:bg-[#171715] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#171715]"
                        type="submit"
                    >
                        Отправить заявку{' '}
                        <span
                            className="text-xl font-normal"
                            aria-hidden="true"
                        >
                            ↗
                        </span>
                    </button>
                    <p className="mt-[13px] text-center text-[11px] leading-[1.5] text-[#77736b]">
                        Пока заявка не отправляется на сервер: данные появятся в
                        консоли браузера.
                    </p>
                </form>
            ) : (
                <section
                    className="mx-auto max-w-[500px] py-[clamp(28px,5vw,58px)] text-center"
                    role="status"
                    aria-live="polite"
                >
                    <div
                        className={`mx-auto mb-[22px] grid h-[58px] w-[58px] place-items-center rounded-full text-[27px] text-white ${status === 'success' ? 'bg-[#d73428]' : 'bg-[#171715]'}`}
                        aria-hidden="true"
                    >
                        {status === 'success' ? '✓' : '!'}
                    </div>
                    <p className="mb-[10px] text-[11px] font-bold uppercase tracking-[.13em] text-[#d73428]">
                        {status === 'success'
                            ? 'Заявка отправлена'
                            : 'Не удалось отправить'}
                    </p>
                    <h2 className="font-display text-[clamp(30px,4vw,42px)] font-semibold leading-[1.05] tracking-[-.04em]">
                        {status === 'success'
                            ? 'Данные готовы'
                            : 'Попробуйте ещё раз'}
                    </h2>
                    <p className="mt-[14px] text-sm leading-[1.6] text-[#77736b]">
                        {status === 'success'
                            ? 'Заявка передана организатору. Сейчас данные только выведены в консоль браузера — API ещё не подключено.'
                            : 'Произошла ошибка. Пожалуйста, попробуйте снова через 3 секунды.'}
                    </p>
                    {status === 'error' && (
                        <button
                            className="mt-[25px] min-h-12 cursor-pointer border border-[#d9d3c8] bg-transparent px-5 text-xs font-semibold text-[#171715] hover:border-[#171715] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#171715]"
                            type="button"
                            onClick={() => setStatus('editing')}
                        >
                            Вернуться к форме
                        </button>
                    )}
                </section>
            )}
        </div>
    );
}

export default Form;
