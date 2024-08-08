import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { texts } from "../assets/text";

const index = Math.floor(Math.random() * texts.length);

export const Home = () => {
    const [timer, setTimer] = useState<number | undefined>(30);
    const [timerValue, setTimerValue] = useState<number | undefined>(30);
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const [typedText, setTypedText] = useState<string | undefined>();
    const [timerStarted, setTimerStarted] = useState<boolean>(false);

    const navigate = useNavigate();

    const text = texts[index];
    
    const handleChange = (event: any) => {
        if(!isTyping) {
            setIsTyping(true);
        }
        if (!timerStarted) {
            setTimerStarted(true);
        }
        setTypedText(event.target.value);
    };

    useEffect(() => {
        if (timerStarted && timer !== undefined && timer > 0) {
            const interval = setInterval(() => {
                setTimer((prevTimer) => (prevTimer !== undefined ? prevTimer - 1 : prevTimer));
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timerStarted, timer]);

    useEffect(() => {
        if(timer === 0) {
            if(timerValue === 30) {
                navigate("/result", {state: {text, typedText, timerValue: 30}});
            }
            else {
                navigate("/result", {state: {text, typedText, timerValue: 60}});
            }
        }
    }, [timer]);

    const handleTimerReset = (time: number) => {
        setTimer(time);
        setTimerValue(timer);
        setIsTyping(false);
        setTypedText("");
        setTimerStarted(false);
    };

    return(
        <div className="home-container">
            <Navbar />
            <div className="home-toolbox">
                <button disabled={isTyping} onClick={() => handleTimerReset(30)} >30 sec</button>
                <button disabled={isTyping} onClick={() => handleTimerReset(60)} >60 sec</button>
            </div>
            <div>
                <p>Time Left: { timer }</p>
                <label className="writing-space-label">{ text }</label>
                <textarea
                    placeholder="start typing..."
                    autoFocus
                    className="writing-space-area"
                    onChange={handleChange}
                >
                </textarea>
            </div>
        </div>
    )
}