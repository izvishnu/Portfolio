import { Resend } from "resend";
import { redirect } from 'next/navigation';

// EMAIL SENDING FUNCTIONALITY 
// ADD RESEND_API_KEY IN YOUR .ENV FILE 
const resend = new Resend(process.env.RESEND_API_KEY);

export const SendEmail = async (formdata: FormData) => {
  // Check if API key is available
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set in environment variables");
    throw new Error("Email service is not configured properly");
  }

  const message = formdata.get("message") as string;
  const name = formdata.get("name") as string;
  const SenderEmail = formdata.get("SenderEmail") as string;
  
  // Validate required fields
  if (!message || !name || !SenderEmail) {
    console.error("Missing required fields:", { 
      message: !!message, 
      name: !!name, 
      SenderEmail: !!SenderEmail 
    });
    throw new Error("All fields are required");
  }

  try {
    const result = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: "rvishnu363@gmail.com",
      subject: `${name} From Contact Form`,
      replyTo: SenderEmail,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${SenderEmail}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
        </div>
      `,
      text: `New Contact Form Submission\n\nName: ${name}\nEmail: ${SenderEmail}\n\nMessage:\n${message}`,
    });

    console.log("Email sent successfully:", result.data?.id);
    
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }

  redirect('/');
};