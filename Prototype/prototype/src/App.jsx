import { useState } from "react";
import "./App.css"; // Ensure styles are imported

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  // Sample events
  const events = [
    { id: 1, title: "Tech Fest 2025", date: "2025-09-10" },
    { id: 2, title: "Debate Competition", date: "2025-09-15" },
    { id: 3, title: "Hackathon", date: "2025-09-20" },
  ];

  // Mock login
  const handleLogin = (e) => {
    e.preventDefault();
    if (email) {
      setLoggedIn(true);
    } else {
      alert("Please enter your college email!");
    }
  };

  const handleReminder = (eventTitle) => {
    alert(`Reminder set for: ${eventTitle}`);
  };

  if (!loggedIn) {
    return (
      <div className="center-bg">
        <form
          onSubmit={handleLogin}
          className="login-card"
        >
          <h2 className="login-title">
            Society Portal Login
          </h2>
          <input
            type="email"
            placeholder="College Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            required
          />
          <button
            type="submit"
            className="login-btn"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  // Dashboard view
  return (
    <div className="center-bg">
      <div className="dashboard-card">
        <div className="profile-row">
          <div className="profile-avatar">
            <span role="img" aria-label="profile" className="profile-icon">👤</span>
          </div>
          <div>
            <h1 className="dashboard-title">Welcome!</h1>
            <p className="dashboard-email">{email}</p>
          </div>
        </div>
        <h2 className="events-title">Upcoming Events:</h2>
        <div className="events-list">
          {events.map((event) => (
            <div
              key={event.id}
              className="event-card"
            >
              <div className="event-info">
                <span className="event-icon">📅</span>
                <div>
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-date">{event.date}</p>
                </div>
              </div>
              <button
                onClick={() => handleReminder(event.title)}
                className="reminder-btn"
              >
                <span>🔔</span> Set Reminder
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}