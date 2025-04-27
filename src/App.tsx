import { createSignal, Show } from "solid-js";
import "./App.css";
import { Contraction } from "./contractions/entities/Contraction";
import { HistoryTable } from "./contractions/ui-components/HistoryTable/HistoryTable";
import { ContractionImpl } from "./contractions/entities/ContractionImpl";
import { Stopwatch } from "./contractions/entities/Stopwatch";

function App() {
    const stopwatch = new Stopwatch("stopwatch");

    const [contractions, setContractions] = createSignal<Contraction[]>([]);
    const [currentContraction, setCurrentContraction] =
        createSignal<Contraction | null>(null);

    const handleStartContraction = () => {
        console.log("start");
        stopwatch.start();
        setCurrentContraction(new ContractionImpl(new Date()));
    };

    const handleStopContraction = () => {
        console.log("stop");
        stopwatch.reset();
        const endTime = new Date();

        const contraction = currentContraction();

        if (!contraction) return;

        contraction.endContraction({
            endTime,
            lastContraction: contractions()[0] || null,
        });

        setContractions([contraction, ...contractions()]);
        setCurrentContraction(null);
    };

    return (
        <>
            <h1>Birth Helper 👶</h1>

            <section class="card">
                <h2>🤰⏲ labor contractions</h2>

                <div>
                    <h3 id="stopwatch">00:00:00.0</h3>

                    <Show
                        when={currentContraction() !== null}
                        fallback={
                            <button onClick={handleStartContraction}>
                                start
                            </button>
                        }
                    >
                        <button onClick={handleStopContraction}>stop</button>
                    </Show>
                </div>

                <HistoryTable contractions={contractions} />
            </section>
        </>
    );
}

export default App;
