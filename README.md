 Real-Time-public-transport-tracking-for-small-cites:
Real-Time Public Transport Tracking for Small Cities is a system used to track buses or vehicles in real time using GPS. It helps users view live locations, arrival times, and routes. The system improves transport efficiency, reduces waiting time, and supports better travel planning.


DAY 1 — 
June 1: Project Title Finalization**
Deliverable: Approved Project Title

Project Title: "Real-Time Public Transport Tracking System for Small Cities"
This project addresses the problem of unpredictable bus timings in small cities where no digital tracking system exists. Passengers waste time waiting at bus stops without knowing when the next bus will arrive. This system will track vehicles in real-time using GPS and display live location to passengers through a web application.

Tasks:
• Finalize project title: "Real-Time Public Transport Tracking System for Small Cities"
• Domain: Smart City / Public Transport / Location Tracking
• Identify target users: Passengers, Transport Admin, Bus Drivers
• Present title to mentor and get approval




DAY 2 — 
June 2: Requirement Gathering**
Deliverable: Problem Statement

In small cities, bus schedules are irregular and no digital tracking system is available. Passengers arrive at bus stops without knowing whether the bus has already left or is yet to arrive. This system solves that problem by providing live bus location, estimated arrival time, and route information through a web application.

Functional Requirements:
• Passengers can view real-time bus location on a map
• Drivers can send live GPS location from their mobile browser
• Admin can manage buses, routes, and stops
• System displays estimated arrival time to passengers
• Route and stop information is publicly accessible without login

Non-Functional Requirements:
• Location must update every 5 to 10 seconds
• System must handle 100 or more concurrent users
• Web application must be mobile responsive
• Driver login must be secure with encrypted passwords

Tasks:
• Research existing solutions and identify gaps
• List all functional requirements
• List all non-functional requirements
• Write Problem Statement document



DAY 3 —
June 3: Objective Definition**
Deliverable: Project Objectives

Objectives:
• Passengers should be able to track bus location in real-time on a map
• Drivers should be able to send live GPS coordinates through their mobile browser
• Admin should be able to add, edit, and delete buses, routes, and stops
• System should automatically calculate and display estimated arrival time
• Route details and stop list should be visible to all passengers without login
• Application should be mobile-friendly and fast-loading
• System should support multiple buses running on different routes simultaneously

Tasks:
• Extract objectives from gathered requirements
• Write objectives in SMART format (Specific, Measurable, Achievable, Relevant, Time-bound)
• Separate primary objectives from secondary objectives
• Define project scope boundary — what is included and what is excluded




DAY 4 —
June 4: User and Module Identification**
Deliverable: Module List

User Roles:
• Passenger — views bus location and route info on map without login
• Driver — logs in and shares live GPS location
• Admin — manages buses, routes, stops, and driver assignments

Modules:
• Authentication Module — Driver and Admin login and logout
• Live Tracking Module — GPS data sending and live map display
• Route Management Module — add, edit, delete routes and stops
• Bus Management Module — add, edit, delete bus details
• Driver Management Module — register drivers and assign to buses
• Passenger View Module — public map page with no login required
• Admin Dashboard Module — overview statistics and active bus count

Tasks:
• List all user roles and their access levels
• Map features to each role
• Break project into modules with brief descriptions
• Create Module List document




DAY 5 — 
June 5: Use Case Diagram Preparation**
Deliverable: Use Case Diagram

Actors: Passenger, Driver, Admin

Passenger Use Cases:
• View live bus location on map
• View route details and stops
• View estimated arrival time

Driver Use Cases:
• Login to system
• Start live location sharing
• Stop location sharing
• View assigned route

Admin Use Cases:
• Login to system
• Add, edit, and delete buses
• Add, edit, and delete routes and stops
• Assign driver to bus and route
• View dashboard statistics

