import * as React from "https://cdn.skypack.dev/react@17.0.1";
import * as ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";

const defaultSessionMins = 25;
const defaultSessionSecs = "00";
const defaultBreakMins = 5;
const defaultBreakSecs = "00";
const sessionLabel = "SESSION";
const breakLabel = "BREAK";

class Pomodoro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionLengthMinutes: defaultSessionMins,
      sessionLengthSeconds: defaultSessionSecs,
      sessionTimerMins: defaultSessionMins,
      breakLengthMinutes: defaultBreakMins,
      breakLengthSeconds: defaultBreakSecs,
      breakTimerMins: "0" + defaultBreakMins,
      active: false,
      counter: 0,
      reset: false,
      label: sessionLabel,
    };
    this.sessionDecrement = this.sessionDecrement.bind(this);
    this.sessionIncrement = this.sessionIncrement.bind(this);
    this.breakDecrement = this.breakDecrement.bind(this);
    this.breakIncrement = this.breakIncrement.bind(this);
    this.startStop = this.startStop.bind(this);
    this.timeFormat = this.timeFormat.bind(this);
    this.reset = this.reset.bind(this);
  }

  sessionDecrement() {
    if (this.state.sessionLengthMinutes > 1 && this.state.active === false) {
      this.setState((state) => ({
        sessionLengthMinutes: state.sessionLengthMinutes - 1,
        sessionTimerMins: this.timeFormat(state.sessionLengthMinutes - 1),
        sessionLengthSeconds: "00",
      }));
    }
  }

  sessionIncrement() {
    if (this.state.sessionLengthMinutes < 60 && this.state.active === false) {
      this.setState((state) => ({
        sessionLengthMinutes: state.sessionLengthMinutes + 1,
        sessionTimerMins:
          state.sessionLengthMinutes < 9
            ? "0" + (parseInt(this.state.sessionTimerMins) + 1)
            : state.sessionLengthMinutes + 1,
        sessionLengthSeconds: "00",
      }));
    }
  }

  breakDecrement() {
    if (this.state.breakLengthMinutes > 1 && this.state.active === false) {
      this.setState((state) => ({
        breakLengthMinutes: state.breakLengthMinutes - 1,
        breakTimerMins: this.timeFormat(state.breakLengthMinutes - 1),
        breakLengthSeconds: "00",
      }));
    }
  }

  breakIncrement() {
    if (this.state.breakLengthMinutes < 60 && this.state.active === false) {
      this.setState((state) => ({
        breakLengthMinutes: state.breakLengthMinutes + 1,
        breakTimerMins:
          state.breakLengthMinutes < 9
            ? "0" + (parseInt(this.state.breakTimerMins) + 1)
            : state.breakLengthMinutes + 1,
        breakLengthSeconds: "00",
      }));
    }
  }

  startStop() {
    let sessionCount;
    let sessionCount2;
    let breakCount;
    let breakCount2;

    this.setState((state) => ({
      active: !state.active,
      reset: false,
    }));

    if (this.state.counter === 0) {
      sessionStart(this);
    } else {
      breakStart(this);
    }

    function convertMsToMinutes(myMs) {
      return Math.floor(myMs / 1000 / 60);
    }

    function convertMsToSeconds(myMs) {
      return (myMs / 1000) % 60;
    }

    function sessionStart(myState) {
      console.log("Session started");
      let sessionLengthInMs =
        myState.state.sessionTimerMins * 60000 +
        myState.state.sessionLengthSeconds * 1000;

      sessionCount = setInterval(function () {
        if (sessionLengthInMs > 0 && myState.state.active === true) {
          sessionLengthInMs -= 1000;

          let sessionMins = convertMsToMinutes(sessionLengthInMs);
          let sessionSecs = convertMsToSeconds(sessionLengthInMs);

          myState.setState({
            sessionTimerMins:
              myState.state.reset === true
                ? defaultSessionMins
                : myState.timeFormat(sessionMins),
            sessionLengthSeconds:
              myState.state.reset === true
                ? "00"
                : myState.timeFormat(sessionSecs),
          });
        }
      }, 1000);

      sessionCount2 = setInterval(function () {
        if (sessionLengthInMs > 0 && myState.state.active === true) {
          //sessionLengthInMs -= 1000;
        } else if (sessionLengthInMs > 0 && myState.state.active === false) {
          clearInterval(sessionCount);
          clearInterval(sessionCount2);
        } else {
          clearInterval(sessionCount);
          clearInterval(sessionCount2);
          myState.playSound();
          myState.setState({
            breakTimerMins: myState.timeFormat(
              myState.state.breakLengthMinutes
            ),
            breakLengthSeconds: defaultBreakSecs,
            counter: 1,
            label: breakLabel,
          });
          breakStart(myState);
        }
      }, 1000);
    }

    function breakStart(myState) {
      console.log("Break started");
      let breakLengthInMs =
        myState.state.breakTimerMins * 60000 +
        myState.state.breakLengthSeconds * 1000;

      breakCount = setInterval(function () {
        if (breakLengthInMs > 0 && myState.state.active === true) {
          breakLengthInMs -= 1000;

          let breakMins = convertMsToMinutes(breakLengthInMs);
          let breakSecs = convertMsToSeconds(breakLengthInMs);

          myState.setState({
            breakTimerMins:
              myState.state.reset === true
                ? defaultBreakMins
                : myState.timeFormat(breakMins),
            breakLengthSeconds:
              myState.state.reset === true
                ? defaultBreakSecs
                : myState.timeFormat(breakSecs),
          });
        }
      }, 1000);

      breakCount2 = setInterval(function () {
        if (breakLengthInMs > 0 && myState.state.active === true) {
          //breakLengthInMs -= 1000;
        } else if (breakLengthInMs > 0 && myState.state.active === false) {
          clearInterval(breakCount);
          clearInterval(breakCount2);
        } else {
          clearInterval(breakCount);
          clearInterval(breakCount2);
          myState.playSound();
          myState.setState({
            sessionTimerMins: myState.timeFormat(
              myState.state.sessionLengthMinutes
            ),
            sessionLengthSeconds: defaultSessionSecs,
            counter: 0,
            label: sessionLabel,
          });
          sessionStart(myState);
        }
      }, 1000);
    }
  }

  timeFormat(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  playSound() {
    const sound = document.getElementById("beep");
    sound.play();
  }

  stopSound() {
    const sound = document.getElementById("beep");
    sound.pause();
    sound.currentTime = 0;
  }

  reset() {
    console.log("Reset actioned");
    this.setState({
      reset: true,
    });

    this.stopSound();

    if (this.state.active === true) {
      this.setState({
        active: false,
        sessionLengthMinutes: defaultSessionMins,
        sessionLengthSeconds: defaultSessionSecs,
        sessionTimerMins: defaultSessionMins,
        breakLengthMinutes: defaultBreakMins,
        breakLengthSeconds: defaultBreakSecs,
        breakTimerMins: "0" + defaultBreakMins,
        counter: 0,
        label: sessionLabel,
      });
    } else {
      this.setState({
        sessionLengthMinutes: defaultSessionMins,
        sessionLengthSeconds: defaultSessionSecs,
        sessionTimerMins: defaultSessionMins,
        breakLengthMinutes: defaultBreakMins,
        breakLengthSeconds: defaultBreakSecs,
        breakTimerMins: "0" + defaultBreakMins,
        counter: 0,
        label: sessionLabel,
      });
    }
  }

  render() {
    let timeLeft;
    let startStopIcon = "fas fa-pause";

    if (this.state.counter === 0) {
      timeLeft =
        this.state.sessionTimerMins + ":" + this.state.sessionLengthSeconds;
    } else {
      timeLeft =
        this.state.breakTimerMins + ":" + this.state.breakLengthSeconds;
    }

    if (this.state.active === false) {
      startStopIcon = "fas fa-play";
    }

    return (
      <div id="container">
        <div id="tomato-whole">
          <div className="tomato-leaves">
            <div className="stalk"></div>
            <div className="leaves-1">by ggylee</div>
            <div className="leaves-2">POMODORO TIMER</div>
          </div>
          <div id="tomato-body">
            <div className="row">
              <div id="session-label" className="col-6">
                Session Length
                <div className="length-row">
                  <button
                    id="session-decrement"
                    onClick={this.sessionDecrement}
                  >
                    <i class="fas fa-chevron-down"></i>
                  </button>
                  <div id="session-length" className="sessionLength">
                    {this.state.sessionLengthMinutes}
                  </div>
                  <button
                    id="session-increment"
                    onClick={this.sessionIncrement}
                  >
                    <i class="fas fa-chevron-up"></i>
                  </button>
                </div>
              </div>
              <div id="break-label" className="col-6">
                Break Length
                <div className="length-row">
                  <button id="break-decrement" onClick={this.breakDecrement}>
                    <i class="fas fa-chevron-down"></i>
                  </button>
                  <div id="break-length" className="breakLength">
                    {this.state.breakLengthMinutes}
                  </div>
                  <button id="break-increment" onClick={this.breakIncrement}>
                    <i class="fas fa-chevron-up"></i>
                  </button>
                </div>
              </div>
            </div>
            <div id="timer">
              <div id="time-left">{timeLeft}</div>
              <audio
                id="beep"
                src="https://ggylee-portfolio.s3.eu-west-2.amazonaws.com/dixie-horn.mp3"
              ></audio>
              <div id="timer-label">{this.state.label}</div>
              <button id="start_stop" onClick={this.startStop}>
                <i className={startStopIcon}></i>
              </button>
              <button id="reset" onClick={this.reset}>
                <i class="fas fa-redo-alt"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Pomodoro />, document.getElementById("root"));
