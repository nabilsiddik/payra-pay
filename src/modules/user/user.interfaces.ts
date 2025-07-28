export enum IsActive {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    BLOCKED = 'BLOCKED',
}

export enum Role {
    USER = 'USER',
    AGENT = 'AGENT',
    ADMIN = 'ADMIN'
}

export enum Provider {
    GOOGLE = 'google',
    CREDENTIALS = 'credentials'
}

export interface IAuthProvider{
    provider: Provider,
    providerId: string
}

export interface IUser{
    name: string;
    email: string;
    phone: string,
    password?: string;
    picture?: string;
    address?: string;
    isDeleted?: boolean;
    isVerified?: boolean;
    isActive?: IsActive;
    role?: Role;
    authProvider: IAuthProvider[];
    createdAt: Date;
    updatedAt: Date;
}