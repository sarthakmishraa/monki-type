import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { monkitype } from "../assets/monkitype";

export const Result = () => {
    const [accuracy, setAccuracy] = useState<number | undefined>();
    const [wpm, setWpm] = useState<number | undefined>();

    const { state } = useLocation();

    const { typedText, text, timerValue } = state;

    useEffect(() => {
        const getWPM = () => {
            const words = typedText.split(" ");
            const noOfWords = words.length;
            if(timerValue === 30) {
                return noOfWords*2;
            }
            return noOfWords;
        };

        if(typedText && text) {
            setAccuracy(parseFloat(monkitype(text, typedText)));
            setWpm(getWPM().toFixed(2));
        };
    }, []);

    return(
        <div className="result-container">
            <Navbar />
            <div className="result-content">
                <h2>Here are your scores</h2>
                <p>Accuracy: {accuracy}</p>
                <p>Words per minutes: {wpm}</p>
            </div>
        </div>
    )
}