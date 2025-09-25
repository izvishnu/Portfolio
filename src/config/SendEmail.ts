// SendEmail.ts - Vishnu R's Contact Form Handler
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    const emailData = {
      from: 'noreply@vishnur.dev', // Update this to match your verified domain
      to: 'rvishnu363@gmail.com',
      subject: `Portfolio Contact: ${name} wants to connect`,
      replyTo: email, // Changed from reply_to to replyTo
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
            New Portfolio Contact Form Submission
          </h2>
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0;"><strong>From:</strong> ${name}</p>
            <p style="margin: 0 0 10px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 0 0 10px 0;"><strong>Sent via:</strong> vishnur.dev portfolio</p>
          </div>
          <h3 style="color: #374151;">Message:</h3>
          <div style="background: white; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <p style="line-height: 1.6; color: #374151;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 12px;">
            This email was sent from your portfolio contact form at vishnur.dev
          </p>
        </div>
      `,
      text: `Portfolio Contact Form Submission

From: ${name}
Email: ${email}
Sent via: vishnur.dev portfolio

Message:
${message}

---
This email was sent from your portfolio contact form.`,
    };

    const { data, error } = await resend.emails.send(emailData);

    if (error) {
      console.error('Resend API error:', error);
      return NextResponse.json({ 
        error: 'Failed to send message. Please try again or contact directly at rvishnu363@gmail.com' 
      }, { status: 500 });
    }

    console.log('Email sent successfully to Vishnu R:', data);
    return NextResponse.json({ 
      message: 'Thank you for reaching out! Vishnu will get back to you soon.',
      success: true 
    }, { status: 200 });

  } catch (error) {
    console.error('Server error in contact form:', error);
    return NextResponse.json({ 
      error: 'Something went wrong. Please contact directly at rvishnu363@gmail.com' 
    }, { status: 500 });
  }
}