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
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: parseInt(process.env.EMAIL_SERVER_PORT || '587', 10),
      secure: process.env.EMAIL_SERVER_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_SERVER_USER, // generated ethereal user
        pass: process.env.EMAIL_SERVER_PASSWORD, // generated ethereal password
      },
    });

    // Get current timestamp and format it in British style
    const now = new Date();
    const timestamp = now.toLocaleString('en-GB', { timeZone: 'Europe/London' });

    // Construct the email content for revans@axonic.co.uk
    let adminEmailContent = `
Timestamp: ${timestamp}
Name: ${firstName} ${lastName}
Email: ${email}
`;

    if (phoneNumber) {
        adminEmailContent += `Phone Number: ${phoneNumber}\n`; // Include phone number if provided
    }

    adminEmailContent += `Pledge Type: ${pledgeType}\n`;

    if (pledgeType === 'money') {
      adminEmailContent += `Pledge Amount: £${pledgeAmount}\n`;
    } else if (pledgeType === 'services') {
      adminEmailContent += `Service Details: ${serviceDetails}\n`;
    }

    if (message) {
      adminEmailContent += `Message: ${message}\n`;
    }

    // Send email to revans@axonic.co.uk
    const adminMailOptions = {
      from: process.env.EMAIL_FROM, // sender address
      to: 'revans@axonic.co.uk', // list of receivers
      subject: 'New Pledge Received from Friends of the Maypole Website', // Subject line
      text: adminEmailContent, // plain text body
    };

    await transporter.sendMail(adminMailOptions);

    // Construct the confirmation email content for the user
    let userEmailContent = `
Dear ${firstName},

Thank you for your pledge to help save Maypole Piece!

Below are the details of your pledge:

`;

    userEmailContent += `Name: ${firstName} ${lastName}\n`;
    userEmailContent += `Email: ${email}\n`;
    if (phoneNumber) {
        userEmailContent += `Phone Number: ${phoneNumber}\n`;
    }
    userEmailContent += `Pledge Type: ${pledgeType}\n`;
    if (pledgeType === 'money') {
        userEmailContent += `Pledge Amount: £${pledgeAmount}\n`;
    } else if (pledgeType === 'services') {
        userEmailContent += `Service Details: ${serviceDetails}\n`;
    }
    if (message) {
        userEmailContent += `Message: ${message}\n`;
    }

    userEmailContent += `\nTimestamp: ${timestamp}\n`; // Add timestamp to user email as well

    userEmailContent += `\nYour support is greatly appreciated. The Friends Of The Maypole Piece team will be in touch shortly.\n\nBest regards,\nFriends Of The Maypole Piece
`;

    // Send confirmation email to the user
    const userMailOptions = {
        from: process.env.EMAIL_FROM, // sender address
        to: email, // user's email address
        subject: 'Thank You for Your Pledge to Friends of the Maypole Piece', // Subject line
        text: userEmailContent, // plain text body
    };

    await transporter.sendMail(userMailOptions);

    return NextResponse.json({ message: 'Pledge received successfully and confirmation email sent!' }, { status: 200 });
  } catch (error) {
    console.error('Error sending pledge email:', error);
    return NextResponse.json({ message: 'Failed to send pledge.', error: error }, { status: 500 });
  }
} 