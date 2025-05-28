import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const { firstName, lastName, email, pledgeType, pledgeAmount, serviceDetails, message, phoneNumber } = formData;

    // Basic validation (email is required)
    if (!email) {
      return NextResponse.json({ message: 'Email is required.' }, { status: 400 });
    }

    // Create a Nodemailer transporter using your email service details
    console.log('Email environment variables:');
    console.log('EMAIL_SERVER_HOST:', process.env.EMAIL_SERVER_HOST);
    console.log('EMAIL_SERVER_PORT:', process.env.EMAIL_SERVER_PORT);
    console.log('EMAIL_SERVER_SECURE:', process.env.EMAIL_SERVER_SECURE);
    console.log('EMAIL_SERVER_USER:', process.env.EMAIL_SERVER_USER);
    console.log('EMAIL_FROM:', process.env.EMAIL_FROM); // Note: Avoid logging the password directly for security

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: process.env.EMAIL_SERVER_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    // Verify transporter configuration
    try {
      await transporter.verify();
      console.log('SMTP connection verified successfully');
    } catch (verifyError) {
      console.error('SMTP connection verification failed:', verifyError);
      throw verifyError;
    }

    // Get current timestamp and format it in British style
    const now = new Date();
    const timestamp = now.toLocaleString('en-GB', { timeZone: 'Europe/London' });

    // Construct the email content for revans@axonic.co.uk
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>New Pledge Received</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
          .header { text-align: center; margin-bottom: 20px; }
          .content { margin-bottom: 20px; }
          .footer { text-align: center; color: #777; font-size: 0.9em; margin-top: 20px; border-top: 1px solid #eee; padding-top: 15px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Pledge Received</h2>
          </div>
          <div class="content">
            <p><strong>Timestamp:</strong> ${timestamp}</p>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phoneNumber ? `<p><strong>Phone Number:</strong> ${phoneNumber}</p>` : ''}
            <p><strong>Pledge Type:</strong> ${pledgeType}</p>
            ${pledgeType === 'money' ? `<p><strong>Pledge Amount:</strong> £${pledgeAmount}</p>` : ''}
            ${pledgeType === 'services' ? `<p><strong>Service Details:</strong> ${serviceDetails}</p>` : ''}
            ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
          </div>
          <div class="footer">
            <p>This is an automated email, please do not reply directly.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email to revans@axonic.co.uk
    const adminMailOptions = {
      from: process.env.EMAIL_FROM, // sender address
      to: 'revans@axonic.co.uk', // list of receivers
      subject: 'New Pledge Received from Friends of the Maypole Website', // Subject line
      html: adminEmailHtml, // html body
    };

    await transporter.sendMail(adminMailOptions);

    // Construct the confirmation email content for the user
    const userEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Thank You for Your Pledge</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
          .header { text-align: center; margin-bottom: 20px; }
          .content { margin-bottom: 20px; }
          .footer { text-align: center; color: #777; font-size: 0.9em; margin-top: 20px; border-top: 1px solid #eee; padding-top: 15px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Thank You for Your Pledge!</h2>
          </div>
          <div class="content">
            <p>Dear ${firstName},</p>
            <p>Thank you for your pledge to help save Maypole Piece!</p>
            <p>Below are the details of your pledge:</p>
            <ul>
              <li><strong>Name:</strong> ${firstName} ${lastName}</li>
              <li><strong>Email:</strong> ${email}</li>
              ${phoneNumber ? `<li><strong>Phone Number:</strong> ${phoneNumber}</li>` : ''}
              <li><strong>Pledge Type:</strong> ${pledgeType}</li>
              ${pledgeType === 'money' ? `<li><strong>Pledge Amount:</strong> £${pledgeAmount}</li>` : ''}
              ${pledgeType === 'services' ? `<li><strong>Service Details:</strong> ${serviceDetails}</li>` : ''}
              ${message ? `<li><strong>Message:</strong> ${message}</li>` : ''}
            </ul>
            <p>Your support is greatly appreciated. The Friends Of The Maypole Piece team will be in touch shortly.</p>
            <p>Timestamp: ${timestamp}</p>
          </div>
          <div class="footer">
            <p>Best regards,<br>Friends Of The Maypole Piece</p>
            <p>This is an automated email, please do not reply directly.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send confirmation email to the user
    const userMailOptions = {
        from: process.env.EMAIL_FROM, // sender address
        to: email, // user's email address
        subject: 'Thank You for Your Pledge to Friends of the Maypole Piece', // Subject line
        html: userEmailHtml, // html body
    };

    await transporter.sendMail(userMailOptions);

    return NextResponse.json({ message: 'Pledge received successfully and confirmation email sent!' }, { status: 200 });
  } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
    console.error('Error sending pledge email:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    return NextResponse.json({ 
      message: 'Failed to send pledge.', 
      error: error.message,
      code: error.code 
    }, { status: 500 });
  }
} 