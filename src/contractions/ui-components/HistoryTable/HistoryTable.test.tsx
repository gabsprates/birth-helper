import { render, screen } from "@solidjs/testing-library";
import { HistoryTable } from "./HistoryTable";

describe("HistoryTable: table", () => {
    it("should render table", () => {
        render(() => <HistoryTable contractions={() => []} />);

        expect(screen.getByRole("table")).toBeInTheDocument();
    });
});

describe("HistoryTable: header", () => {
    it("should render start time as first column", () => {
        render(() => <HistoryTable contractions={() => []} />);

        const [firstColumn] = screen.getAllByRole("columnheader");

        expect(firstColumn).toBeInTheDocument();
        expect(firstColumn).toHaveTextContent("start time");
    });

    it("should render end time as second column", () => {
        render(() => <HistoryTable contractions={() => []} />);

        const [, secondColumn] = screen.getAllByRole("columnheader");

        expect(secondColumn).toBeInTheDocument();
        expect(secondColumn).toHaveTextContent("end time");
    });

    it("should render duration as third column", () => {
        render(() => <HistoryTable contractions={() => []} />);

        const [, , thirdColumn] = screen.getAllByRole("columnheader");

        expect(thirdColumn).toBeInTheDocument();
        expect(thirdColumn).toHaveTextContent("duration");
    });

    it("should render frequency as fourth column", () => {
        render(() => <HistoryTable contractions={() => []} />);

        const [, , , fourthColumn] = screen.getAllByRole("columnheader");

        expect(fourthColumn).toBeInTheDocument();
        expect(fourthColumn).toHaveTextContent("frequency");
    });
});