Tasks:
• List all actors and their use cases
• Draw system boundary box in Draw.io
• Connect actors to use cases with association lines
• Add include and extend relationships where applicable
• Export diagram as PNG
<img width="1143" height="911" alt="UML diagram" src="https://github.com/user-attachments/assets/59450ebf-ea4e-463f-b757-940eb375b5e9" />




DAY 6 —
June 6: Database Requirement Analysis**
Deliverable: Table List

Tables:
1. users — id, name, email, password, role, phone, created_at
2. buses — id, bus_number, capacity, status, created_at
3. routes — id, route_name, start_point, end_point, created_at
4. stops — id, route_id, stop_name, stop_order, latitude, longitude
5. driver_assignments — id, driver_id, bus_id, route_id, assigned_date
6. live_locations — id, bus_id, driver_id, latitude, longitude, timestamp

Relationships:
• users (driver role) to driver_assignments — One to Many
• buses to driver_assignments — One to Many
• routes to stops — One to Many
• buses to live_locations — One to Many

Tasks:
• Finalize all tables and column names
• Define data types for each column
• Mark primary keys and foreign keys
• Note all table relationships



DAY 7 —
June 7: ER Diagram Design
Deliverable: ER Diagram

Entities: users, buses, routes, stops, driver_assignments, live_locations

Tasks:
• Map all 6 entities in Draw.io using rectangle notation
• Add attributes as ovals for each entity
• Draw relationship diamonds between connected entities
• Mark cardinality for each relationship (1:N, M:N)
• Show all foreign key connections clearly
• Export as PNG
<img width="1202" height="807" alt="ER diagram" src="https://github.com/user-attachments/assets/e22a1ea5-5c72-4067-9e6f-f2efbf649069" />





DAY 8 — 
June 8: Database Schema Creation
Deliverable: SQL Schema


CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'driver') NOT NULL,
  phone VARCHAR(15),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE buses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  bus_number VARCHAR(20) NOT NULL UNIQUE,
  capacity INT NOT NULL,
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE routes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  route_name VARCHAR(100) NOT NULL,
  start_point VARCHAR(100) NOT NULL,
  end_point VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE stops (
  id INT AUTO_INCREMENT PRIMARY KEY,
  route_id INT NOT NULL,
  stop_name VARCHAR(100) NOT NULL,
  stop_order INT NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  FOREIGN KEY (route_id) REFERENCES routes(id) ON DELETE CASCADE
);

CREATE TABLE driver_assignments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  driver_id INT NOT NULL,
  bus_id INT NOT NULL,
  route_id INT NOT NULL,
  assigned_date DATE NOT NULL,
  FOREIGN KEY (driver_id) REFERENCES users(id),
  FOREIGN KEY (bus_id) REFERENCES buses(id),
  FOREIGN KEY (route_id) REFERENCES routes(id)
);

CREATE TABLE live_locations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  bus_id INT NOT NULL,
  driver_id INT NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (bus_id) REFERENCES buses(id),
  FOREIGN KEY (driver_id) REFERENCES users(id)
);

Tasks:
• Run the SQL schema in MySQL Workbench and verify no errors
• Save as schema.sql




DAY 9 — 
June 9: UI Wireframe Design
Deliverable: Page Layouts

Pages to Wireframe:
• Passenger Map Page — full screen map with live bus markers (public, no login)
• Login Page — for Admin and Driver
• Admin Dashboard Page
• Bus Management Page — list view with add and edit form
• Route Management Page — list view with add and edit form
• Stop Management Page — list view with add and edit form
• Driver Assignment Page
• Driver Live Tracking Page — driver shares location from this page

Tasks:
• Open Figma and create a new project
• Design low-fidelity wireframe for all 8 pages
• Plan full-screen map layout for the passenger page
• Design admin sidebar navigation structure
• Export wireframe images



DAY 10 —
June 10: Login and Dashboard UI Design
Deliverable: UI Screens

