import { useEffect, useState, useRef } from "react";
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
    const [backspaceCount, setBackspaceCount] = useState<number>(10);

    const navigate = useNavigate();

    const writingSpaceRef = useRef<any>();

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
        setTimerValue(time);
        setIsTyping(false);
        setTypedText("");
        setTimerStarted(false);
        setBackspaceCount(10);
    };

    const handleRestart = () => {
        setTimer(timerValue);
        setIsTyping(false);
        setTypedText("");
        setTimerStarted(false);
        setBackspaceCount(10);
        writingSpaceRef.current.value = "";
        writingSpaceRef.current.focus();
    }

    const handleCopyPaste = (event: any) => {
        event?.preventDefault();
    };

    const handleBackspace = (event: any) => {
        if(event.key === "Backspace" || event.key === "Delete") {
            if(backspaceCount === 0) {
                event?.preventDefault();
            }
            else {
                setBackspaceCount(backspaceCount - 1);
            }
        }
    }

    return(
        <div className="home-container">
            <Navbar />
            <div className="home-toolbox">
                <button disabled={isTyping} onClick={() => handleTimerReset(30)} >30 sec</button>
                <button disabled={isTyping} onClick={() => handleTimerReset(60)} >60 sec</button>
                <button onClick={() => handleRestart()} >Restart</button>
            </div>
            <div>
                {isTyping ? (
                    <>
                        <p className="timer">Time Left: { timer } sec</p>
                        <p className="rules">Backspace/Delete key hits left: { backspaceCount }</p>
                    </>
                ):(
                    <>
                        <p className="timer">Total Time: { timer } sec</p>
                        <p className="rules">Note: You are allowed to hit backspace/delete key { backspaceCount } times</p>
                    </>
                )}
                <label className="writing-space-label">{ text }</label>
                <textarea
                    placeholder="start typing..."
                    autoFocus
                    className="writing-space-area"
                    onChange={handleChange}
                    onPaste={handleCopyPaste}
                    onCopy={handleCopyPaste}
                    onKeyDown={handleBackspace}
                    ref={writingSpaceRef}
                >
                </textarea>
            </div>
        </div>
    )
}