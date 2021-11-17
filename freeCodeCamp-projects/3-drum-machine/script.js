import * as React from "https://cdn.skypack.dev/react@17.0.1";
import * as ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";

const audioClipsOne = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    name: "Chord-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
    bgColour: "#dc3545",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    name: "Chord-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
    bgColour: "#dc3545",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    name: "Chord-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
    bgColour: "#dc3545",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    name: "Shaker",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
    bgColour: "#ff8c00",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    name: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
    bgColour: "#ff8c00",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    name: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
    bgColour: "#ff8c00",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    name: "Punchy-Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
    bgColour: "#ffc107",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    name: "Side-Stick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
    bgColour: "#ffc107",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    name: "Snare",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
    bgColour: "#ffc107",
  },
];

/* const audioClipsTwo = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    name: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    name: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    name: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    name: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    name: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    name: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    name: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    name: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    name: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
]; */

class Pad extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.playSound = this.playSound.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress(event) {
    if (event.keyCode === this.props.keyCode) {
      this.playSound();
    }
  }

  handleClick(event) {
    this.playSound();
  }

  playSound() {
    const sound = document.getElementById(this.props.keyTrigger);
    sound.currentTime = 0;
    sound.play();
    soundName.innerText = this.props.name;
  }

  render() {
    return (
      <button
        className="drum-pad rounded col-3 m-2"
        id={this.props.name}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyPress}
        style={{ backgroundColor: this.props.bgColour }}
      >
        {this.props.keyTrigger}
        <audio
          className="clip"
          id={this.props.keyTrigger}
          src={this.props.url}
        ></audio>
      </button>
    );
  }
}

class MyDrumMachine extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        id="drum-machine"
        className="container-fluid d-flex align-items-center justify-content-center"
      >
        <div className="bg-brown px-4 pt-4 border border-dark rounded text-center">
          <div id="display" className="bg-dark rounded py-5">
            <div>
              {audioClipsOne.map((item, i) => (
                <Pad
                  keyCode={item.keyCode}
                  keyTrigger={item.keyTrigger}
                  name={item.name}
                  url={item.url}
                  bgColour={item.bgColour}
                />
              ))}
            </div>
            <div
              id="soundName"
              className="sound-name bg-white border border-dark p-1 m-auto mt-4"
            ></div>
          </div>
          <div className="footer m-1">
            by{" "}
            <a
              href="https://www.freecodecamp.org/ggylee"
              target="_blank"
              className="text-reset text-decoration-none"
            >
              ggylee
            </a>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<MyDrumMachine />, document.getElementById("root"));
