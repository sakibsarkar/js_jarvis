/* eslint-disable @typescript-eslint/no-explicit-any */
import { scriptRunner } from "@/transcriptCommand";
import response from "@/utils/responseVoice";
import { useState } from "react";

export default function Home() {
  const [recognition, setRecognition] = useState<any | null>(null);
  const [, setIsListening] = useState(false);
  const [isStopped, setIstopped] = useState(true);
  // useEffect(() => {
  //   recognition &&
  //     recognition.addEventListener("end", () => {
  //       recognition.start();
  //     });
  //   const startRecognition = () => {
  //     recognition ? recognition.stop() : "";
  //   };

  //   const intervalId = setInterval(() => startRecognition(), 5000);

  //   // Cleanup function
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [recognition]);
  const start = () => {
    // Initialize the SpeechRecognition instance once when the component mounts
    if (!("webkitSpeechRecognition" in window)) {
      alert(
        "Your browser does not support the Web Speech API. Please use Google Chrome."
      );
      return;
    }

    let recognitionInstance: any = null;

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    recognitionInstance = new SpeechRecognition();
    recognitionInstance.interimResults = true;
    recognitionInstance.continuous = true;
    recognitionInstance.start();

    recognitionInstance.addEventListener("start", () => {
      setIsListening(true);
    });

    recognitionInstance.addEventListener("end", () => {
      setIsListening(false);
    });

    recognitionInstance.addEventListener("result", (e: any) => {
      const resultArr = Array.from(e.results);

      const transcript = resultArr
        .map((result: any) => result[0])
        .map((result: any) => {
          return result.transcript;
        })
        .join("");

      const lastIndex = resultArr.length - 1;
      const lasResult: any = resultArr[lastIndex];
      const lowercase = transcript.toLowerCase();
      const isHey = lowercase.includes("hey jarvis");

      if (!lasResult.isFinal) {
        return;
      }

      if (lowercase.includes("jarvis stop")) {
        setIstopped(true);
        alert("stop");
        return response(
          "Jarvish is stopped now, if you need me just call my name",
          () => ""
        );
      }

      if (isHey || !isStopped) {
        setIstopped(false);
        const textField = document.getElementById(
          "note_input"
        ) as HTMLInputElement;
        textField.value = transcript;

        scriptRunner(transcript);
      }
    });

    recognition ? "" : setRecognition(recognitionInstance);
  };

  const stop = () => {
    if (recognition) {
      recognition.stop();
    }
  };

  return (
    <div className="w-ful bg-[#000000]">
      <div id="leftmenu">
        <div id="date_time">
          <div id="date" className="semi_arc e4">
            <div className="semi_arc_2 e4_1">
              <div className="counterspin4"></div>
            </div>
            <div
              style={{ fontSize: "40px", marginTop: "25px" }}
              className="text-[cyan]"
            >
              04
            </div>
            <div style={{ fontSize: "25px" }} className="text-[cyan]">
              January
            </div>
          </div>

          <div id="time" className="arc e1">
            <div
              style={{
                fontSize: "23px",
                marginLeft: "-10px",
                color: "cyan",
              }}
            >
              23:41
            </div>
            <div
              style={{
                fontSize: "15px",
                marginLeft: "40px",
                marginTop: "-30px",
                display: "inline",
                color: "cyan",
              }}
            >
              31
            </div>
            <div style={{ fontSize: "17px", marginTop: "10px", color: "cyan" }}>
              Tuesday
            </div>
          </div>
        </div>
        <p className="title">Performance</p>
        <div className="hline title_underline"></div>
        <span
          className="menuitem entypo-gauge"
          style={{ fontSize: "30px", marginLeft: "10px" }}
        >
          <p id="cpu" className="caption" style={{ fontSize: "20px" }}>
            CPU Usage: 19%
          </p>
        </span>{" "}
        <br />
        <span
          className="menuitem entypo-chart-area"
          style={{ fontSize: "30px", marginLeft: "10px" }}
        >
          <p id="ram" className="caption" style={{ fontSize: "20px" }}>
            Physical Memory: 28%
          </p>
        </span>{" "}
        <br />
        <span
          className="menuitem entypo-chart-pie"
          style={{ fontSize: "30px", marginLeft: "10px" }}
        >
          <p id="proc" className="caption" style={{ fontSize: "20px" }}>
            Processes: 73
          </p>
        </span>
        <p className="title">Shortcuts</p>
        <div className="hline title_underline"></div>
        <div className="menu">
          <button className="menuitem">
            {" "}
            <span className="entypo-right-open" />{" "}
            <p className="caption">User</p>{" "}
          </button>
          <button className="menuitem">
            {" "}
            <span className="entypo-right-open" />{" "}
            <p className="caption">Documents</p>{" "}
          </button>
          <button className="menuitem">
            {" "}
            <span className="entypo-right-open" />{" "}
            <p className="caption">Computer</p>{" "}
          </button>
          <button className="menuitem">
            {" "}
            <span className="entypo-right-open" />{" "}
            <p className="caption">Control Panel</p>{" "}
          </button>

          <hr style={{ borderColor: "transparent", margin: 0 }} />
          <div
            className="hline"
            style={{ marginTop: "5px", marginBottom: "5px" }}
          ></div>

          <button className="menuitem">
            {" "}
            <span className="entypo-right-open" />{" "}
            <p className="caption">Custom Path 1</p>{" "}
          </button>
          <button className="menuitem">
            {" "}
            <span className="entypo-right-open" />{" "}
            <p className="caption">Custom Path 2</p>{" "}
          </button>
          <button className="menuitem">
            {" "}
            <span className="entypo-right-open" />{" "}
            <p className="caption">Custom Path 3</p>{" "}
          </button>
        </div>
        <p className="title">Social</p>
        <div className="hline title_underline"></div>
        <div className="app_icon entypo-facebook-squared"></div>
        <div className="app_icon entypo-twitter"></div>
        <div className="app_icon entypo-gplus"></div>
        <div className="app_icon entypo-skype"></div>
        <div className="app_icon entypo-tumblr"></div>
        <div className="app_icon entypo-pinterest"></div>
        <div className="app_icon entypo-soundcloud"></div>
        <div className="app_icon entypo-stumbleupon"></div>
      </div>

      <div id="rightmenu" className="fixed top-0 right-0">
        <p
          className="title text-cyan-400"
          style={{ textAlign: "left", marginLeft: "10px" }}
        >
          Notes
        </p>
        <div id="particle10" className="hline"></div>
        <div id="particle11" className="hline"></div>
        <div id="particle12" className="vline"></div>
        <textarea id="note_input" className="min-h-[150px]">
          For the maximum viewing experience, please view this pen in full
          screen where the code is displayed to the side of the display. To
          Complete: - Right Menu (this side of the screen) - Make this note
          restricted to 11 rows - Fill in empty space below - Weather widget
          next to date/time - Place quick access taskbar down bottom - Fill in
          space at the top
        </textarea>
      </div>

      <div id="arc_container" className="h-full">
        <div className="arc_reactor">
          <div className="case_container">
            <div className="e7">
              <div className="semi_arc_3 e5_1">
                <div className="semi_arc_3 e5_2">
                  <div className="semi_arc_3 e5_3">
                    <button
                      className="semi_arc_3 e5_4 !z-[20] flex items-center justify-center cursor-pointer text-primary text-[25px]"
                      onClick={start}
                      id="start"
                    >
                      Start
                    </button>
                  </div>
                </div>
              </div>
              <div className="core2"></div>
            </div>
            <ul className="marks">
              {Array.from({ length: 60 }).map((_, index) => (
                <li key={index}></li>
              ))}
            </ul>
          </div>
        </div>
        <h2 className="text-cyan-300 text-[29px] font-[700]">
          {!isStopped ? "Listening" : ""}
        </h2>
      </div>

      <canvas id="particle1" width="20" height="500"></canvas>
      <canvas id="particle1_1" width="40" height="510"></canvas>
      <canvas id="particle1_2" width="40" height="510"></canvas>

      <div id="particle1_3">{`> > > >`}</div>
      <div id="particle2">
        ▶<br />▶<br />▶
      </div>
      <div id="particle3" className="vline"></div>
      <div id="particle4" className="vline"></div>
      <div id="particle5" className="vline"></div>
      <div id="particle6" className="vline"></div>
      <div id="particle7" className="vline"></div>
      <div id="particle8" className="vline"></div>
      <div id="particle9" className="vline"></div>
      <button id="stop" className="invisible" onClick={stop}>
        stop
      </button>
    </div>
  );
}
