import React, { useState, useEffect } from "react";
import "./styles/Quote.css";

function Quote() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const fetchQuotesData = async () => {
      try {
        const response = await fetch(
          "https://gist.githubusercontent.com/awran5/355643af99164a61ae0f95c84206d151/raw/c62636e8eef7e73540fa04b67f753ca9b95ee21e/quotes-api.js"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch quotes data");
        }

        const data = await response.json();
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomQuote = data[randomIndex];

        setQuote(randomQuote.quote);
        setAuthor(randomQuote.author);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchQuotesData();
  }, []);

  return (
    <div className="quote-container">
      <div className="quote">
        <span>&#x201C; </span>
        {quote}
        <span> &#x201D;</span>
      </div>
      <div className="author"> - {author}</div>
    </div>
  );
}

export default Quote;
