import { useState } from "react";
import "./App.css";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  // State for events
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");

  // State for announcements
  const [announcements, setAnnouncements] = useState([]);
  const [announcementText, setAnnouncementText] = useState("");

  // Mock login
  const handleLogin = (e) => {
    e.preventDefault();
    if (email) {
      setLoggedIn(true);
    } else {
      alert("Enter society email!");
    }
  };

  // Add new event
  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!title || !date || !desc) {
      alert("Fill all event details!");
      return;
    }
    const newEvent = { id: Date.now(), title, date, desc };
    setEvents([...events, newEvent]);
    setTitle("");
    setDate("");
    setDesc("");
  };

  // Add announcement
  const handleAddAnnouncement = (e) => {
    e.preventDefault();
    if (!announcementText) {
      alert("Announcement cannot be empty!");
      return;
    }
    setAnnouncements([
      ...announcements,
      { id: Date.now(), text: announcementText },
    ]);
    setAnnouncementText("");
  };

  // Login Page
  if (!loggedIn) {
    return (
      <div className="login-bg">
        <form
          onSubmit={handleLogin}
          className="login-card2"
        >
          <div className="login-avatar">
            <span role="img" aria-label="admin" className="login-icon">🏫</span>
          </div>
          <h2 className="login-title2">
            Society Admin Login
          </h2>
          <input
            type="email"
            placeholder="Society Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input2"
            required
          />
          <button
            type="submit"
            className="login-btn2"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  // Dashboard (Society side)
  return (
    <div className="dashboard-bg">
      <div className="dashboard-main-card">
        <h1 className="dashboard-title2">
          <span role="img" aria-label="dashboard">🏫</span> Society Admin Dashboard
        </h1>

        {/* Add Event */}
        <div className="dashboard-card2">
          <h2 className="dashboard-section-title">Create New Event</h2>
          <form onSubmit={handleAddEvent} className="dashboard-form">
            <input
              type="text"
              placeholder="Event Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="dashboard-input"
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="dashboard-input"
            />
            <textarea
              placeholder="Event Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="dashboard-input"
            />
            <button
              type="submit"
              className="dashboard-btn dashboard-btn-green"
            >
              <span role="img" aria-label="add">➕</span> Add Event
            </button>
          </form>
        </div>

        {/* Add Announcement */}
        <div className="dashboard-card2">
          <h2 className="dashboard-section-title">Post Announcement</h2>
          <form onSubmit={handleAddAnnouncement} className="dashboard-form">
            <textarea
              placeholder="Type announcement..."
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              className="dashboard-input"
            />
            <button
              type="submit"
              className="dashboard-btn dashboard-btn-blue"
            >
              <span role="img" aria-label="announce">📢</span> Post
            </button>
          </form>
        </div>

        {/* Display Events */}
        <div className="dashboard-card2">
          <h2 className="dashboard-section-title">Your Events</h2>
          {events.length === 0 ? (
            <p className="dashboard-empty">No events yet.</p>
          ) : (
            <div className="dashboard-events-list">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="dashboard-event-card"
                >
                  <div className="dashboard-event-header">
                    <span className="dashboard-event-icon" role="img" aria-label="event">📅</span>
                    <h3 className="dashboard-event-title">{event.title}</h3>
                  </div>
                  <p className="dashboard-event-date">{event.date}</p>
                  <p className="dashboard-event-desc">{event.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Display Announcements */}
        <div className="dashboard-card2">
          <h2 className="dashboard-section-title">Your Announcements</h2>
          {announcements.length === 0 ? (
            <p className="dashboard-empty">No announcements yet.</p>
          ) : (
            <ul className="dashboard-announcement-list">
              {announcements.map((a) => (
                <li key={a.id} className="dashboard-announcement-item">
                  <span role="img" aria-label="announcement">📢</span> {a.text}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}