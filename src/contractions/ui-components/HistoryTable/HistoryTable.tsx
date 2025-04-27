import { Accessor, For } from "solid-js";
import { Contraction } from "../../entities/Contraction";

interface HistoryTableProps {
    contractions: Accessor<Contraction[]>;
}

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
                    {(contraction, index) => {
                        return (
                            <tr>
                                <td>{contraction.startTime.toJSON()}</td>
                                <td>{contraction.endTime?.toJSON()}</td>
                                <td>{contraction.duration || "-"}</td>
                                <td>{index()}</td>
                            </tr>
                        );
                    }}
                </For>
            </tbody>
        </table>
    );
};
