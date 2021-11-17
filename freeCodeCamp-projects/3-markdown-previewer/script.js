import * as React from "https://cdn.skypack.dev/react@17.0.1";
import * as ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";
import marked from "https://cdn.skypack.dev/marked@3.0.2";

const defaultText = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### Other cool stuff:

Here's some code, \`<div></div>\`, between 2 backticks.

\`\`\`

// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org/ggylee), and
> Block Quotes!

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists, too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://camo.githubusercontent.com/d069971a0af4d9e393066dc77ced000cff23a1f6bbfbb9e7704a870192a926ca/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f66726565636f646563616d702f776964652d736f6369616c2d62616e6e65722e706e67)
`;

const renderer = {
  link(href, title, text) {
    return `<a target="_blank" href="${href}">${text}` + "</a>";
  },
};

marked.use({ renderer });

class MyPreviewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: defaultText,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      input: event.target.value,
    });
  }

  render() {
    const markdownText = marked(this.state.input, { breaks: true });

    return (
      <div className="container-fluid row m-0 bg-1 d-flex justify-content-around align-items-center">
        <div className="card card-bg card-shadow px-3 pb-3 col-lg-5 col-md-5">
          <h4 className="card-header card-bg">
            <b>Editor</b>
          </h4>
          <textarea
            id="editor"
            className="card-body overflow-auto"
            value={this.state.input}
            onChange={this.handleChange}
          >
            Default text
          </textarea>
        </div>
        <div className="card card-bg card-shadow px-3 pb-3 my-3 col-lg-5 col-md-5">
          <h4 className="card-header card-bg">
            <b>Previewer</b>
          </h4>
          <div
            id="preview"
            className="card-body overflow-auto bg-white border border-dark"
            dangerouslySetInnerHTML={{ __html: markdownText }}
          ></div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<MyPreviewer />, document.getElementById("root"));
