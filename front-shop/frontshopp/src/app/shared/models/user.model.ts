export class User {
    name: string;
    username: string;
    password: string;
    phoneNumber: number;
    address: string;
    email: string;
    createdAt: string;
    role: number;
    status: boolean;
    updatedAt: string;
    _id: string;
    confirmPassword: string;

    constructor(details: any) {
        this.name = details.name || '';
        this.username = details.username || '';
        this.password = details.password || '';
        this.phoneNumber = details.phoneNumber || 0;
        this.address = details.address || '';
        this.email = details.email || '';
        this.createdAt = details.createdAt || '';
        this.role = details.role || '';
        this.status = details.status || false;
        this.updatedAt = details.updatedAt || '';
        this._id = details._id || '';
        this.confirmPassword = details.confirmPassword || '';
    }

}