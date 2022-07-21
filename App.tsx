import React, { useState } from 'react';
import './style.css';

interface Iexpense {
  id: number;
  text: string;
  num: string | number;
  isCompleted: boolean;
}

const initialExpenses = [
  { id: 1, text: 'rent', num: '300.50', isCompleted: false },
  { id: 2, text: 'fee', num: '1300', isCompleted: false },
  { id: 1, text: 'laptop', num: '500', isCompleted: false },
];

export default function App(): JSX.Element {
  const [expeses, setExpenses] = useState<Iexpense[]>(initialExpenses);
  const [txtV, setTxtV] = useState<Iexpense['text']>();
  const [numV, setNumV] = useState<Iexpense['num']>();

  const handleSubmit = () => {
    const totalExpenses = [...initialExpenses];

    const newExpense = {
      id: new Date().toString(),
      text: { txtV },
      num: numV,
      isCompleted: false,
    };
    const tot = [...totalExpenses, newExpense];
  };
  return (
    <div>
      {/* <h1 style={{ textAlign: 'center' }}>BUDGET CALUCULATER</h1> */}
      <form
        onSubmit={handleSubmit}
        style={{ textAlign: 'center', marginTop: '2rem' }}
      >
        <input
          type="text"
          value={txtV}
          onChange={(e) => setTxtV(e.target.value)}
          placeholder="enter rent..."
        />
        <input
          type="number"
          value={numV}
          onChange={(e) => setNumV(Number(e.target.value))}
          placeholder="enter num"
        />

        <button>submit</button>
      </form>
      <div
        style={{
          marginTop: '2rem',
        }}
      >
        {expeses &&
          expeses.map((item) => {
            return (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}
              >
                <p style={{ width: '150px' }}>{item.text}</p>
                <button style={{ width: '50px', marginRight: '1rem' }}>
                  Edit
                </button>
                <button>spent</button>
                <button>&#10060;</button>
              </div>
            );
          })}
      </div>
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        TotalAmount:{' '}
        {expeses &&
          expeses.reduce((acc, cur) => Number(acc + Number(cur.num)), 0)}
      </div>
    </div>
  );
}
