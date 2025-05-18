import { AppStorage } from "./AppStorage";

export class AppStorageImpl implements AppStorage {
    private storage: Storage;

    constructor(storage: Storage) {
        this.storage = storage;
    }

    getData<TData>(key: string, placeholder: TData) {
        try {
            const data = this.storage.getItem(key);

            if (!data) return placeholder;

            return JSON.parse(data) as TData;
        } catch (error) {
            console.error("Error retrieving data from storage", error);

            return placeholder;
        }
    }

    saveData(key: string, data: unknown) {
        this.storage.setItem(key, JSON.stringify(data));
    }

    clearData(key: string) {
        this.storage.removeItem(key);
    }
}
