# 📖 DeskGuard

**DeskGuard** is a real-time library seat registration and automated session tracking system designed specifically for university environments. By utilizing dynamic QR scanning and automated presence check-ins, the platform ensures fair seating availability, prevents seat hoarding, and provides administrators with precise workspace analytics.

---

## 🎯 Problem Statement & Aim

### The Problem

University libraries frequently face a "ghost seating" crisis: students place books, bags, or belongings on a desk to reserve it, and then leave for hours. This hoarded space remains completely empty and unusable, causing immense frustration for other students who genuinely need a place to study.

### Our Aim

**DeskGuard** aims to eliminate seat hoarding entirely. By forcing an initial QR code verification to lock a seat, checking user presence every 2 hours through a validation prompt, and automatically freeing up abandoned desks, the platform maximizes seating efficiency and creates a fair, transparent environment for everyone.

---

## ✨ Key Features

### Interactive Seating Map

* **Live Grid View:** Provides a real-time, visual floor plan of Floor 1 and Floor 2 layout structures, eliminating the need for students to walk around searching for a spot.
* **Color-Coded Status Indicators:** Desks update dynamically based on real-time database conditions:
  * 🟢 **Green (Free):** Available for immediate use.
  * 🔴 **Red (Occupied):** Active study session running.
  * 🟡 **Yellow (Away):** Temporary break holding window active.

### QR Code Booking System

* **Physical Presence Verification:** Prevents remote seat hoarding from outside the building. Students must visit the vacant desk in person to claim it.
* **Instant Activation:** Scanning the desk's unique QR code triggers a secure database handshake, switching the desk status to *Occupied* and launching the live tracking session.

### Intelligent Away Mode

* **20-Minute Break Window:** Allows students to step away briefly (e.g., washroom or reference stacks) without losing their workspace. 
* **Auto-Release Guard:** Holding the seat toggles its status to Yellow and starts a strict 20-minute countdown. If the student fails to click "I'm Back" in time, the desk is flagged as abandoned and released back to the public.

### 2-Hour Presence Checkpoints

* **Anti-Ghosting Interceptor:** To stop students from leaving bags on chairs for half the day, a verification prompt overrides the active interface exactly every 2 hours.
* **Active Validation:** The student must manually click *"Yes, I am here"* within a short window to confirm physical occupancy and lock their desk allocation.

### Librarian Overrides & Desk Cleansing Queue

* **Violator Notification Queue:** Desks where students fail to answer the 2-hour presence checkpoint are automatically pushed into the Librarian's administrative dashboard.
* **Staff Authorization:** If a student's session expires but their books or belongings are still left on the table, the librarian holds the official authority to physically inspect the desk.
* **One-Click Manual Reset:** With a single click on the admin panel, the librarian clears out the timed-out user data bounds, updates the desk back to *Free* (Green) in PostgreSQL, and opens it up for the next waiting student.

---

## 🛠️ Technical Stack

The architecture is split into a completely separate frontend web interface and a secure, relational database backend configuration:

* **Frontend Client:** React.js (Vite), JavaScript (ES6+), Inline CSS, HTML5.
* **Backend Server:** Node.js, Express.js, `pg` (Native PostgreSQL client).
* **Database:** PostgreSQL (Relational Database Management System).
* **Version Control:** Git & GitHub.

---

## 🗄️ Database Schema Design

The system maps data logically across three separate relational tables inside PostgreSQL using primary keys (`PK`) and foreign keys (`FK`):

* **`users` Table:** Stores unique profiles. Contains `id` (PK), `uin` (Unique), `name`, `email` (Unique), `mobile`, `dob`, `password`, and `role`.

* **`desks` Table:** Tracks the live status of the physical environment. Contains `id` (PK), `desk_number` (Unique), and `status` (defaults to 'free').

* **`bookings` Table:** Handles the relational bridge between students and desks. Contains `id` (PK), `user_id` (FK referencing `users.id`), `desk_id` (FK referencing `desks.id`), `status`, `started_at`, `expires_at`, and `last_ping_at`.

---

## 🗺️ User Flow & Architecture

### 1. Registration & Authentication

To create an account or register on the system, users simply enter their **Full Name**, **Institutional Email**, **University ID / UIN (College ID)**, **Mobile Number**, **Date of Birth**, and a secure **Password**. Users choose their designated role card (Student or Librarian) to authenticate directly against the PostgreSQL `users` table registry.

### 2. Role-Based Portals & Dynamic Themes

* **Student Dashboard (Emerald Green - `#16A34A`):** Focused on a calm, eye-safe environment for tracking study goals.
* **Library Staff Portal (Terracotta Red - `#DC2626`):** Focused on clear administrative diagnostics and viewing every desk. They hold the administrative authority to free any desk manually from the system dashboard.

### 3. Seating Lifecycle & Live Timers

1. **Find a Desk:** The student visits the **Library Map** tab and selects a green (Free) desk node on Floor 1 or Floor 2.
2. **Scan QR Code:** The app redirects the student to the camera scanner interface to simulate scanning the desk's location asset.
3. **Start Studying:** The desk switches to *Occupied* across the university network. A live background engine accumulates study metrics second-by-second.
4. **Away Mode Feature:** If a student needs to take a short break (e.g., washroom or reference stacks), they can activate **Away Mode**. This holds their seat position and starts a strict 20-minute countdown timer. If the student returns and clicks "I'm Back" before the timer expires, their session resumes normally. If the clock runs out, the seat is flagged as *Abandoned*, released back to the general student public, and the session is terminated.
5. **Safety Checkpoint:** Every 2 hours, a validation prompt forces the student to click "Yes, I am here." Unverified sessions are safely released to prevent ghost reservations.
6. **Leave Seat:** Clicking "End Session" updates the student's personal study row columns inside the database.

---

## 🤖 AI Collaboration Attribution

Designed and built by me, with AI (Gemini) assisting throughout the implementation and debugging phases. The AI helped accelerate the development lifecycle by troubleshooting edge cases, refining the PostgreSQL connection pool logic, and ensuring smooth frontend-backend integration.