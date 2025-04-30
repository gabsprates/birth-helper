import { createSignal, onMount, Show } from "solid-js";
import "./App.css";
import { Contraction } from "./contractions/entities/Contraction";
import { HistoryTable } from "./contractions/ui-components/HistoryTable/HistoryTable";
import { ContractionImpl } from "./contractions/entities/ContractionImpl";
import { Stopwatch } from "./contractions/entities/Stopwatch";
import { Store } from "./store/Store";

function App() {
    const stopwatch = new Stopwatch("stopwatch");

    const [contractions, setContractions] = createSignal<Contraction[]>([]);
    const [currentContraction, setCurrentContraction] =
        createSignal<Contraction | null>(null);

    onMount(() => {
        type DataType = Pick<
            Contraction,
            "startTime" | "endTime" | "duration" | "frequency"
        >;

        const data = Store.getData<DataType>();

        setContractions(
            data.map(
                (contraction) =>
                    new ContractionImpl({
                        startTime: new Date(contraction.startTime),
                        endTime: contraction.endTime
                            ? new Date(contraction.endTime)
                            : null,
                        duration: contraction.duration,
                        frequency: contraction.frequency,
                    })
            )
        );
    });

    const handleStartContraction = () => {
        stopwatch.start();
        setCurrentContraction(new ContractionImpl({ startTime: new Date() }));
    };

    const handleStopContraction = () => {
        stopwatch.reset();
        const endTime = new Date();

        const contraction = currentContraction();

        if (!contraction) return;

        contraction.endContraction({
            endTime,
            lastContraction: contractions()[0] || null,
        });

        const newContractions = [contraction, ...contractions()];

        setContractions(newContractions);
        setCurrentContraction(null);
        Store.saveData(newContractions);
    };

    const handleClearHistory = () => {
        const wantClear = window.confirm("really want to delete data?");

        if (!wantClear) return;

        Store.clearData();
        setContractions([]);
        setCurrentContraction(null);
    };

    const handleDownload = () => {
        window.print();
    };

    return (
        <>
            <h1 class="hide-print">Birth Helper 👶</h1>

            <section class="card">
                <h2>🤰 Labor Contractions ⏲</h2>

                <div class="hide-print">
                    <h3 id="stopwatch">00:00:00.0</h3>

                    <Show
                        when={currentContraction() !== null}
                        fallback={
                            <div
                                style={{
                                    display: "flex",
                                    "justify-content": "center",
                                    gap: "1rem",
                                }}
                            >
                                <button onClick={handleStartContraction}>
                                    start
                                </button>
                                <button onClick={handleDownload}>
                                    download
                                </button>
                            </div>
                        }
                    >
                        <button onClick={handleStopContraction}>stop</button>
                    </Show>
                </div>

                <HistoryTable contractions={contractions} />

                <Show when={currentContraction() === null}>
                    <div
                        class="hide-print"
                        style={{
                            "margin-top": "20rem",
                        }}
                    >
                        <button onClick={handleClearHistory}>
                            clear history
                        </button>
                    </div>
                </Show>
            </section>
        </>
    );
}

export default App;
