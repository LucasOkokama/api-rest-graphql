import { useState } from "react";
import "./App.css";
import { useMutation, useQuery, gql } from "@apollo/client";

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      age
      name
      isMarried
    }
  }
`;

const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      id
      name
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $age: Int!, $isMarried: Boolean!) {
    createUser(name: $name, age: $age, isMarried: $isMarried) {
      name
    }
  }
`;

function App() {
  const [newUser, setNewUser] = useState({});

  const {
    data: getUsersData,
    error: getUsersError,
    loading: getUsersLoading,
  } = useQuery(GET_USERS);

  const { data: getUserByIdData, loading: getUserByIdLoading } = useQuery(
    GET_USER_BY_ID,
    {
      variables: { id: "2" },
    }
  );

  const [createUser] = useMutation(CREATE_USER);

  if (getUsersLoading) return <p>Data loading...</p>;
  if (getUsersError) return <p>Error: {error.message}</p>;

  const handleCreateUser = async () => {
    try {
      await createUser({
        variables: {
          name: newUser.name,
          age: newUser.age,
          isMarried: newUser.isMarried,
        },
      });
    } catch (error) {
      console.error("Erro ao criar o usuário:", error);
    }
  };

  return (
    <div id="container">
      <h1 className="title">Specific User</h1>
      <div>
        {getUserByIdLoading ? (
          <p>Loading user...</p>
        ) : (
          <>
            <p>Id: {getUserByIdData.getUserById.id}</p>
            <p>Nome: {getUserByIdData.getUserById.name}</p>
          </>
        )}
      </div>

      <br />

      <h1 className="title">Users</h1>
      <div id="users">
        {getUsersData.getUsers.map((user, index) => (
          <div key={index} className="user-data">
            <p>Nome: {user.name}</p>
            <p>Age: {user.age}</p>
            <p>Is married: {user.isMarried ? "Yes" : "No"}</p>
          </div>
        ))}
      </div>

      <br />
      <br />

      <div>
        <input
          placeholder="Name..."
          type="text"
          onChange={(e) =>
            setNewUser((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <br />
        <input
          placeholder="Age..."
          type="number"
          onChange={(e) =>
            setNewUser((prev) => ({ ...prev, age: Number(e.target.value) }))
          }
        />

        <br />
        <br />

        <p>Are you married?</p>
        <div
          onChange={(e) =>
            setNewUser((prev) => ({
              ...prev,
              isMarried: e.target.value === "Yes",
            }))
          }
        >
          <input type="radio" id="no" name="ismarried" value="No" />
          <label htmlFor="no" style={{ marginRight: 15 }}>
            No
          </label>
          <input type="radio" id="yes" name="ismarried" value="Yes" />
          <label htmlFor="yes">Yes</label>
        </div>

        <br />
        <br />
        <br />
        <button onClick={handleCreateUser}>Create User</button>
      </div>
    </div>
  );
}

export default App;
