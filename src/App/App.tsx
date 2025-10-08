import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import './App.scss';

function App() {

  const [timeToDisplay, setTimeToDisplay] = useState('');
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

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

  /* Fetch and set quote as string */
  async function fetchQuote() {
    try {
      const res = await fetch("https://quoteslate.vercel.app/api/quotes/random");
      return await res.json();
    } catch (error) {
      console.log(error)
    }
  }

  /* Saving last loaded quote into local storage*/
  const saveQuote = (data: any) => {
    localStorage.setItem('quote', JSON.stringify(data));
    setAuthor(data.author);
    setQuote(data.quote);
  }

  useEffect(() => {

    currentTime();
    setInterval(currentTime, 1000);

    let savedData: any = localStorage.getItem('quote');
    if (savedData) {
      savedData = JSON.parse(savedData);
      setAuthor(savedData.author);
      setQuote(savedData.quote);
    } else {
      fetchQuote().then(data => saveQuote(data));
    }
  }, []);

  return (
    <div id='app-wrapper'>
      <div id='time-wrapper'>
        <p id='time' className='glow-text'>{timeToDisplay}</p>
        <Button variant="contained" size="large" onClick={(event: any) => fetchQuote().then(data => saveQuote(data))}>
          <strong>Next quote</strong>
        </Button>
      </div>

      <div id='quote-wrapper'>
        <div id='quote-card'>
          <p id='quote'><strong>&ldquo;{quote}&rdquo;</strong></p>
          <p id='quote-author'>{author}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
