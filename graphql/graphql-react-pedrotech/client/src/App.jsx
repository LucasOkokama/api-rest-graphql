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

function App() {
  const {
    data: getUsersData,
    error: getUsersError,
    loading: getUsersLoading,
  } = useQuery(GET_USERS);

  const {
    data: getUserByIdData,
    error: getUserByIdError,
    loading: getUserByIdLoading,
  } = useQuery(GET_USER_BY_ID, {
    variables: { id: "2" },
  });

  if (getUsersLoading) return <p>Data loading...</p>;
  if (getUsersError) return <p>Error: {error.message}</p>;

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
    </div>
  );
}

export default App;
