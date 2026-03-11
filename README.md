# Intervia – Interview Booking Frontend

A single-page Angular application that allows candidates to register, browse available interview slots, book an interview, and manage their booking.

---

## Features

- **Candidate Registration / Login** – Register with name, email, and phone number, or look up an existing account by email.
- **Browse Interview Slots** – View all slots with interviewer details, start/end times, and current status.
- **Filter Slots** – Filter the slot list by status: All, Available, Booked, or Expired.
- **Book an Interview** – Select an available slot and confirm the booking through a modal dialog.
- **Manage Bookings** – View your active booking and cancel it if needed.
- **Session Persistence** – Candidate data is stored in `localStorage` so the session survives a page refresh.

---

## Tech Stack

| Category        | Technology                        |
|-----------------|-----------------------------------|
| Framework       | Angular 21.1 (standalone components) |
| Language        | TypeScript 5.9                    |
| Styling         | Tailwind CSS 4.1                  |
| Reactive Layer  | RxJS 7.8                          |
| HTTP            | Angular HttpClient                |
| Routing         | Angular Router (lazy-loaded pages)|
| Testing         | Vitest 4.0 + jsdom                |
| Build Tool      | Angular CLI 21.1.5                |

---

## Prerequisites

- **Node.js** 20 or later
- **npm** 11 or later
- The [Intervia backend API](http://localhost:8080) must be running before starting the frontend

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/DulaniWanigasekara/intervia-interview-booking-frontend.git
cd intervia-interview-booking-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the API URL

The backend base URL is set in `src/environment/environment.ts`:

```typescript
export const environment = {
  apiUrl: 'http://localhost:8080/api'
};
```

Update this value if your backend runs on a different host or port.

### 4. Start the development server

```bash
npm start
```

Open your browser and navigate to `http://localhost:4200/`. The application reloads automatically when source files change.

---

## Available Scripts

| Command           | Description                                       |
|-------------------|---------------------------------------------------|
| `npm start`       | Start the development server on `localhost:4200`  |
| `npm run build`   | Compile the app; output goes to `dist/`           |
| `npm run watch`   | Build in watch mode (rebuilds on file changes)    |
| `npm test`        | Run unit tests with Vitest                        |

---

## Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── models/          # TypeScript interfaces (Candidate, Slot, Booking)
│   │   └── services/        # HTTP services (CandidateService, SlotService, BookingService)
│   ├── pages/
│   │   ├── home/            # Candidate registration / login page
│   │   ├── slots/           # Browse and book interview slots
│   │   └── my-booking/      # View and cancel the candidate's booking
│   ├── shared/
│   │   └── components/
│   │       ├── topbar/      # Navigation header
│   │       ├── book-modal/  # Booking confirmation dialog
│   │       ├── cancel-modal/# Cancellation confirmation dialog
│   │       └── status-badge/# Slot status indicator
│   ├── app.ts               # Root component
│   ├── app.routes.ts        # Route definitions
│   └── app.config.ts        # Application providers
├── environment/
│   └── environment.ts       # API base URL configuration
├── main.ts                  # Application bootstrap
└── index.html               # HTML entry point
```

---

## API Endpoints

The frontend communicates with the following REST endpoints:

| Method  | Endpoint                            | Description                        |
|---------|-------------------------------------|------------------------------------|
| `POST`  | `/api/candidates`                   | Register a new candidate           |
| `GET`   | `/api/candidates/email/{email}`     | Look up a candidate by email       |
| `GET`   | `/api/slots`                        | Fetch all interview slots          |
| `POST`  | `/api/bookings`                     | Create a booking                   |
| `GET`   | `/api/bookings/candidate/{id}`      | Get bookings for a candidate       |
| `PATCH` | `/api/bookings/{id}/cancel`         | Cancel a booking                   |

---

## License

This project is for demonstration purposes.
