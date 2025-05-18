import { createSignal, onMount, Show } from "solid-js";
import "./App.css";
import { Contraction } from "./contractions/entities/Contraction";
import { HistoryTable } from "./contractions/ui-components/HistoryTable/HistoryTable";
import { ContractionImpl } from "./contractions/entities/ContractionImpl";
import { Stopwatch } from "./contractions/entities/Stopwatch";
import { AppStorage } from "./store/AppStorage";
import { ContractionsStorageImpl } from "./contractions/entities/ContractionsStorageImpl";

interface AppProps {
    appStorage: AppStorage;
}

function App({ appStorage }: AppProps) {
    const stopwatch = new Stopwatch("stopwatch");
    const contractionsStorage = new ContractionsStorageImpl(appStorage);

    const [contractions, setContractions] = createSignal<Contraction[]>([]);
    const [currentContraction, setCurrentContraction] =
        createSignal<Contraction | null>(null);

    onMount(async () => {
        const data = await contractionsStorage.getContractions();
        setContractions(data);
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

        contractionsStorage
            .saveContractions(newContractions)
            .catch(console.error);
    };

    const handleClearHistory = () => {
        const wantClear = window.confirm("really want to delete data?");

        if (!wantClear) return;

        setContractions([]);
        setCurrentContraction(null);

        contractionsStorage.clearContractions().catch(console.error);
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
