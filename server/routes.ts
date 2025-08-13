import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import nodemailer from "nodemailer";

export async function registerRoutes(app: Express): Promise<Server> {
  // Email subscription endpoint
  app.post("/api/subscribe", async (req, res) => {
    try {
      const { email, recipientEmail } = req.body;
      
      if (!email || !recipientEmail) {
        return res.status(400).json({ error: "Email and recipient email are required" });
      }
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email) || !emailRegex.test(recipientEmail)) {
        return res.status(400).json({ error: "Invalid email format" });
      }
      
      // Log the subscription
      console.log(`📧 Email subscription received:
        User Email: ${email}
        Recipient: ${recipientEmail}
        Timestamp: ${new Date().toISOString()}
        IP: ${req.ip || req.connection.remoteAddress}`);

      // Configure Gmail transporter with your credentials
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'raneaniket23@gmail.com',
          pass: 'bacnckysycnwedju'
        }
      });

      const mailOptions = {
        from: '"Coming Soon Page" <raneaniket23@gmail.com>',
        to: recipientEmail,
        subject: 'New Email Subscription from Coming Soon Page',
        html: `
          <h2>🎉 New Email Subscription</h2>
          <p>A new user has subscribed for notifications on your Coming Soon page:</p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="margin: 8px 0;"><strong>📧 Email:</strong> ${email}</li>
              <li style="margin: 8px 0;"><strong>🕒 Timestamp:</strong> ${new Date().toLocaleString()}</li>
              <li style="margin: 8px 0;"><strong>🌐 IP Address:</strong> ${req.ip || req.connection.remoteAddress}</li>
            </ul>
          </div>
          <p>This user will be notified when you launch your website!</p>
          <hr>
          <p style="color: #666; font-size: 12px;">This email was sent automatically from your Coming Soon page subscription system.</p>
        `
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent successfully to ${recipientEmail}`);
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Still return success to user, but log the error
      }
      
      res.json({ 
        success: true, 
        message: "Thank you for subscribing! We'll notify you when we launch." 
      });
      
    } catch (error) {
      console.error("Email subscription error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
