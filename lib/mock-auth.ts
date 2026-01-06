export type Role = 'admin' | 'doctor' | 'nurse' | 'staff' | 'resident';

export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    avatar?: string;
    department?: string; // Optional for generic user, but handy if shared
}
