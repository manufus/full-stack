import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setAllVotes] = useState(new Array(anecdotes.length).fill(0));
  console.log(votes);

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };

  const selectRandom = () => {
    setSelected(getRandomInt(anecdotes.length));
  };

  const addVote = () => {
    const updatedVotes = [...votes];
    updatedVotes[selected] += 1;
    setAllVotes(updatedVotes);
  };

  const mostVotedNumber = Math.max(...votes);
  const mostVoted = votes.findIndex((element) => element == mostVotedNumber);

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <br></br>
      <p>Has {votes[selected]} votes</p>
      <button onClick={selectRandom}>Next anecdote</button>
      <button onClick={addVote}>Vote</button>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[mostVoted]}</p>
    </div>
  );
};

export default App;
