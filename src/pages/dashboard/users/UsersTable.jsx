import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  // GET USERS
  const getUsers = async () => {
    const res = await axios.get("https://dummyjson.com/users?limit=100");

    setUsers(res.data.users);
  };

  useEffect(() => {
    getUsers();
  }, []);

  // SEARCH
  const filteredUsers = users.filter((u) =>
    `${u.firstName} ${u.lastName}`.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <h3 className="mb-3">Users</h3>

      {/* SEARCH */}
      <Form.Control
        type="text"
        placeholder="Search user..."
        className="mb-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* TABLE */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Username</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.map((u) => (
            <tr
              key={u.id}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/dashboard/users/${u.id}`)}
            >
              <td>
                {u.firstName} {u.lastName}
              </td>

              <td>{u.email}</td>

              <td>{u.username}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
