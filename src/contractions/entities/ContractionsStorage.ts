import { Contraction } from "./Contraction";

export interface ContractionsStorage {
    getContractions: () => Promise<Contraction[]>;

    saveContractions: (contractions: Contraction[]) => Promise<void>;

    clearContractions: () => Promise<void>;
}
