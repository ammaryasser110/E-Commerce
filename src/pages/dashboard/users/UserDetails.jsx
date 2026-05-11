import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Spinner } from "react-bootstrap";

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  const getUser = async () => {
    const res = await axios.get(`https://dummyjson.com/users/${id}`);
    setUser(res.data);
  };

  useEffect(() => {
    getUser();
  }, [id]);

  if (!user) return <Spinner />;

  return (
    <Card style={{ maxWidth: "600px", margin: "auto" }}>
      <Card.Img variant="top" src={user.image} style={{width: "200px", height: "100%", objectFit: "cover"}}/>

      <Card.Body>
        <Card.Title>
          {user.firstName} {user.lastName}
        </Card.Title>

        <Card.Text>
          <strong>ID:</strong> {user.id}
        </Card.Text>
        <Card.Text>
          <strong>Email:</strong> {user.email}
        </Card.Text>
        <Card.Text>
          <strong>Phone:</strong> {user.phone}
        </Card.Text>
        <Card.Text>
          <strong>Age:</strong> {user.age}
        </Card.Text>
        <Card.Text>
          <strong>Gender:</strong> {user.gender}
        </Card.Text>

        <hr />

        <Card.Text>
          <strong>Address:</strong> {user.address.address}, {user.address.city},{" "}
          {user.address.country}
        </Card.Text>

        <Card.Text>
          <strong>Company:</strong> {user.company.name}
        </Card.Text>

        <Card.Text>
          <strong>Position:</strong> {user.company.title}
        </Card.Text>

        <Card.Text>
          <strong>University:</strong> {user.university}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
