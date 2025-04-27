import { ContractionImpl } from "./ContractionImpl";

describe("Entity: ContractionImpl", () => {
    it("should create a new contraction with start time as given date", () => {
        const startTime = new Date();
        const contraction = new ContractionImpl(startTime);

        expect(contraction.startTime).toBe(startTime);
    });

    it("should end contraction with endtime as given date", () => {
        const startTime = new Date();
        const endTime = new Date();
        const contraction = new ContractionImpl(startTime);

        contraction.endContraction({ endTime, lastContraction: null });

        expect(contraction.endTime).toBe(endTime);
    });

    it("should have a duration after contraction ends", () => {
        const startTime = new Date(2025, 0, 0, 0, 0, 0, 0);
        const endTime = new Date(2025, 0, 0, 0, 10, 0, 0);
        const contraction = new ContractionImpl(startTime);

        contraction.endContraction({ endTime, lastContraction: null });

        expect(contraction.duration).toEqual(
            contraction.endTime!.getTime() - contraction.startTime.getTime()
        );
    });

    it("should have a frequency after contraction ends and a last contraction was given", () => {
        const lastContractionStartTime = new Date(2025, 0, 0, 0, 0, 0, 0);
        const lastContractionEndTime = new Date(2025, 0, 0, 0, 10, 0, 0);
        const lastContraction = new ContractionImpl(lastContractionStartTime);
        lastContraction.endContraction({
            endTime: lastContractionEndTime,
            lastContraction: null,
        });

        const startTime = new Date(2025, 0, 0, 0, 30, 0, 0);
        const endTime = new Date(2025, 0, 0, 0, 40, 0, 0);
        const contraction = new ContractionImpl(startTime);

        contraction.endContraction({ endTime, lastContraction });

        expect(contraction.frequency).toEqual(
            contraction.startTime.getTime() -
                lastContraction.startTime.getTime()
        );
    });
});
