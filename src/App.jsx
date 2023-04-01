import {
  useState,
  useEffect
} from 'react'

import Skeleton, {
  SkeletonTheme
} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import './App.css'

import dividerMobile from '../images/pattern-divider-mobile.svg'
import dividerDesktop from '../images/pattern-divider-desktop.svg'
import diceIcon from '../images/icon-dice.svg'

function App() {

  const [advice, setAdvice] = useState('')
  const [adviceId, setAdviceId] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getRandomAdvice = () => {
      const randomId = Math.floor(Math.random() * 217);
      fetch(`https://api.adviceslip.com/advice/${randomId}`)
        .then(response => response.json())
        .then(data => {
          setAdvice(data.slip.advice);
          setAdviceId(data.slip.id)
          setLoading(false);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }

    getRandomAdvice();
  }, []);

  const handleNewAdvice = () => {
    setLoading(true);
    const randomId = Math.floor(Math.random() * 217);
    fetch(`https://api.adviceslip.com/advice/${randomId}`)
      .then(response => response.json())
      .then(data => {
        setAdvice(data.slip.advice);
        setAdviceId(data.slip.id)
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  return (
    <div className="App h-screen flex justify-center items-center p-4">
      <div className="relative bg-dark-grayish-blue px-8 py-16 rounded-lg w-full max-w-[400px] md:max-w-[600px] text-center flex flex-col justify-center items-center gap-8 transition-all">
        {
          loading ? (
            <>
              <p className="text-[1.75rem] transition-all animate-pulse">
                The guru is thinking...     
              </p>
            </>
          ) : (
            <>
              <h1 className={`text-neon-green text-xs tracking-[0.2rem] ${advice && 'fade-in'}`}>
                {`ADVICE #${adviceId}`}
              </h1>
              <p className="text-[1.75rem] transition-all">
                {`"${advice}"`}        
              </p>
            </>
          )
        }
        {/*<h1 className="text-neon-green text-xs tracking-[0.2rem] ">{`ADVICE #${adviceId}`}</h1>
        <p className="text-[1.75rem]">
          "{advice}"
        </p>
*/}        <div>
          <picture>
            <source srcSet={dividerDesktop} media='(min-width: 768px)'/>
            <img src={dividerMobile} alt="divider" />
          </picture>
        </div>
        <button className='bg-neon-green p-5 rounded-full absolute bottom-0 translate-y-1/2 hover:drop-shadow-[0px_0px_16px_rgba(82,255,168,1)] transition-all' onClick={handleNewAdvice}>
          <img src={diceIcon} alt="dice icon" disabled={loading}/>
        </button>
      </div>
    </div>
  )
}

export default App
