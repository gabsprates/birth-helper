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

        contraction.endContraction({ endTime });

        expect(contraction.endTime).toBe(endTime);
    });

    it("should have a duration after contraction ends", () => {
        const startTime = new Date(2025, 0, 0, 0, 0, 0, 0);
        const endTime = new Date(2025, 0, 0, 0, 10, 0, 0);
        const contraction = new ContractionImpl(startTime);

        contraction.endContraction({ endTime });

        expect(contraction.duration).toEqual(600000);
    });
});
