import { Accessor, For } from "solid-js";
import { Contraction } from "../../entities/Contraction";

interface HistoryTableProps {
    contractions: Accessor<Contraction[]>;
}

const EMPTY_CELL = "-";
const SEC_IN_MS = 1000;
const MIN_IN_SEC = SEC_IN_MS * 60;
const HOUR_IN_MS = MIN_IN_SEC * 60;

const showFormattedTimeInterval = (milliseconds: number) => {
    const hours = Math.floor(milliseconds / HOUR_IN_MS);
    const minutes = Math.floor((milliseconds % HOUR_IN_MS) / MIN_IN_SEC);
    const seconds = Math.floor((milliseconds % MIN_IN_SEC) / SEC_IN_MS);

    return `${hours}h ${minutes}m ${seconds}s`;
};

const showFormatterDateTime = (date: Date) => {
    return date.toLocaleString(navigator.language, {
        dateStyle: "short",
        timeStyle: "short",
        hour12: false,
    });
};

export const HistoryTable = ({ contractions }: HistoryTableProps) => {
    return (
        <table
            style={{
                border: "1px solid",
                "border-collapse": "collapse",
                width: "100%",
            }}
        >
            <thead>
                <tr>
                    <th>start time</th>
                    <th>end time</th>
                    <th>duration</th>
                    <th>frequency</th>
                </tr>
            </thead>
            <tbody>
                <For each={contractions()}>
                    {(contraction) => {
                        const startTime = showFormatterDateTime(
                            contraction.startTime
                        );

                        const endTime = contraction.endTime
                            ? showFormatterDateTime(contraction.endTime)
                            : EMPTY_CELL;

                        const duration = contraction.duration
                            ? showFormattedTimeInterval(contraction.duration)
                            : EMPTY_CELL;

                        const frequency = contraction.frequency
                            ? showFormattedTimeInterval(contraction.frequency)
                            : EMPTY_CELL;

                        return (
                            <tr>
                                <td>{startTime}</td>
                                <td>{endTime}</td>
                                <td>{duration}</td>
                                <td>{frequency}</td>
                            </tr>
                        );
                    }}
                </For>
            </tbody>
        </table>
    );
};
