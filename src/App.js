import { useState } from "react";

export default function App() {
  return (
    <div className="App">
      <Attendance />
    </div>
  );
}

function Attendance() {
  const [target, setTarget] = useState(80)
  const [total, setTotal] = useState("")
  const [attended, setAttended] = useState("")
  const [output, setOutput] = useState("")

  // Slider Change
  function handleChange(e) {
    setTarget(parseInt(e.target.value, 10))
  }
  // Total lectures input
  function handleTotal(e) {
    setTotal(e.target.value)
  }
  // Attended lectures input
  function handleAttended(e) {
    setAttended(e.target.value)
  }

  // When we submit the Inputs
  function handleSubmit() {
    const totalLects = parseInt(total, 10)
    const attendedLects = parseInt(attended, 10)
    const targetPercent = parseInt(target, 10)
    // console.log(totalLects)
    // console.log(attendedLects)
    
    if (isNaN(totalLects) || isNaN(attendedLects)) {
      setOutput("Invalid Inputs!")
      return
    } 
    else if (targetPercent == 0) {
      setOutput("You can bunk all the lectures!!")
      return
    } else if (attendedLects > totalLects) {
      setOutput("Attended lectures cannot exceed total lectures!")
      return
    } 
    
    else {
      let canMiss = 0
      while (true) {
        let currentPercent = attendedLects / (totalLects + canMiss) * 100

        if (currentPercent < targetPercent) {
          break
        }

        canMiss += 1
      }
      if (canMiss != 0) canMiss -= 1
      setOutput(`You can miss ${canMiss} lecture(s), ${Math.floor(canMiss / 6)} Day(s)`)
    }
  }

  return (
    <div className="form">
      <h1>Bunkable Lectures Calculator</h1>

      <input
        type="text"
        value={total}
        onChange={handleTotal}
        placeholder="Total no. of lectures"
      />
      <input
        type="text"
        value={attended}
        onChange={handleAttended}
        placeholder="No. of lectures attended"
      />

      <p>Set your target attendance percentage</p>
      <input
        type="range"
        value={target}
        min={0}
        max={100}
        onChange={handleChange}
      />

      <p style={{ marginTop: "5px", fontSize: "20px", fontWeight: "600" }}>
        {target}%
      </p>

      <button onClick={handleSubmit}>Calculate</button>

      <p style={{color: "white", marginTop: "20px"}}>{output}</p>

      <p className="credits">Made by Raman for Shizu ❤️</p>
    </div>
  )
}