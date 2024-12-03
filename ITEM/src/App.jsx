import React from 'react'
import { useState } from 'react';
import "./App.css"


function intersection(a, b) {
  return a.filter((value) => b.indexOf((value) !== -1))

}

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1)
}

function App() {
  let [checked, setChecked] = useState([]);
  let [left, setLeft] = useState([0, 1, 2, 3]);
  let [right, setRight] = useState([4, 5, 6, 7]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
  // console.log("leftchc",leftChecked)

  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }
    setChecked(newChecked);
  };
  // console.log(checked);
  const handleAllRight = () => {
    setRight(right.concat(left))
    setLeft([])

  }

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  }


  const handleCheckLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked))
    setChecked(not(checked, rightChecked))

  }

  const handleCheckRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked))
    setChecked(not(checked, leftChecked))
  }



  const customlist = (item) => (
    <div className='list'>
      <ul>
        {
          item.map((value) => {
            const labelId = `tranfer-list-item- ${value}
          -label`
            return (
              <li key={value}>
                <input type="checkbox"
                  onChange={() => handleToggle(value)}
                  checked={checked.indexOf(value) !== -1}
                  id={labelId} />
                <label htmlFor='labelId'>Item {value + 1}</label>
              </li>
            )
          })

        }

      </ul>

    </div>
  )


  return <>
    <div className='tranfer-list'>
      <div className='list-container'>{customlist(left)}</div>
      <div className='button-container'>

        <button onClick={handleCheckRight}> ADD &gt;</button>
        <button onClick={handleCheckLeft}>Remove &lt;</button>
        <button onClick={handleAllRight}> Add All&gt;&gt;</button>
        <button onClick={handleAllLeft}>Remove All&lt;&lt;</button>

      </div>
      <div className='list-container'>{customlist(right)}</div>

    </div>
  </>
}

export default App