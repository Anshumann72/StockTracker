import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";

function Profile() {
  const [email, setEmail] = useState(""); // Set initial state for email
  const [password, setPassword] = useState(""); // Set initial state for password
  const [confirmPassword, setConfirmPassword] = useState(""); // Set initial state for confirmPassword
  const [error, setError] = useState(""); // Set initial state for error
  const [loading, setLoading] = useState(false); // Set initial state for loading

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    // Here, you would implement your logic for updating the user's profile
    // For demonstration purposes, let's assume you have a function called updateUserProfile
    // This function would handle updating the user's email and password
    setLoading(true);
    setError("");

    try {
      // Call your updateUserProfile function passing email and password
      // This function should handle updating the user's email and/or password
      // await updateUserProfile(email, password);

      // For demonstration, we are logging the values
      console.log("Email:", email);
      console.log("Password:", password);

      // Clear the form fields after submission
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Failed to update profile:", error);
      setError("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <Card.Body>
        <h2 className="text-center mb-4">Profile</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group id="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group id="confirm-password">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Button disabled={loading} className="w-100 mt-4" type="submit">
            Update Profile
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Profile;
