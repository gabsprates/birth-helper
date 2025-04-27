import { render, screen } from "@solidjs/testing-library";
import { HistoryTable } from "./HistoryTable";

describe("HistoryTable", () => {
    it("should render table", () => {
        render(() => <HistoryTable contractions={() => []} />);

        expect(screen.getByRole("table")).toBeInTheDocument();
    });

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
});
