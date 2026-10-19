import type { FormValues } from './types';
import type { RouteInfo } from './routeInfo';
import kakaoLogo from './assets/kakao.png';

type Props = {
  values: Pick<FormValues, 'mountain' | 'address' | 'time' | 'spot'>;
  routeInfo: RouteInfo;
};

const rowClass =
  'grid grid-cols-[minmax(125px,.7fr)_1.3fr] gap-4 border-b border-solid border-line py-3 last:border-b-0 max-[560px]:grid-cols-1 max-[560px]:gap-1';
const valueClass = 'm-0 wrap-anywhere text-sm font-semibold text-ink';
const mapLinkClass =
  'mt-2 inline-flex min-h-9 w-fit items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-xs font-semibold text-ink no-underline transition-colors duration-200 hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

function MapLink({ href, label }: { href: string; label: string }) {
  if (!href) return null;

  return (
    <a
      className={mapLinkClass}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
    >
      <img
        className="block h-5 w-[54px] shrink-0 object-contain"
        src={kakaoLogo}
        alt=""
      />
      <span>Открыть карту</span>
    </a>
  );
}

function RouteValue({ value }: { value: string }) {
  return value ? (
    <>{value}</>
  ) : (
    <span className="font-normal text-muted">Уточняется</span>
  );
}

function RouteSummary({ values, routeInfo }: Props) {
  const routeDate = values.time ? new Date(values.time) : null;
  const hasValidDate = routeDate && !Number.isNaN(routeDate.getTime());

  return (
    <fieldset className="m-0 min-w-0 rounded-[2px] border border-line border-l-[3px] border-l-accent bg-panel p-[16px_18px_15px] [&+fieldset]:mt-7">
      <legend className="w-full pb-3 text-[11px] font-bold uppercase tracking-[.15em] text-accent">
        О маршруте
      </legend>
      <dl className="m-0 grid gap-0">
        <div className={rowClass}>
          <dt className="text-[13px] text-muted">Гора</dt>
          <dd className={`${valueClass} text-[15px]`}>
            <RouteValue value={values.mountain} />
          </dd>
        </div>
        <div className={rowClass}>
          <dt className="text-[13px] text-muted">Адрес горы</dt>
          <dd className={`${valueClass} grid grid-cols-1 gap-1`}>
            <RouteValue value={values.address} />
            <MapLink
              href={routeInfo.addressLink}
              label="Открыть адрес организатора в Kakao Map"
            />
          </dd>
        </div>
        <div className={rowClass}>
          <dt className="text-[13px] text-muted">Дата и время сбора</dt>
          <dd className={valueClass}>
            {hasValidDate ? (
              <time dateTime={values.time}>
                {routeDate.toLocaleString('ru-RU', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </time>
            ) : (
              <RouteValue value="" />
            )}
          </dd>
        </div>
        <div className={rowClass}>
          <dt className="text-[13px] text-muted">Точка сбора</dt>
          <dd className={`${valueClass} grid grid-cols-1 gap-1`}>
            <RouteValue value={values.spot} />
            <MapLink
              href={routeInfo.spotLink}
              label="Открыть точку сбора в Kakao Map"
            />
          </dd>
        </div>
      </dl>
    </fieldset>
  );
}

export default RouteSummary;
