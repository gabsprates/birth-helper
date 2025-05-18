export interface AppStorage {
    getData<TData>(key: string, placeholder: TData): TData;

    saveData(key: string, data: unknown): void;

    clearData(key: string): void;
}
