import React from 'react';
import "../index.css";

const Contact = () => {
  return (
    <div className="">
      <h2 className="loginpage" style={{ fontFamily: "Playfair Display", fontSize: "41px", color: "white" }}>Contact Us</h2>
      <div className="contact-container flex gap-20 justify-center self-center mt-[15px] border border-[color:var(--secondary-brown)] rounded-[var(--border-radius)] p-8">
        <div className="contactInfo flex flex-col items-center mt-[15px] border border-[color:var(--secondary-brown)] rounded-[var(--border-radius)] p-4 leading-snug text-s">
          <h2>Tuleleke Nursery</h2>
          <p>Front Desk: 555-555-5555</p>
          <p>Scheduling: 555-555-5555</p>
          <p>Delivery: 555-555-5555</p>
          <p>Email: <a href="mailto:info@example.com">info@example.com</a></p>
        </div>
        <div className="contactInfo flex flex-col items-center mt-[15px] border border-[color:var(--secondary-brown)] rounded-[var(--border-radius)] p-4 text-s">
          <h2>Macdoel</h2>
          <p>Front Desk: 555-555-5555</p>
          <p>Scheduling: 555-555-5555</p>
          <p>Delivery: 555-555-5555</p>
          <p>Email: <a href="mailto:info@example.com">info@example.com</a></p>
        </div>
        <div className="contactInfo flex flex-col items-center mt-[15px] border border-[color:var(--secondary-brown)] rounded-[var(--border-radius)] p-4 text-s">
          <h2>Susanville</h2>
          <p>Front Desk: 555-555-5555</p>
          <p>Scheduling: 555-555-5555</p>
          <p>Delivery: 555-555-5555</p>
          <p>Email: <a href="mailto:info@example.com">info@example.com</a></p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
