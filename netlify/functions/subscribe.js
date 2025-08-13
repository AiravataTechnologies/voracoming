const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { email, recipientEmail } = JSON.parse(event.body || '{}');
    
    if (!email || !recipientEmail) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error: 'Email and recipient email are required' }),
      };
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || !emailRegex.test(recipientEmail)) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error: 'Invalid email format' }),
      };
    }
    
    // Log the subscription
    console.log(`📧 Email subscription received:
      User Email: ${email}
      Recipient: ${recipientEmail}
      Timestamp: ${new Date().toISOString()}
      IP: ${event.headers['x-forwarded-for'] || event.headers['client-ip']}`);

    // Get email credentials from environment variables
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
      console.log('Email credentials not configured, subscription logged only');
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          success: true, 
          message: "Thank you for subscribing! We'll notify you when we launch." 
        }),
      };
    }

    // Configure Gmail transporter with environment variables
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass
      }
    });

    const mailOptions = {
      from: `"Coming Soon Page" <${emailUser}>`,
      to: recipientEmail,
      subject: 'New Email Subscription from Coming Soon Page',
      html: `
        <h2>🎉 New Email Subscription</h2>
        <p>A new user has subscribed for notifications on your Coming Soon page:</p>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin: 8px 0;"><strong>📧 Email:</strong> ${email}</li>
            <li style="margin: 8px 0;"><strong>🕒 Timestamp:</strong> ${new Date().toLocaleString()}</li>
            <li style="margin: 8px 0;"><strong>🌐 IP Address:</strong> ${event.headers['x-forwarded-for'] || event.headers['client-ip']}</li>
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
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        success: true, 
        message: "Thank you for subscribing! We'll notify you when we launch." 
      }),
    };
    
  } catch (error) {
    console.error('Email subscription error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};