Color Palette:
• Primary: #1565C0 (Transport Blue)
• Accent: #FF6F00 (Bus Orange)
• Background: #F5F5F5 (Light Gray)
• Success: #2E7D32 (Green)
• Text: #212121 (Dark)

Typography: Inter or Roboto, 14px body, 20px headings

Tasks:
• Design Login page with card layout, bus icon, email and password fields, and error state
• Design Admin Dashboard with total buses, active routes, and online drivers stat cards
• Apply Transport Blue and Bus Orange color theme consistently
• Set typography system across all screens
• Export all screens from Figma




DAY 11 —
June 11: Navigation and Form Design
Deliverable: UI Prototype

Tasks:
• Design admin sidebar with icons for Dashboard, Buses, Routes, Stops, and Drivers
• Design top navigation bar with user info and logout button
• Design Bus Management form with bus number, capacity, and status fields
• Design Route Management form with route name, start point, and end point fields
• Design Stop Management form with stop name, order, latitude, and longitude fields
• Design Driver Assignment form with dropdown selects for driver, bus, and route
• Design Driver page with a large Start Sharing Location button and status indicator
• Design Passenger map page with floating bus info card showing route name and ETA
• Link all screens as a clickable prototype in Figma




DAY 12 —
June 12: Design Review
Deliverable: Design Approval

Tasks:
• Check all 8 screens for consistency in font, color, spacing, and button styles
• Verify map page renders correctly on mobile screen size
• Check color contrast for accessibility
• Present full clickable prototype to mentor for review
• Note all feedback and make necessary revisions



DAY 13 — 
June 13: Frontend Environment Setup
Deliverable: React Project Setup


npm create vite@latest transport-tracker -- --template react
cd transport-tracker
npm install
npm install react-router-dom
npm install axios
npm install leaflet react-leaflet
npm install -D tailwindcss @tailwindcss/vite


Folder Structure:

src/
├── components/
│   ├── Map/
│   ├── Navbar/
│   └── Sidebar/
├── pages/
│   ├── PassengerMap.jsx
│   ├── Login.jsx
│   ├── admin/
│   │   ├── Dashboard.jsx
│   │   ├── BusManagement.jsx
│   │   ├── RouteManagement.jsx
│   │   └── DriverAssignment.jsx
│   └── driver/
│       └── LiveTracking.jsx
├── services/
│   └── api.js
└── utils/
    └── auth.js


Tasks:
• Create Vite React project
• Install all required packages
• Set up folder structure as shown above
• Configure Tailwind CSS
• Set up basic routes in App.jsx



DAY 14 — 
June 14: Login Page Development
Deliverable: Login Module

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "admin") navigate("/admin/dashboard");
      else if (res.data.role === "driver") navigate("/driver/tracking");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <div className="text-center mb-6">
          <span className="text-4xl"></span>
          <h1 className="text-2xl font-bold text-blue-800 mt-2">
            Transport Tracker
          </h1>
          <p className="text-gray-500 text-sm">Sign in to your account</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );


Tasks:
• Create Login.jsx and paste the above code
• Add /login route in App.jsx
• Test empty field validation and error message display



