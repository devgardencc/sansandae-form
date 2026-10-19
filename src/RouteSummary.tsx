import type { FormValues } from './types';
import type { RouteInfo } from './routeInfo';
import kakaoLogo from './assets/kakao.png';

type Props = {
    values: Pick<FormValues, 'mountain' | 'address' | 'time' | 'spot'>;
    routeInfo: RouteInfo;
};

const rowClass =
    'grid grid-cols-[minmax(125px,.7fr)_1.3fr] gap-[14px] border-b border-solid border-[#d9d3c8] py-[11px] last:border-b-0 max-[560px]:grid-cols-1 max-[560px]:gap-1';
const valueClass = 'm-0 wrap-anywhere text-[13px] font-semibold';
const mapLinkClass =
    'mt-[7px] flex w-fit items-center gap-[5px] text-[11px] font-semibold text-[#77736b] no-underline transition hover:text-[#d73428] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#d73428]';

function MapLink({ href, label }: { href: string; label: string }) {
    return (
        <a
            className={mapLinkClass}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
        >
            <img
                className="block h-[36px] w-[72px] shrink-0 object-contain"
                src={kakaoLogo}
                alt=""
            />
        </a>
    );
}

function RouteSummary({ values, routeInfo }: Props) {
    return (
        <fieldset className="m-0 min-w-0 border-0 border-l-2 border-solid border-l-[#d73428] bg-[#f4f0e8]/70 p-[16px_18px_13px] [&+fieldset]:mt-[27px]">
            <legend className="w-full pb-[12px] text-[10px] font-bold uppercase tracking-[.15em] text-[#d73428]">
                О маршруте
            </legend>
            <dl className="m-0 grid gap-0">
                <div className={rowClass}>
                    <dt className="text-xs text-[#77736b]">Гора</dt>
                    <dd className={valueClass}>{values.mountain}</dd>
                </div>
                <div className={rowClass}>
                    <dt className="text-xs text-[#77736b]">Адрес горы</dt>
                    <dd className={valueClass}>
                        {values.address}
                        <MapLink
                            href={routeInfo.addressLink}
                            label="Открыть адрес организатора в Kakao Map"
                        />
                    </dd>
                </div>
                <div className={rowClass}>
                    <dt className="text-xs text-[#77736b]">
                        Дата и время сбора
                    </dt>
                    <dd className={valueClass}>
                        {new Date(values.time).toLocaleString('ru-RU', {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                        })}
                    </dd>
                </div>
                <div className={rowClass}>
                    <dt className="text-xs text-[#77736b]">Точка сбора</dt>
                    <dd className={valueClass}>
                        {values.spot}
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
