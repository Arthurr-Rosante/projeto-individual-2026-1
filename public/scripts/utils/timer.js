const DECREASE_INTERVAL = 1000;
const SHOW_TIMER_LOGS = false;

export function createTimer(fn, interval) {
    if(typeof fn !== "function") {
        console.error("[timer.js] Erro: Paramêtro 'fn' não é uma função!");
        return;
    }

    let currentInterval = interval;
    let timerId = null;

    const start = () => {
        if(timerId !== null) return;

        timerId = setInterval(() => {
            currentInterval -= DECREASE_INTERVAL;
            if(currentInterval <= 0) {
                fn();
                currentInterval = interval;
            }
            
            SHOW_TIMER_LOGS && console.log(`[timerId = ${timerId}] RODOU | intervalo: ${currentInterval}`)
        }, DECREASE_INTERVAL);
    };
    
    const pause = () => {
        SHOW_TIMER_LOGS && console.log(`[timerId = ${timerId}] PAUSOU | intervalo: ${currentInterval}`)

        clearInterval(timerId);
        timerId = null;
    };
    
    const resume = () => {
        SHOW_TIMER_LOGS && console.log(`[timerId = ${timerId}] RETOMOU | intervalo: ${currentInterval}`)
        start();
    };
    
    const reset = () => {
        SHOW_TIMER_LOGS && console.log(`[timerId = ${timerId}] RESETOU | intervalo: ${currentInterval}`)

        pause();
        currentInterval = interval;
        start();
    };

    const getCurrentInterval = () => currentInterval;

    start();
    return {timerId, start, pause, resume, reset, getCurrentInterval};
}
