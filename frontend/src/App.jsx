
import { useState } from "react";
import "./App.css";
import Auth from "./Auth";
const initialStats = [
  { title: "Total Students", value: "1,248", change: "+12%", icon: "👨‍🎓", color: "blue" },
  { title: "Partner Companies", value: "48", change: "+8%", icon: "🏢", color: "purple" },
  { title: "Active Drives", value: "12", change: "4 closing soon", icon: "📢", color: "orange" },
  { title: "Students Placed", value: "386", change: "+18%", icon: "🎯", color: "green" },
];

const initialDrives = [
  { company: "Infosys", role: "Systems Engineer", date: "Oct 05, 2026", status: "Open", color: "blue", logo: "I" },
  { company: "TCS", role: "Graduate Trainee", date: "Oct 08, 2026", status: "Open", color: "purple", logo: "T" },
  { company: "Accenture", role: "Associate Developer", date: "Oct 12, 2026", status: "Closing Soon", color: "orange", logo: "A" },
  { company: "Wipro", role: "Project Engineer", date: "Oct 15, 2026", status: "Upcoming", color: "green", logo: "W" },
];

const navigation = [
  { name: "Dashboard", icon: "▦" },
  { name: "Students", icon: "♙" },
  { name: "Companies", icon: "▤" },
  { name: "Placement Drives", icon: "◷" },
  { name: "Applications", icon: "▣" },
  { name: "Interviews", icon: "▧" },
  { name: "Offers", icon: "✉" },
];

