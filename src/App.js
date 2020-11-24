import React from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { quote: "", author: "" };
  }
  componentDidMount() {
    this.getRandomQuote();
  }

  getRandomQuote() {
    let url = "https://type.fit/api/quotes"; //thanks to https://github.com/ssokurenko
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let randomQuote = data[Math.floor(Math.random() * data.length)];
        this.setState({
          quote: randomQuote["text"],
          author: randomQuote["author"],
        });
      });
  }

  handleClick() {
    this.getRandomQuote();
  }

  render() {
    let author = "";
    if (this.state.author) {
      author = <h2 id="author">{this.state.author}</h2>;
    } else {
      author = "";
    }
    return (
      <div id="body-container">
        <div id="header-container">
          <h1 id="header">They said what!?</h1>
          <p id="subhead">Words of wisdom</p>
        </div>
        <div id="quote-box">
          <div id="quote-container">
            {author}
            <h1 id="text">{this.state.quote}</h1>
          </div>
          <div id="button-container">
            <button onClick={this.handleClick.bind(this)} id="new-quote" class="btn">
              Get new quote <i class="fa fa-refresh"></i>
            </button>
            <a href="https://twitter.com/intent/tweet" id="tweet-quote" class="btn">
              {/* <i class="fa fa-twitter"></i> */}
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
