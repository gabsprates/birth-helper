export class Store {
    static key = "data";

    static getData<TData>() {
        const data = localStorage.getItem(Store.key);

        return JSON.parse(data || "[]") as TData[];
    }

    static saveData(data: unknown) {
        localStorage.setItem(Store.key, JSON.stringify(data));
    }

    static clearData() {
        localStorage.removeItem(Store.key);
    }
}
