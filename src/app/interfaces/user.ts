export interface User {
    id: number;
    full_name: string;
    email: string;
    photo: string;
    rol_id: number;
    last_device: null | string;
    state: number;
}
