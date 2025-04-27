//www.101computing.net/stopwatch-class-javascript/

export class Stopwatch {
    state: string;
    delay: number;
    value: number;
    interval: number | null;
    display: HTMLElement | null;
    id: string;

    constructor(id: string, delay = 100) {
        this.state = "paused";
        this.delay = delay;
        this.id = id;
        this.display = document.getElementById(id);
        this.value = 0;
        this.interval = 0;
    }

    formatTime(ms: number) {
        let hours = Math.floor(ms / 3600000);
        let minutes = Math.floor((ms - hours * 3600000) / 60000);
        let seconds = Math.floor(
            (ms - hours * 3600000 - minutes * 60000) / 1000
        );
        let ds = Math.floor(
            (ms - hours * 3600000 - minutes * 60000 - seconds * 1000) / 100
        );

        return `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${ds}`;
    }

    update() {
        if (this.state == "running") {
            this.value += this.delay;
        }

        if (this.display) {
            this.display.innerHTML = this.formatTime(this.value);
        }
    }

    start() {
        if (!this.display) {
            this.display = document.getElementById(this.id);
        }

        if (this.state == "paused") {
            this.state = "running";
            if (!this.interval) {
                let t = this;
                this.interval = setInterval(function () {
                    t.update();
                }, this.delay);
            }
        }
    }

    stop() {
        if (this.state == "running") {
            this.state = "paused";
            if (this.interval) {
                clearInterval(this.interval);
                this.interval = null;
            }
        }
    }

    reset() {
        this.stop();
        this.value = 0;
        this.update();
    }
}
