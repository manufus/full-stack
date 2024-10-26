import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>
        {props.value} {props.percent}
      </td>
    </tr>
  );
};

const Statistics = (props) => {
  if (props.good == 0 && props.neutral == 0 && props.bad == 0) {
    return (
      <div>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>
    );
  } else {
    return (
      <div>
        <h2>statistics</h2>
        <table>
          <tbody>
            <StatisticsLine text="Good" value={props.good} />
            <StatisticsLine text="Neutral" value={props.neutral} />
            <StatisticsLine text="Bad" value={props.bad} />
            <StatisticsLine text="Total" value={props.total} />
            <StatisticsLine text="Average" value={props.average} />
            <StatisticsLine
              text="Positive"
              value={props.positive}
              percent="%"
            />
          </tbody>
        </table>
      </div>
    );
  }
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  let total = good + neutral + bad;
  let average = (good * 1 + bad * -1) / total;
  let positive = (good * 100) / total;

  const addGood = () => {
    setGood(good + 1);
  };
  const addNeutral = () => {
    setNeutral(neutral + 1);
  };
  const addBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={addGood} text="good" />
      <Button onClick={addNeutral} text="neutral" />
      <Button onClick={addBad} text="bad" />
      {/* <h2>statistics</h2>
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
      <p>Total {total}</p>
      <p>Average {average}</p>
      <p>Positive {positive} %</p> */}
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;
