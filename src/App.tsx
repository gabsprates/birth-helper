import { createSignal, Show } from "solid-js";
import "./App.css";
import { Contraction } from "./contractions/entities/Contraction";
import { HistoryTable } from "./contractions/ui-components/HistoryTable/HistoryTable";
import { ContractionImpl } from "./contractions/entities/ContractionImpl";

function App() {
    const [contractions, setContractions] = createSignal<Contraction[]>([]);
    const [currentContraction, setCurrentContraction] =
        createSignal<Contraction | null>(null);

    const handleStartContraction = () => {
        console.log("start");
        setCurrentContraction(new ContractionImpl(new Date()));
    };

    const handleStopContraction = () => {
        console.log("stop");
        const contraction = currentContraction();

        if (!contraction) return;

        contraction.endContraction({ endTime: new Date() });

        setContractions([contraction, ...contractions()]);
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

                <HistoryTable contractions={contractions} />
            </section>
        </>
    );
}

export default App;
