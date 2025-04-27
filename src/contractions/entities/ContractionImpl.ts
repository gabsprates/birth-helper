import { Contraction, EndContractionParams } from "./Contraction";

export class ContractionImpl implements Contraction {
    startTime: Date;
    endTime: Date | null = null;
    duration: number | null = null;
    frequency: number | null = null;

    constructor(startTime: Date) {
        this.startTime = startTime;
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
