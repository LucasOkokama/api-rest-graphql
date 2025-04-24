import "./App.css";
import { useMutation, useQuery, gql } from "@apollo/client";

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      age
      id
      name
      isMarried
    }
  }
`;

function App() {
  const { data, error, loading } = useQuery(GET_USERS);

  if (loading) return <p>Data loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div id="container">
      <h1 className="title">Users</h1>

      <div id="users">
        {data.getUsers.map((user, index) => (
          <div key={index} className="user-data">
            <p>Nome: {user.name}</p>
            <p>Age: {user.age}</p>
            <p>Is married: {user.isMarried ? "Yes" : "No"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
