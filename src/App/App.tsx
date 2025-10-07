import {useEffect, useState} from 'react';
import './App.scss';

function App() {

  const [timeToDisplay, setTimeToDisplay] = useState('');
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');


  useEffect(() => {

    /* Display time */
    const displayTimeNow = () => {
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
    displayTimeNow();
    setInterval(displayTimeNow, 1000);


    /* Display quote */
    async function fetchQuote() {
      try {
        //GET https://api.quotable.io/quotes - check how many quotes there are.
        const res = await fetch("https://zenquotes.io/api/random");
        const data = await res.json();
        console.dir(data)
        setAuthor(data);
        //setAuthor(data.author);
        //setQuote(data.content);
      } catch (error) {
        console.log(error)
      }
    }

    setTimeout(()=>{
      fetchQuote();
    }, 1000)
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