DAY 15 — 
June 15: Registration Page Development
Deliverable: Registration Module

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "driver",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getPasswordStrength = (pwd) => {
    if (pwd.length === 0) return "";
    if (pwd.length < 6) return "Weak";
    if (pwd.length < 10) return "Medium";
    return "Strong";
  };

  const strengthColor = {
    Weak: "text-red-500",
    Medium: "text-yellow-500",
    Strong: "text-green-500",
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password || !form.phone) {
      setError("Please fill in all fields");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      await axios.post("/api/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        role: form.role,
      });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const strength = getPasswordStrength(form.password);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <div className="text-center mb-6">
          <span className="text-4xl"></span>
          <h1 className="text-2xl font-bold text-blue-800 mt-2">
            Create Account
          </h1>
          <p className="text-gray-500 text-sm">Register as Driver or Admin</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="driver">Driver</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Minimum 6 characters"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {strength && (
              <p className={`text-xs mt-1 font-medium ${strengthColor[strength]}`}>
                Password Strength: {strength}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-60"
          >
            {loading ? "Registering..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-700 font-medium hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}


Tasks:
• Create Register.jsx and paste the above code
• Add /register route in App.jsx
• Test password strength indicator
• Test confirm password mismatch validation
• Add Register link on the Login page



 Day 16 – Dashboard Development (Jun-16)

On the sixteenth day, the focus was on developing the dashboard interface, which acts as the central hub of the application. The dashboard is one of the most important components because it provides users with a summarized and real-time view of the system.
The dashboard was designed separately for both users (passengers) and admin. For passengers, the dashboard displays key information such as available buses, live tracking options, route summaries, and quick navigation to important features. For administrators, the dashboard provides a broader overview, including total vehicles, active routes, system status, and monitoring tools.
The frontend of the dashboard was developed using modern web technologies such as React (or HTML, CSS, and JavaScript). Components were structured in a modular way to ensure reusability and scalability. Cards, tables, and widgets were used to display information in a clean and organized format.
Special attention was given to integrating real-time data into the dashboard. APIs were prepared to fetch live vehicle data and display it dynamically. This ensures that users always see updated information without needing to refresh the page manually.
User experience (UX) was also considered during development. The dashboard layout was kept simple, intuitive, and responsive so that it can be accessed from both desktop and mobile devices.
By the end of Day 16, a functional dashboard UI was successfully developed, providing a central control panel for users to interact with the system.


 
 Day 17 – CRUD Form Development (Jun-17)
On the seventeenth day, the focus was on implementing CRUD (Create, Read, Update, Delete) operations through forms. These operations are essential for managing system data such as vehicles, routes, stops, and users.
Forms were created for adding new records (Create), viewing existing records (Read), modifying data (Update), and deleting unwanted entries (Delete). Each form was designed with proper input fields, labels, and validation rules to ensure accurate data entry.
For example, the vehicle management form allows admins to add a new vehicle by entering details such as vehicle number, driver name, and capacity. Similarly, route management forms allow adding and updating route details.
Frontend forms were connected to backend APIs using HTTP requests. Data entered by users is sent to the server, processed, and stored in the database. Responses from the server are displayed to users as success or error messages.
Validation was an important part of this phase. Both frontend and backend validations were implemented to prevent invalid data from being stored. For example, empty fields, incorrect formats, and duplicate entries were handled properly.
By the end of Day 17, all CRUD forms were completed and integrated with the backend, allowing full data management functionality in the system.



 Day 18 – Table & Search Features (Jun-18)
On the eighteenth day, the system was enhanced with data table and search functionalities. These features improve usability by allowing users to view and filter large amounts of data efficiently.
Tables were implemented to display structured data such as vehicle lists, route details, and user information. Each table includes columns representing different attributes and rows representing individual records.
To make the tables more interactive, features such as sorting, pagination, and filtering were added. This allows users to navigate through data easily without being overwhelmed.
A search functionality was also implemented, enabling users to quickly find specific records. For example, users can search for a particular bus using its number or find routes based on source and destination.
The search feature works by sending queries to the backend, where data is filtered and returned based on user input. This ensures fast and accurate results.
Additionally, responsive design techniques were applied so that tables can adapt to different screen sizes.
By the end of Day 18, data listing and search features were fully functional, significantly improving user interaction with the system.


 
 Day 19 – Frontend Testing (Jun-19)
On the nineteenth day, the focus was on testing the frontend components to ensure that the application works correctly and provides a smooth user experience.
Different types of testing were performed, including functional testing, UI testing, and usability testing. Each feature of the application, such as login, registration, dashboard, forms, and navigation, was tested individually.
Errors and bugs were identified during testing, such as incorrect data display, broken links, or UI misalignment issues. These issues were fixed to improve the overall quality of the application.
Cross-browser testing was also performed to ensure that the application works consistently across different browsers like Chrome, Edge, and Firefox.
Responsiveness was tested on different screen sizes, including mobile and tablet devices, to ensure that the UI adapts properly.
User feedback was considered to make improvements in design and functionality. This helps in making the system more user-friendly.
By the end of Day 19, the frontend was thoroughly tested and refined, ensuring that it is stable, reliable, and ready for backend integration.

 
 
 Day 20 – Spring Boot Project Setup (Jun-20)
On the twentieth day, the backend development phase was initiated by setting up a Spring Boot project. Spring Boot is a powerful framework used for building robust and scalable backend applications in Java.
The project was initialized using tools like Spring Initializer, and dependencies such as Spring Web, Spring Data JPA, and MySQL Driver were added. The project structure was organized into different layers, including controller, service, and repository.
Configuration files were set up to connect the application with the MySQL database. Properties such as database URL, username, and password were defined.
Basic REST APIs were created to test the setup and ensure that the backend is functioning correctly. These APIs act as a bridge between the frontend and the database.
The server was successfully started, and initial endpoints were tested using tools like Postman.
By the end of Day 20, the backend environment was fully set up and ready for further development, including database connectivity and API creation.




 Day 21 – Database Connectivity (Jun-21)
On the twenty-first day of the project development process, the primary focus was on establishing a strong and reliable connection between the backend application and the database system. This step is extremely important because the entire application depends on data storage and retrieval for its functioning.
A relational database management system, specifically MySQL, was selected for storing all application-related data. This includes information such as vehicle details, route information, bus stops, user data, and real-time tracking updates. The backend application, developed using Spring Boot, was configured to connect with the database using the application.properties file.
Key configurations such as the database URL, username, password, driver class name, and Hibernate dialect were defined carefully. Spring Data JPA was used as the ORM (Object Relational Mapping) tool, which simplifies database interaction by converting Java objects into database records.
Hibernate was configured to automatically create and update database tables based on entity classes. This feature reduced manual database setup efforts. After configuration, the application was executed, and logs were monitored to ensure that the connection was successfully established.
To verify the setup, sample data insertion and retrieval operations were performed. These tests confirmed that the backend could communicate with the database without any issues.
By the end of Day 21, a stable and fully functional database connection was successfully implemented, forming the backbone for further backend development.



Day 22 – Entity & Repository Creation (Jun-22)
On the twenty-second day, the focus shifted to designing the data layer of the application by creating entity classes and repository interfaces.
Entity classes were created to represent database tables. Each entity corresponds to a specific module in the system, such as Vehicle, Route, User, and TrackingData. These classes were annotated with @Entity, and fields were mapped to table columns using annotations like @Column.
Primary keys were defined using @Id and @GeneratedValue. Relationships between entities were also implemented using annotations such as @OneToMany, @ManyToOne, and @JoinColumn. These relationships helped in maintaining data integrity and establishing links between different tables.
Next, repository interfaces were created by extending JpaRepository. These repositories provide built-in methods such as save(), findAll(), findById(), and deleteById(), eliminating the need for writing complex SQL queries.
Custom query methods were also implemented based on naming conventions, such as finding vehicles by route ID or retrieving tracking data based on timestamps.
This structured approach improved code readability and maintainability.
By the end of Day 22, the application’s data layer was completely defined, enabling smooth communication between backend logic and database operations.



Day 23 – REST API Development (Jun-23)
On the twenty-third day, the focus was on building RESTful APIs, which act as a communication bridge between the frontend and backend.
Controller classes were created using the @RestController annotation. These controllers handle incoming HTTP requests and return appropriate responses. APIs were designed for various modules such as vehicles, routes, users, and tracking systems.
Different HTTP methods were used:
GET → Fetch data
POST → Insert new data
PUT → Update existing data
DELETE → Remove data
Each API endpoint was mapped using annotations like @GetMapping, @PostMapping, @PutMapping, and @DeleteMapping.
JSON format was used for data exchange. Request bodies were mapped to Java objects, and responses were returned in structured JSON format.
Error handling mechanisms were also implemented using exception handling to provide meaningful error messages to users.
Testing was performed using Postman to verify API functionality.
By the end of Day 23, a complete set of CRUD APIs was successfully developed, enabling frontend-backend communication.

 
 
 Day 24 – Authentication Module (Jun-24)
On the twenty-fourth day, the focus was on implementing a secure authentication system.
Authentication ensures that only authorized users can access the system. A login module was created where users can enter their credentials (username and password).
Spring Security was used to implement authentication and authorization mechanisms. Passwords were encrypted using hashing techniques before storing them in the database, ensuring data security.
Role-based access control was implemented, where users were assigned roles such as admin and normal user. Admin users have additional privileges like managing vehicles and routes.
Login APIs were developed and integrated with the frontend login page. Token-based authentication (such as JWT) can also be used to maintain user sessions securely.
By the end of Day 24, the system had a secure login and authentication mechanism, protecting user data and application access.


 
 Day 25 – Backend Business Logic (Jun-25)
On the twenty-fifth day, the core backend logic was implemented in the service layer.
Service classes were created to handle all business operations. These classes act as a bridge between controllers and repositories.
Key functionalities implemented include:
Processing real-time tracking data
Assigning vehicles to routes
Calculating estimated arrival times (ETA)
Managing user requests and responses
The logic was designed to be modular and reusable, ensuring scalability of the application.
Data validation rules were also implemented to ensure only valid data is processed and stored.
This layer plays a crucial role in making the system intelligent rather than just a data storage application.
By the end of Day 25, the backend was capable of performing complex operations required for real-time tracking.




 Day 26 – API Testing using Postman (Jun-26)
On the twenty-sixth day, all developed APIs were tested thoroughly using Postman.
Each endpoint was tested by sending different types of requests and analyzing responses. Both positive and negative test cases were considered.
Test scenarios included:
Valid data input
Invalid data input
Missing fields
Unauthorized access
HTTP status codes such as 200, 201, 400, and 404 were verified.
Any bugs or issues identified during testing were fixed immediately. API performance and response time were also evaluated.
A detailed API testing report was prepared, documenting all test cases and results.
By the end of Day 26, all APIs were verified and ensured to be reliable and efficient.



 Day 27 – Frontend & Backend Integration (Jun-27)
On the twenty-seventh day, the frontend and backend were integrated to form a complete working system.
API calls were implemented in the frontend using Axios or Fetch API. Data from the backend was dynamically displayed in the UI.
Features such as login, dashboard, tracking system, and CRUD operations were tested end-to-end.
Integration issues such as incorrect API URLs, data mismatch, and response errors were identified and fixed.
This step ensured seamless communication between frontend and backend.
By the end of Day 27, the application was fully functional as a complete system.




 Day 28 – Bug Fixing & Validation (Jun-28)
On the twenty-eighth day, the focus was on improving system stability by fixing bugs and performing validation.
Various issues were identified and resolved:
UI alignment problems
Backend logic errors
API failures
Data inconsistencies
Validation rules were strengthened in both frontend and backend.
Performance optimizations were also implemented to improve speed and efficiency.
By the end of Day 28, the system was stable, optimized, and ready for final deployment.


PROJECT URL : 
http://127.0.0.1:5500/frontend/index.html
I have uploaded the project url which we can open in the browser to see the frontend which i have developed. 


<img width="1887" height="912" alt="Screenshot 2026-07-06 104657" src="https://github.com/user-attachments/assets/e5681a17-aac7-4e59-8a40-d84be0c46192" />






