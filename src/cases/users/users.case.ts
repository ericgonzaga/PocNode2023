import { User } from '../../models';

export class UserCase {

    public list (filter: string, page: number, limit: number) {
        return 'pessoa list';
    }

    public getById (id: string) {
        return 'pessoa getById';
    }

    public create (user: Omit<User, 'id'>) {
        return 'pessoa create';
    }

    public update (id: string, user: Omit<User, 'id'>) {
        return 'pessoa update';
    }

    public deleteById (id: string) {
        return 'pessoa deleteById';
    }
}
