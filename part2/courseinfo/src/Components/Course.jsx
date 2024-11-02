const Course = ({ course }) => {
  return (
    <div>
      {course.map((element) => (
        <div key={element.id}>
          <Header name={element.name} />
          <Content parts={element.parts} />
        </div>
      ))}
    </div>
  );
};

const Header = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  );
};

const Content = (props) => {
  return (
    <div>
      <Parts parts={props.parts} />
    </div>
  );
};

const Parts = (props) => {
  const total = props.parts.reduce((sum, element) => {
    return sum + element.exercises;
  }, 0);

  return (
    <div>
      {props.parts.map((element) => (
        <p key={element.id}>
          {element.name} {element.exercises}
        </p>
      ))}
      <b>Total of {total} exercises</b>
    </div>
  );
};

export default Course;