function App() {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = sessionStorage.getItem("authUser");
      const savedToken = sessionStorage.getItem("authToken");

      if (savedUser && savedToken) {
        const parsedUser = JSON.parse(savedUser);

        if (
          parsedUser &&
          parsedUser.id &&
          ["admin", "student"].includes(parsedUser.role)
        ) {
          return parsedUser;
        }
      }
    } catch {
      sessionStorage.removeItem("authUser");
      sessionStorage.removeItem("authToken");
    }

    sessionStorage.removeItem("authUser");
    sessionStorage.removeItem("authToken");
    return null;
  });
    function handleAuthSuccess(authUser) {
    setUser(authUser);
    setActivePage("Dashboard");
  }

  function handleLogout() {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("authUser");
    setUser(null);
    setActivePage("Dashboard");
    setShowProfile(false);
  }

  const [activePage, setActivePage] = useState("Dashboard");
  const [search, setSearch] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const filteredDrives = initialDrives.filter((drive) =>
    `${drive.company} ${drive.role} ${drive.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );
    if (!user) {
    return <Auth onAuthSuccess={handleAuthSuccess} />;
  }
  
  if (user.role === "student") {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-brand">
            <div className="auth-logo">P</div>
            <div>
              <h1>PlacePilot</h1>
              <p>STUDENT PORTAL</p>
            </div>
          </div>

          <h2>Welcome, {user.name}!</h2>
          <p>
            You are successfully logged in to your student account.
          </p>

          <div style={{ marginTop: "24px" }}>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> Student</p>
          </div>

          <button
            className="auth-submit"
            onClick={handleLogout}
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  function handleNavigation(page) {
    setActivePage(page);
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">P</div>
          <div>
            <h2>PlacePilot</h2>
            <span>PLACEMENT ERP</span>
          </div>
        </div>

        <div className="sidebar-label">WORKSPACE</div>

        <nav className="navigation">
          {navigation.map((item) => (
            <button
              key={item.name}
              className={`nav-item ${activePage === item.name ? "active" : ""}`}
              onClick={() => handleNavigation(item.name)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.name}</span>
              {item.name === "Placement Drives" && (
                <span className="nav-count">12</span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-label tools-label">MANAGEMENT</div>

        <button
          className={`nav-item ${activePage === "Reports" ? "active" : ""}`}
          onClick={() => handleNavigation("Reports")}
        >
          <span className="nav-icon">▥</span>
          <span>Reports & Analytics</span>
        </button>

        <div className="sidebar-bottom">
          <div className="help-card">
            <div className="help-icon">✦</div>
            <h3>Need assistance?</h3>
            <p>Manage your placement activities with ease.</p>
            <button onClick={() => alert("Contact your ERP administrator for support.")}>
              Get support →
            </button>
          </div>

          <div className="sidebar-footer">
            <div className="avatar">AS</div>
            <div className="user-details">
              <strong>Admin User</strong>
              <span>Placement Officer</span>
            </div>
            <button
              className="more-button"
              aria-label="Profile options"
              onClick={() => setShowProfile(!showProfile)}
            >
              ⋯
            </button>
            {showProfile && (
              <div className="profile-menu">
                <button onClick={() => alert("Profile settings will be added later.")}>
                  Profile settings
                </button>
                <button onClick={handleLogout}>
  Sign out
</button>
              </div>
            )}
          </div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="breadcrumbs">
            <span>Workspace</span>
            <span className="breadcrumb-separator">/</span>
            <strong>{activePage}</strong>
          </div>

          <div className="topbar-actions">
            <label className="search-box">
              <span>⌕</span>
              <input
                type="search"
                placeholder="Search companies, students..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              <kbd>⌕</kbd>
            </label>

            <div className="notification-wrap">
              <button
                className="icon-button notification-button"
                aria-label="Notifications"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                ♧
                <span className="notification-dot" />
              </button>
              {showNotifications && (
                <div className="notification-panel">
                  <strong>Notifications</strong>
                  <p>4 placement drives are closing soon.</p>
                  <p>New student applications need review.</p>
                </div>
              )}
            </div>
            <div className="topbar-avatar">AS</div>
          </div>
        </header>

        <div className="page-content">
          {activePage === "Dashboard" ? (
            <>
              <section className="welcome-row">
                <div>
                  <div className="eyebrow">MONDAY, SEPTEMBER 28, 2026</div>
                  <h1>Placement Dashboard <span>✦</span></h1>
                  <p>Here&apos;s what&apos;s happening with your placements today.</p>
                </div>
                <button
                  className="primary-button"
                  onClick={() => handleNavigation("Placement Drives")}
                >
                  <span>＋</span> Create Placement Drive
                </button>
              </section>

              <section className="stats-grid">
                {initialStats.map((stat) => (
                  <article className="stat-card" key={stat.title}>
                    <div className="stat-top">
                      <span className={`stat-icon ${stat.color}`}>{stat.icon}</span>
                      <span className={`stat-change ${stat.color}`}>
                        {stat.change}
                      </span>
                    </div>
                    <p>{stat.title}</p>
                    <h2>{stat.value}</h2>
                    <div className="stat-footnote">
                      {stat.title === "Active Drives"
                        ? "Across all departments"
                        : "Compared with last month"}
                    </div>
                  </article>
                ))}
              </section>

              <section className="middle-grid">
                <article className="panel placement-panel">
                  <div className="panel-heading">
                    <div>
                      <h2>Placement Overview</h2>
                      <p>Student placement progress at a glance</p>
                    </div>
                    <select aria-label="Placement overview period" defaultValue="2026">
                      <option value="2026">Batch 2026</option>
                      <option value="2027">Batch 2027</option>
                    </select>
                  </div>

                  <div className="placement-summary">
                    <div>
                      <span className="summary-number">78%</span>
                      <p>Overall placement rate</p>
                    </div>
                    <span className="summary-badge">↑ 6.4%</span>
                  </div>

                  <div className="progress-track">
                    <div className="progress-fill" />
                  </div>

                  <div className="chart-legend">
                    <span><i className="legend-dot placed" /> Placed <b>386</b></span>
                    <span><i className="legend-dot applying" /> In Process <b>298</b></span>
                    <span><i className="legend-dot seeking" /> Seeking <b>116</b></span>
                  </div>

                  <div className="chart-area">
                    <div className="chart-y-labels">
                      <span>400</span><span>300</span><span>200</span><span>100</span><span>0</span>
                    </div>
                    <div className="bar-chart">
                      {[45, 60, 48, 75, 58, 86, 68, 94, 73, 82, 100, 88].map(
                        (height, index) => (
                          <div className="bar-column" key={index}>
                            <div
                              className={`chart-bar ${index === 10 ? "highlight-bar" : ""}`}
                              style={{ height: `${height}%` }}
                              title={`Month ${index + 1}`}
                            />
                            <span>
                              {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][index]}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </article>

                <article className="panel activity-panel">
                  <div className="panel-heading">
                    <div>
                      <h2>Recent Activity</h2>
                      <p>Latest placement updates</p>
                    </div>
                    <button className="text-button" onClick={() => handleNavigation("Applications")}>
                      View all
                    </button>
                  </div>

                  <div className="activity-list">
                    <div className="activity-item">
                      <div className="activity-icon green">✓</div>
                      <div className="activity-copy">
                        <strong>New offer received</strong>
                        <p>Rahul Sharma received an offer from Infosys.</p>
                        <span>10 minutes ago</span>
                      </div>
                    </div>
                    <div className="activity-item">
                      <div className="activity-icon blue">＋</div>
                      <div className="activity-copy">
                        <strong>New company registered</strong>
                        <p>TechNova joined your placement network.</p>
                        <span>1 hour ago</span>
                      </div>
                    </div>
                    <div className="activity-item">
                      <div className="activity-icon purple">▣</div>
                      <div className="activity-copy">
                        <strong>Interview scheduled</strong>
                        <p>12 students shortlisted for the next round.</p>
                        <span>3 hours ago</span>
                      </div>
                    </div>
                    <div className="activity-item">
                      <div className="activity-icon orange">↗</div>
                      <div className="activity-copy">
                        <strong>Placement drive updated</strong>
                        <p>Accenture applications close soon.</p>
                        <span>Yesterday</span>
                      </div>
                    </div>
                  </div>
                </article>
              </section>

              <section className="panel drives-panel">
                <div className="panel-heading drives-heading">
                  <div>
                    <h2>Upcoming Placement Drives</h2>
                    <p>Keep track of your latest company opportunities</p>
                  </div>
                  <button className="text-button" onClick={() => handleNavigation("Placement Drives")}>
                    View all drives →
                  </button>
                </div>

                <div className="table-scroll">
                  <table>
                    <thead>
                      <tr>
                        <th>COMPANY</th>
                        <th>JOB ROLE</th>
                        <th>APPLICATION DEADLINE</th>
                        <th>STATUS</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDrives.map((drive) => (
                        <tr key={drive.company}>
                          <td>
                            <div className="company-cell">
                              <span className={`company-logo ${drive.color}`}>{drive.logo}</span>
                              <strong>{drive.company}</strong>
                            </div>
                          </td>
                          <td>{drive.role}</td>
                          <td>{drive.date}</td>
                          <td>
                            <span className={`status-badge ${drive.color}`}>
                              <i /> {drive.status}
                            </span>
                          </td>
                          <td>
                            <button
                              className="row-action"
                              onClick={() => alert(`${drive.company}: ${drive.role}`)}
                            >
                              View details →
                            </button>
                          </td>
                        </tr>
                      ))}
                      {filteredDrives.length === 0 && (
                        <tr>
                          <td colSpan="5" className="empty-state">
                            No matching placement drives found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>

              <footer className="page-footer">
                <span>© 2026 PlacePilot · AI Placement ERP</span>
                <span>Made for smarter campus placements ✦</span>
              </footer>
            </>
          ) : (
            <section className="placeholder-page">
              <div className="placeholder-icon">▦</div>
              <div className="eyebrow">WORKSPACE / {activePage.toUpperCase()}</div>
              <h1>{activePage}</h1>
              <p>
                The {activePage.toLowerCase()} module will be built in the next step.
                Your dashboard is ready to explore.
              </p>
              <button className="primary-button" onClick={() => setActivePage("Dashboard")}>
                ← Back to Dashboard
              </button>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;