import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personas from "./services/personas";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [search, setNewSearch] = useState("");
  const [message, setNewMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    personas.getAll().then((response) => setPersons(response.data));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newPhone };

    const personMatch = persons.find(({ name }) => name === newName);

    if (personMatch) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, do you want to update the phone number?`
      );

      if (confirmUpdate) {
        const updatedPerson = { ...newPerson, id: personMatch.id };
        personas
          .update(personMatch.id, updatedPerson)
          .then((response) => {
            setPersons(
              persons.map((p) => (p.id !== personMatch.id ? p : response.data))
            );
            setNewName("");
            setNewPhone("");
            setNewMessage({
              text: `Successfully updated ${updatedPerson.name}'s phone number`,
              type: "success",
            });
            setTimeout(() => {
              setNewMessage({ text: "", type: "" });
            }, 5000);
          })
          .catch((error) => {
            setNewMessage({
              text: `Something went wrong: ${error.message}`,
              type: "error",
            });
          });
      }
    } else {
      personas
        .create(newPerson)
        .then((response) => {
          setPersons(persons.concat(response.data));
          setNewName("");
          setNewPhone("");
          setNewMessage({
            text: `Successfully added ${newPerson.name}`,
            type: "success",
          });
          setTimeout(() => {
            setNewMessage({ text: "", type: "" });
          }, 5000);
        })
        .catch((error) => {
          setNewMessage({
            text: `Something went wrong: ${error.response.data.error}`,
            type: "error",
          });
        });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };

  const handleSearch = (event) => {
    setNewSearch(event.target.value);
  };

  const filteredList = persons.filter((pers) =>
    pers.name.toLowerCase().includes(search.toLowerCase())
  );

  const personsToShow = filteredList.map((person) => {
    return (
      <p key={person.id}>
        {person.name} {person.number}{" "}
        <button onClick={() => deletePerson(person.id)} type="button">
          delete
        </button>
      </p>
    );
  });

  const deletePerson = (id) => {
    if (window.confirm("Do you want to delete the contact?")) {
      personas
        .borrar(id)
        .then(() => {
          setPersons(persons.filter((element) => element.id !== id));
          setNewMessage({
            text: "Contact deleted successfully",
            type: "success",
          });
          setTimeout(() => {
            setNewMessage({ text: "", type: "" });
          }, 5000);
        })
        .catch((error) => {
          setNewMessage({
            text: `Something went wrong: ${error.message}`,
            type: "error",
          });
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message.text} type={message.type} />
      <Filter search={search} handleSearch={handleSearch} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newPhone={newPhone}
        handlePhoneChange={handlePhoneChange}
      />

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  );
};

export default App;
