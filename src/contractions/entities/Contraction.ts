export interface Contraction {
    startTime: Date;
    endTime: null | Date;
    duration: null | number;
    frequency: null | number;

    endContraction(params: EndContractionParams): void;
}

export interface EndContractionParams {
    endTime: Date;
    lastContraction: null | Contraction;
}
