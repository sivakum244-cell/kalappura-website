const http = require('http');

const data = JSON.stringify({
  guestName: "Test Guest",
  mobile: "+91 9895053528",
  email: "test@example.com",
  country: "India",
  checkIn: "2026-08-01",
  checkOut: "2026-08-02",
  eta: "12:00",
  adults: 2,
  children: 0,
  infants: 0,
  roomType: "standard-cabin",
  numberOfRooms: 1,
  foodRequirements: ["Vegetarian"],
  foodAllergyDetails: "",
  specialRequests: ["Honeymoon Decoration"],
  additionalNotes: "Test booking",
  paymentPreference: "pay-at-property",
  termsAccepted: true
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/bookings',
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) }
};

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Response:', body);
  });
});
req.on('error', e => console.log('Error:', e.message));
req.write(data);
req.end();
