import { decompressFromEncodedURIComponent } from 'lz-string';
import type { FormValues } from './types';

export type RouteInfo = Pick<
  FormValues,
  'mountain' | 'address' | 'time' | 'spot'
> & {
  addressLink: string;
  spotLink: string;
};

const emptyRouteInfo: RouteInfo = {
  mountain: '',
  address: '',
  addressLink: '',
  time: '',
  spot: '',
  spotLink: '',
};

function isKakaoUrl(value: unknown): value is string {
  if (typeof value !== 'string') return false;

  try {
    const url = new URL(value);
    return (
      url.protocol === 'https:' &&
      (url.hostname === 'kakao.com' || url.hostname.endsWith('.kakao.com'))
    );
  } catch {
    return false;
  }
}

function readText(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

export function readRouteInfoFromUrl(search: string): RouteInfo {
  const encoded = new URLSearchParams(search).get('id');
  if (!encoded) return emptyRouteInfo;

  try {
    const json = decompressFromEncodedURIComponent(encoded);
    if (!json) return emptyRouteInfo;

    const data: unknown = JSON.parse(json);
    if (typeof data !== 'object' || data === null || Array.isArray(data)) {
      return emptyRouteInfo;
    }

    const candidate = data as Record<string, unknown>;
    return {
      mountain: readText(candidate.mountain),
      address: readText(candidate.address),
      time: readText(candidate.time),
      spot: readText(candidate.spot),
      addressLink: isKakaoUrl(candidate.addressLink)
        ? candidate.addressLink
        : '',
      spotLink: isKakaoUrl(candidate.spotLink) ? candidate.spotLink : '',
    };
  } catch {
    return emptyRouteInfo;
  }
}

export function getInitialFormValues(routeInfo: RouteInfo): FormValues {
  return {
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
}
