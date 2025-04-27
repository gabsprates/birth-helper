import { createSignal, For, Show } from "solid-js";
import "./App.css";
import { Contraction } from "./domain/Contraction";

function App() {
    const [currentContraction, setCurrentContraction] =
        createSignal<Contraction | null>(null);
    const [contractions, setContractions] = createSignal<Contraction[]>([]);

    const handleStartContraction = () => {
        console.log("start");
        setCurrentContraction({ startTime: new Date() } as Contraction);
    };

    const handleStopContraction = () => {
        console.log("stop");

        console.log(currentContraction());

        setContractions((current) => [
            ...current,
            {
                ...currentContraction(),
                endTime: new Date(),
            } as Contraction,
        ]);

        setCurrentContraction(null);
    };

    return (
        <>
            <h1>Birth Helper 👶</h1>

            <section class="card">
                <h2>🤰⏲ labor contractions</h2>

                <Show
                    when={currentContraction() !== null}
                    fallback={
                        <button onClick={handleStartContraction}>start</button>
                    }
                >
                    <button onClick={handleStopContraction}>stop</button>
                </Show>

                <table
                    style={{
                        border: "1px solid",
                        "border-collapse": "collapse",
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
                                        <td>
                                            {contraction.startTime.toJSON()}
                                        </td>
                                        <td>{contraction.endTime?.toJSON()}</td>
                                        <td>{index()}</td>
                                        <td>{index()}</td>
                                    </tr>
                                );
                            }}
                        </For>
                    </tbody>
                </table>
            </section>
        </>
    );
}

export default App;
