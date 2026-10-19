import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import type { FormValues, RegisterHikeRequest } from './types';
import { registerHike } from './core';
import RouteSummary from './RouteSummary';
import SubmissionStatus from './SubmissionStatus';
import { getInitialFormValues, readRouteInfoFromUrl } from './routeInfo';

const fieldsetClass =
  'm-0 min-w-0 border-0 border-b border-solid border-line p-0 pb-[26px] [&+fieldset]:pt-[26px]';
const legendClass =
  'w-full pb-4 text-xs font-bold uppercase tracking-[.14em] text-ink';
const fieldClass = 'mb-5 min-w-0 last:mb-0';
const labelClass =
  'mb-2 block text-[13px] font-semibold text-muted [&>span]:text-accent';
const inputClass =
  'h-[50px] w-full min-w-0 rounded-[2px] border border-line bg-white px-3 text-base text-ink outline-none transition-colors duration-200 placeholder:text-subtle focus-visible:border-ink focus-visible:ring-[3px] focus-visible:ring-accent-soft';
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
    <div className="w-full text-ink">
      {status === 'editing' ? (
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <header className="mb-7">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[.16em] text-accent">
              Регистрация на восхождение
            </p>
            <h2
              id="form-title"
              className="font-display text-[clamp(28px,3.2vw,38px)] font-semibold leading-[1.05] tracking-[-.045em]"
            >
              Давайте знакомиться
            </h2>
            <p className="mt-3 max-w-[38ch] text-sm leading-[1.65] text-muted">
              Оставьте контакты, чтобы организаторы могли подтвердить ваше
              участие.
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
                  Номер телефона <span aria-hidden="true">*</span>
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
                <label className={labelClass} htmlFor="telegram">
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
              <span className={`${labelClass} mb-2`} id="club-label">
                Состоите в хайкинг-клубе? <span aria-hidden="true">*</span>
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
                  <span className="block rounded-[2px] border border-line p-3 text-center text-sm text-muted transition-colors duration-200 hover:border-ink hover:text-ink peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-checked:hover:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
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
                  <span className="block rounded-[2px] border border-line p-3 text-center text-sm text-muted transition-colors duration-200 hover:border-ink hover:text-ink peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-checked:hover:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
                    Нет
                  </span>
                </label>
              </div>
            </div>
            <label className="mt-5 grid cursor-pointer grid-cols-[20px_1fr] items-start gap-3 text-sm leading-[1.55] text-muted">
              <input
                className="mt-px h-5 w-5 accent-accent"
                type="checkbox"
                id="photoConsent"
                name="photo"
                checked={values.photo}
                onChange={handleChange}
                required
              />
              <span>
                Согласен(на) на фото- и видеосъёмку во время восхождения
              </span>
            </label>
          </fieldset>

          <button
            className="mt-6 flex min-h-14 w-full cursor-pointer items-center justify-between rounded-[2px] border border-accent bg-accent px-5 text-left text-[13px] font-bold uppercase tracking-[.08em] text-white transition-colors duration-200 hover:border-ink hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:border-accent disabled:hover:bg-accent"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Отправка...' : 'Отправить заявку'}{' '}
            {isLoading ? (
              <span
                className="h-[18px] w-[18px] animate-spin rounded-full border-2 border-white/40 border-t-white motion-reduce:animate-none"
                aria-hidden="true"
              />
            ) : (
              <span className="text-xl font-normal" aria-hidden="true">
                ↗
              </span>
            )}
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
