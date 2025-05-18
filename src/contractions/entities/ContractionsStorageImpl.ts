import { AppStorage } from "../../store/AppStorage";
import { Contraction } from "./Contraction";
import { ContractionImpl } from "./ContractionImpl";
import { ContractionsStorage } from "./ContractionsStorage";

export class ContractionsStorageImpl implements ContractionsStorage {
    private key = "data";
    private appStorage: AppStorage;

    constructor(appStorage: AppStorage) {
        this.appStorage = appStorage;
    }

    async getContractions() {
        type DataType = {
            startTime: string;
            endTime: string;
            duration: number;
            frequency?: null | number;
        };

        const data = this.appStorage.getData<DataType[]>(this.key, []);

        return data.map((rawData) => {
            const contraction = new ContractionImpl({
                startTime: new Date(rawData.startTime),
            });

            contraction.endTime = new Date(rawData.endTime);
            contraction.duration = rawData.duration;
            contraction.frequency = rawData.frequency ?? null;

            return contraction;
        });
    }

    async saveContractions(contractions: Contraction[]) {
        this.appStorage.saveData(this.key, contractions);
    }

    async clearContractions() {
        this.appStorage.clearData(this.key);
    }
}
