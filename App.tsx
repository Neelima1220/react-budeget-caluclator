import React, { useEffect, useState } from 'react';
import './style.css';

interface Iexpense {
  id: number | string;
  text: string;
  num: string | number;
  isCompleted: boolean;
}

export default function App(): JSX.Element {
  const [expeses, setExpenses] = useState<Iexpense[]>();
  const [txtV, setTxtV] = useState<string>('');
  const [numV, setNumV] = useState<number | string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editId, setEditId] = useState(0);

  useEffect(() => {
    if (localStorage.getItem('expenses')) {
      setExpenses(JSON.parse(localStorage.getItem('expenses')));
    } else {
      setExpenses([]);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (txtV.trim() !== '' && numV > 0) {
      const totalExpenses = [...expeses];
      if (isEdit) {
        const temop = totalExpenses.map((item) => {
          return item.id === editId ? { ...item, text: txtV, num: numV } : item;
        });
        setExpenses(temop);
        localStorage.setItem('expenses', JSON.stringify(temop));
        setIsEdit(false);
      } else {
        const newExpense = {
          id: new Date().toString(),
          text: txtV,
          num: numV,
          isCompleted: false,
        };
        const totExp = [...totalExpenses, newExpense];
        setExpenses(totExp);
        localStorage.setItem('expenses', JSON.stringify(totExp));
      }
      setTxtV('');
      setNumV('');
    } else {
      window.alert('enter something');
    }
  };

  const handleDelete = (id) => {
    const totalExpenses = [...expeses];
    const temo = totalExpenses.filter((item) => item.id !== id);
    setExpenses(temo);
    localStorage.setItem('expenses', JSON.stringify(temo));
  };

  const handleEdit = (id) => {
    const totalExpenses = [...expeses];
    const expeItem = totalExpenses.find((item) => {
      return item.id === id;
    });
    const { text, num } = expeItem;
    setTxtV(text);
    setNumV(num);
    setIsEdit(true);
    setEditId(id);
  };

  const handleSpent = (id) => {
    const totalExpenses = [...expeses];
    const temoo = totalExpenses.map((item) => {
      if (item.id === id) {
        return { ...item, isCompleted: true };
      } else {
        return item;
      }
    });
    setExpenses(temoo);
    localStorage.setItem('expenses', JSON.stringify(temoo));
  };
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>BUDGET CALUCULATER</h1>
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
          type="text"
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
          expeses.map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  backgroundColor: item.isCompleted ? 'green' : '#fff',
                  margin: '0.5rem',
                  padding: '0 0.5rem',
                }}
              >
                <p style={{ width: '150px' }}>{item.text}</p>
                <button
                  style={{ width: '50px', marginRight: '0.5rem' }}
                  onClick={() => handleEdit(item.id)}
                  disabled={item.isCompleted}
                >
                  Edit
                </button>
                <button
                  style={{ width: '50px', marginRight: '0.5rem' }}
                  onClick={() => handleSpent(item.id)}
                >
                  spent
                </button>
                <button
                  style={{ width: '30px' }}
                  onClick={() => handleDelete(item.id)}
                >
                  &#10060;
                </button>
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
