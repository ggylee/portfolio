import * as React from "https://cdn.skypack.dev/react@17.0.1";
import * as ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      randomIndexQuote: 0,
      randomIndexColour: 0,
    };
    this.newQuote = this.newQuote.bind(this);
  }

  newQuote() {
    this.setState({
      randomIndexQuote: Math.floor(Math.random() * 45),
      randomIndexColour: Math.floor(Math.random() * 16),
    });
  }

  render() {
    const possibleQuotes = [
      ["I’m not superstitious, but I am a little stitious.", "Michael Scott"],
      [
        "Would I rather be feared or loved? Easy. Both. I want people to be afraid of how much they love me.",
        "Michael Scott",
      ],
      [
        "Sometimes I’ll start a sentence and I don’t even know where it’s going. I just hope I find it along the way.",
        "Michael Scott",
      ],
      [
        "The worst thing about prison was the dementors.",
        'Michael "Prison Mike" Scott',
      ],
      [
        "I am running away from my responsibilities. And it feels good.",
        "Michael Scott",
      ],
      [
        "And I knew exactly what to do. But in a much more real sense, I had no idea what to do.",
        "Michael Scott",
      ],
      ["An office is a place where dreams come true.", "Michael Scott"],
      ["I am Beyoncé, always.", "Michael Scott"],
      ["That's what she said.", "Michael Scott"],
      [
        "St. Patrick's Day is the closest thing the Irish have to Christmas.",
        "Michael Scott",
      ],
      [
        "Guess what, I have flaws. What are they? Oh, I don’t know. I sing in the shower. Sometimes I spend too much time volunteering. Occasionally I’ll hit somebody with my car. So sue me.",
        "Michael Scott",
      ],
      [
        "If I had a gun with two bullets and I was in a room with Hitler, Bin Laden and Toby, I would shoot Toby twice.",
        "Michael Scott",
      ],
      [
        "I’m an early bird and I’m a night owl, so I’m wise and have worms.",
        "Michael Scott",
      ],
      [
        "I feel like all my kids grew up, and then they married each other. It's every parent's dream.",
        "Michael Scott",
      ],
      [
        "Whenever I'm about to do something, I think, 'Would an idiot do that?' and if they would, I do not do that thing.",
        "Dwight Schrute",
      ],
      [
        "If I were buying my coffin, I would get one with thicker walls so you couldn’t hear the other dead people.",
        "Dwight Schrute",
      ],
      [
        "You only live once? False. You live every day. You only die once.",
        "Dwight Schrute",
      ],
      ["You couldn't handle my undivided attention.", "Dwight Schrute"],
      [
        "I am fast. To give you a reference point. I’m somewhere between a snake and a mongoose. And a panther.",
        "Dwight Schrute",
      ],
      [
        "I wish I could menstruate. If I could menstruate, I wouldn’t have to deal with idiotic calendars anymore. I’d just be able to count down from my previous cycle. Plus, I’d be more in tune with the moon and the tides.",
        "Dwight Schrute",
      ],
      [
        "Fact: Bears eat beets. Bears. Beets. Battlestar Galactica.",
        "Jim Halpert",
      ],
      [
        "Right now, this is just a job. If I advance any higher in this company, this would be my career. And, uh, if this were my career, I’d have to throw myself in front of a train.",
        "Jim Halpert",
      ],
      [
        "I am about to do something very bold in this job that I’ve never done before: try.",
        "Jim Halpert",
      ],
      [
        "From time to time I send Dwight faxes. From himself. From the future.",
        "Jim Halpert",
      ],
      [
        "I talk a lot, so I’ve learned to just tune myself out.",
        "Kelly Kapoor",
      ],
      [
        '"What are your weaknesses?" "I don\'t have any, a**hole."',
        "Kelly Kapoor",
      ],
      [
        "I am one of the few people who looks hot eating a cupcake.",
        "Kelly Kapoor",
      ],
      ["If I don’t have some cake soon, I might die.", "Stanley Hudson"],
      [
        "The doctor said, if I can't find a new way to relate more positively to my surroundings, I'm going to die. I'm going to die.",
        "Stanley Hudson",
      ],
      ["Did I stutter?", "Stanley Hudson"],
      [
        "It’s like I used to tell my wife. I do not apologize unless I think I’m wrong. And if you don’t like it you can leave. And I say the same thing to my current wife and I’ll say it to my next one, too.",
        "Stanley Hudson",
      ],
      [
        "I just want to lie on the beach and eat hot dogs. That’s all I’ve ever wanted.",
        "Kevin Malone",
      ],
      [
        "Mini cupcakes? As in the mini version of regular cupcakes? Which is already a mini version of cake? Honestly, where does it end with you people?",
        "Kevin Malone",
      ],
      [
        "I work hard all day. I like knowing that there’s going to be a break. Most days I just sit and wait for the break.",
        "Kevin Malone",
      ],
      [
        "Sometimes the clothes at Gap Kids are too flashy, so I’m forced to go to the American Girl store and order clothes for large colonial dolls.",
        "Angela Martin",
      ],
      ["Oh, it is on, like a prawn who yawns at dawn.", "Andy Bernard"],
      ["Sorry I annoyed you with my friendship.", "Andy Bernard"],
      [
        "I know a few things about love. Horrible, terrible, awful, awful things.",
        "Andy Bernard",
      ],
      [
        "Women cannot resist a man singing show tunes. It's so powerful, even a lot of men can't resist a man singing show tunes.",
        "Andy Bernard",
      ],
      [
        "I wish there was a way to know you’re in the good old days, before you’ve actually left them.",
        "Andy Bernard",
      ],
      [
        "For my New Year's resolution, I gave up drinking... during the week.",
        "Meredith Palmer",
      ],
      ["I feel God in this Chili’s tonight.", "Pam Beesly"],
      [
        "There’s a lot of beauty in ordinary things. Isn’t that kind of the point?",
        "Pam Beesly",
      ],
      [
        "I miss the days when there was only one party I didn't want to go to.",
        "Ryan Howard",
      ],
      [
        "A few years ago, my family was on a safari in Africa and my cousin, Mufasa, was um, he was trampled to death by a pack of wildebeests and um, we all took it really hard.",
        "Ryan Howard",
      ],
    ];

    const quote = possibleQuotes[this.state.randomIndexQuote][0];
    const author = possibleQuotes[this.state.randomIndexQuote][1];

    const possibleColours = [
      "#00BFFF",
      "#B22222",
      "#F08080",
      "#FF8C00",
      "#2E8B57",
      "#008000",
      "#008080",
      "#4169E1",
      "#00008B",
      "#6A5ACD",
      "#483D8B",
      "#DA70D6",
      "#800080",
      "#4B0082",
      "#C71585",
      "#FFD700",
    ];

    const colour = possibleColours[this.state.randomIndexColour];

    return (
      <div
        id="wrapper"
        className="container-fluid bg-1 d-flex flex-column align-items-center justify-content-center"
        style={{ backgroundColor: colour }}
      >
        <div
          id="quote-box"
          className="bg-2 d-flex flex-column p-5 rounded col-lg-6 col-md-8 col-sm-10"
        >
          <div id="text">
            <i className="fa fa-quote-left"></i>
            <h3 className="text-center">{quote}</h3>
            <i className="fa fa-quote-right d-flex justify-content-end"></i>
          </div>
          <div id="author">
            <p className="mt-3 d-flex justify-content-end">- {author}</p>
          </div>
          <div className="d-flex align-items-center justify-content-between mt-2">
            <div>
              <a
                id="tweet-quote"
                className="button-tweet"
                href="https://twitter.com/intent/tweet"
                target="_top"
              >
                <i
                  className="fab fa-twitter-square"
                  style={{ color: colour }}
                ></i>
              </a>
            </div>
            <div>
              <button
                id="new-quote"
                className="rounded button-quote border-0 p-2"
                onClick={this.newQuote}
                style={{ backgroundColor: colour }}
              >
                New quote
              </button>
            </div>
          </div>
        </div>
        <div className="footer mt-1">
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
    );
  }
}

ReactDOM.render(<MyComponent />, document.getElementById("root"));
