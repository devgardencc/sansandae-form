export interface FormValues {
    mountain: string;
    address: string;
    time: string;
    spot: string;
    name: string;
    phone: string;
    telegram: string;
    club: '' | 'yes' | 'no';
    photo: boolean;
}

export interface RegisterHikeRequest {
    name: string;
    phone: string;
    tg: string;
    club: boolean;
    photo: boolean;
    mountain: string;
    date: string;
}

export interface RegisterHikeResponse {
    name: string;
    created_at?: string;
    [key: string]: unknown;
}
