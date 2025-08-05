import sql from "better-sqlite3";

const db: any = sql("booking.db");

db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    password TEXT
  );
`);

db.exec(`CREATE TABLE IF NOT EXISTS sessions (
  id TEXT NOT NULL PRIMARY KEY,
  expires_at INTEGER NOT NULL,
  user_id TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
)`);

db.exec(`
  CREATE TABLE IF NOT EXISTS rooms (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    address TEXT NOT NULL,
    location TEXT ,
    availability TEXT NOT NULL,
    sqft TEXT,
    capacity TEXT,
    price_per_hour TEXT NOT NULL,
    amenities TEXT,
    image TEXT NOT NULL
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS bookings (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    room_id TEXT NOT NULL,
    check_in DATETIME NOT NULL,
    check_out DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (room_id) REFERENCES rooms(id)
  );
`);

// const hasRooms =
//   db.prepare("SELECT COUNT(*) as count FROM rooms").get().count > 0;

// if (!hasRooms) {
//   db.exec(`
//   INSERT INTO rooms (id, user_id, name, description, sqft, capacity, location, address, amenities, availability, price_per_hour, image)
//   VALUES
//   ('1', '1', 'Grand Conference Hall', 'A spacious room with modern amenities, suitable for large conferences and events.', 3000, 100, 'Building A, 3rd Floor', '555 California St, San Francisco, CA 94104', 'Projector, Whiteboard, Video Conferencing, Wi-Fi, Sound System', '9 AM - 5 PM', 150, 'room-1.jpg'),
//   ('2', '1', 'Executive Meeting Room', 'Ideal for executive meetings and small group discussions.', 500, 8, 'Building B, 2nd Floor', '100 Park Ave, New York, NY 10017', 'Conference Phone, Whiteboard, Wi-Fi', '8 AM - 6 PM', 100, 'room-2.jpg'),
//   ('3', '1', 'Creative Hub', 'A vibrant space designed for brainstorming sessions and creative workshops.', 800, 15, 'Building C, 1st Floor', '1600 Amphitheatre Parkway, Mountain View, CA 94043', 'Whiteboard, Television, Wi-Fi', '10 AM - 4 PM', 80, 'room-3.jpg'),
//   ('4', '2', 'Training Room', 'Equipped with the latest technology, perfect for training sessions and workshops.', 1500, 50, 'Building D, Ground Floor', '1 Microsoft Way, Redmond, WA 98052', 'Projector, Computers, Wi-Fi', '9 AM - 6 PM', 120, 'room-4.jpg'),
//   ('5', '2', 'Quiet Meeting Room', 'A small, quiet space ideal for private meetings and interviews.', 200, 10, 'Building E, 4th Floor', '10 Downing St, Westminster, London SW1A 2AA, United Kingdom', 'Conference Phone, Television, Wi-Fi', '7 AM - 7 PM', 60, 'room-5.jpg');
// `);
// }

export default db;
