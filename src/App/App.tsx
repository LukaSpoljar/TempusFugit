import {useEffect, useState} from 'react';
import './App.scss';

function App() {

  const [timeToDisplay, setTimeToDisplay] = useState('');
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {

    /* Get and set current time in string format hh:mm:ss */
    const currentTime = () => {
      let dateNow: Date = new Date(Date.now());

      let hours: number | string = dateNow.getHours();
      let minutes: number | string = dateNow.getMinutes();
      let seconds: number | string = dateNow.getSeconds();

      const turnToString = (time: number) => time < 10 ? '0' + time.toString() : time.toString();

      hours = turnToString(hours);
      minutes = turnToString(minutes);
      seconds = turnToString(seconds);

      setTimeToDisplay(`${hours}:${minutes}:${seconds}`);
    }
    currentTime();
    setInterval(currentTime, 1000);

    /* Fetch and set quote as string */
    async function fetchQuote() {
      try {
        const res = await fetch("https://quoteslate.vercel.app/api/quotes/random");
        return await res.json();
      } catch (error) {
        console.log(error)
      }
    }
    fetchQuote().then(data => {
      setAuthor(data.author);
      setQuote(data.quote);
    });

  }, []);

  return (
    <>
      <div id='time-wrapper'>
        <p id='time'>{timeToDisplay}</p>
      </div>

      <div id='quote-wrapper'>
        <p id='quote-author'>{author}</p>
        <p id='quote'>{quote}</p>
      </div>
    </>
  );
}

export default App;