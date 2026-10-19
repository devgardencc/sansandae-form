import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import type { FormValues, RegisterHikeRequest } from './types';
import { registerHike } from './core';
import RouteSummary from './RouteSummary';
import SubmissionStatus from './SubmissionStatus';
import { getInitialFormValues, readRouteInfoFromUrl } from './routeInfo';

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

function Form() {
    const [routeInfo] = useState(() =>
        readRouteInfoFromUrl(window.location.search)
    );
    const [values, setValues] = useState<FormValues>(() =>
        getInitialFormValues(routeInfo)
    );
    const [status, setStatus] = useState<'editing' | 'success' | 'error'>(
        'editing'
    );
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setValues((previous) => ({
            ...previous,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');

        const dateOnly = values.time ? values.time.split('T')[0] : '';
        const payload: RegisterHikeRequest = {
            name: values.name.trim(),
            phone: values.phone.trim(),
            tg: values.telegram.trim(),
            club: values.club === 'yes',
            photo: values.photo,
            mountain: values.mountain.trim(),
            date: dateOnly,
        };

        try {
            await registerHike(payload);
            setStatus('success');
        } catch (error) {
            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : 'Произошла непредвиденная ошибка.'
            );
            setStatus('error');
        } finally {
            setIsLoading(false);
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
                    </header>

                    <RouteSummary values={values} routeInfo={routeInfo} />

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
                                placeholder="HONG SAMPLE"
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
                                    placeholder="01012345678"
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
                        className="mt-[25px] flex min-h-[55px] w-full cursor-pointer items-center justify-between border border-[#d73428] bg-[#d73428] px-[18px] text-left text-xs font-bold uppercase tracking-[.08em] text-white transition hover:border-[#171715] hover:bg-[#171715] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#171715] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:border-[#d73428] disabled:hover:bg-[#d73428]"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Отправка...' : 'Отправить заявку'}{' '}
                        <span
                            className="text-xl font-normal"
                            aria-hidden="true"
                        >
                            {isLoading ? '⏳' : '↗'}
                        </span>
                    </button>
                </form>
            ) : (
                <SubmissionStatus
                    status={status}
                    errorMessage={errorMessage}
                    onReturn={() => setStatus('editing')}
                />
            )}
        </div>
    );
}

export default Form;
