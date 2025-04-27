import { Contraction, EndContractionParams } from "./Contraction";

interface ContractionImplParams {
    startTime: Date;
    endTime?: Date | null;
    duration?: number | null;
    frequency?: number | null;
}

export class ContractionImpl implements Contraction {
    startTime: Date;
    endTime: Date | null;
    duration: number | null;
    frequency: number | null;

    constructor(params: ContractionImplParams) {
        this.startTime = params.startTime;
        this.endTime = params.endTime || null;
        this.duration = params.duration || null;
        this.frequency = params.frequency || null;
    }

    endContraction({ endTime, lastContraction }: EndContractionParams): void {
        this.endTime = endTime;

        this.duration = endTime.getTime() - this.startTime.getTime();

        if (lastContraction?.endTime) {
            this.frequency =
                this.startTime.getTime() - lastContraction.startTime.getTime();
        }
    }
}
