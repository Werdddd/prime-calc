import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './App.css'

function App() {
   const [number, setNumber] = useState('');
    const [factors, setFactors] = useState([]);
    const [uniqueFactors, setUniqueFactors] = useState([]);
    const [factorTree, setFactorTree] = useState(null);
    const [mode, setMode] = useState('light');
    const [message, setMessage] = useState('');

  useEffect(() => {
    if (mode === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [mode]);

  function buildFactorTree(n) {
    if (n < 2) return null;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) {
        return {
          value: n,
          left: buildFactorTree(i),
          right: buildFactorTree(n / i),
        };
      }
    }
    return { value: n, left: null, right: null };
  }

  const calculateFactors = () => {
    const n = parseInt(number);
    if (isNaN(n)) {
      setFactors([]);
      setUniqueFactors([]);
      setFactorTree(null);
      setMessage('');
      return;
    }
    if (n === 1) {
      setFactors([]);
      setUniqueFactors([]);
      setFactorTree(null);
      setMessage('1 is a weird number - it is not a prime, but is not divisible by other numbers, either.');
      return;
    }
    let isPrime = true;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) {
        isPrime = false;
        break;
      }
    }
    if (n > 1 && isPrime) {
      setMessage('This is a prime number.');
    } else {
      setMessage('');
    }
    let num = n;
    const all = [];
    const unique = new Set();
    for (let i = 2; i <= num; i++) {
      while (num % i === 0) {
        all.push(i);
        unique.add(i);
        num = num / i;
      }
    }
    setFactors(all);
    setUniqueFactors([...unique]);
    setFactorTree(buildFactorTree(n));
  };

  // Enhanced renderTree with SVG connectors
  const renderTree = (node, isRoot = false) => {
    if (!node) return null;

    // Leaf node
    if (!node.left && !node.right) {
      return (
        <div className="factor-tree-node animate-pop">
          {node.value}
        </div>
      );
    }

    // Render children
    const children = [node.left, node.right].filter(Boolean);

    return (
      <div className="relative flex flex-col items-center">
        <div className={`factor-tree-node ${isRoot ? 'factor-tree-node-root' : ''} animate-pop`}>{node.value}</div>
        {/* SVG lines to children */}
        <div style={{ position: 'relative', height: children.length ? 40 : 0, width: 0 }}>
          <svg width="120" height="40" style={{ position: 'absolute', left: '40%', top: 0, transform: 'translateX(-50%)' }}>
            {node.left && (
              <line x1="60" y1="0" x2="20" y2="40" stroke="var(--gold)" strokeWidth="2" />
            )}
            {node.right && (
              <line x1="60" y1="0" x2="100" y2="40" stroke="var(--gold)" strokeWidth="2" />
            )}
          </svg>
        </div>
        {/* Children container */}
        <div className="flex justify-center gap-10 w-full">
          {node.left && <div className="flex flex-col items-center">{renderTree(node.left)}</div>}
          {node.right && <div className="flex flex-col items-center">{renderTree(node.right)}</div>}
        </div>
      </div>
    );
  };

  const toggleMode = () => setMode(mode === 'light' ? 'dark' : 'light');

  return (
    <div className={`flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]${mode === 'dark' ? ' dark' : ''}`}>
      <Navbar mode={mode} toggleMode={toggleMode} />

      <main className="flex-grow flex flex-col items-center justify-center px-6 sm:px-12 lg:px-20 py-16 sm:py-24 gap-10 max-w-5xl w-full mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[--gold-dark] text-center">Prime Factorization</h1>

        <p className="text-lg sm:text-xl text-[--gold-dark] max-w-2xl text-center">
          Enter a number to view its prime factors, unique prime factors, and the factor tree.
        </p>

        <div className="flex flex-col gap-2 w-full max-w-md mx-auto">
          <input
            type="number"
            min="2"
            placeholder="Enter a number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="w-full text-center"
          />
          <div className="flex flex-row gap-4 w-full mt-3">
            <button onClick={calculateFactors} className="w-full">Factorize</button>
            <button
              onClick={() => {
                setNumber('');
                setFactors([]);
                setUniqueFactors([]);
                setFactorTree(null);
                setMessage('');
              }}
              className="w-full"
            >
              Reset
            </button>
          </div>
        </div>

        {message && (
          <div className="text-lg text-[--gold-dark] font-semibold text-center mt-4">{message}</div>
        )}

        {factors.length > 0 && (
          <section className="w-full space-y-12 text-center mt-8">
            <div className="flex flex-col md:flex-row gap-6 w-full">
              <div className="flex-1">
                <div className="card mx-auto w-full">
                  <h2 className="text-2xl font-semibold text-[--gold-dark] mb-2">Prime Factors:</h2>
                  <p className="text-xl select-text font-mono tracking-wide text-[--black] break-words">{factors.join(' × ')}</p>
                </div>
              </div>

              <div className="flex-1">
                <div className="card mx-auto w-full">
                  <h2 className="text-2xl font-semibold text-[--gold-dark] mb-2">Unique Prime Factors:</h2>
                  <p className="text-xl select-text font-mono tracking-wide text-[--black] break-words">{uniqueFactors.join(', ')}</p>
                </div>
              </div>
            </div>
            

           

            <div className="card mx-auto w-full p-8">
              <h2 className="text-2xl font-semibold text-[--gold-dark] mb-6">Factor Tree:</h2>
              <div className="flex justify-center overflow-x-auto">
                {renderTree(factorTree, true)}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App
