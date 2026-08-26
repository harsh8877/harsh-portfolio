import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Basic server-side validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    if (message.trim().length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters." },
        { status: 400 }
      );
    }

    // Create Gmail SMTP transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD, // Gmail App Password (not your main password)
      },
    });

    // --- Email 1: Notification to YOU (Harsh) ---
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `📬 New Portfolio Message from ${name}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>New Contact Message</title>
        </head>
        <body style="margin:0;padding:0;background:#0a0a1a;font-family:'Segoe UI',Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a1a;padding:40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background:#11112b;border-radius:20px;border:1px solid #242456;overflow:hidden;max-width:600px;width:100%;">
                  <!-- Header -->
                  <tr>
                    <td style="background:linear-gradient(135deg,#6c5ce7,#00d4ff);padding:30px 40px;text-align:center;">
                      <p style="margin:0 0 6px;color:rgba(255,255,255,0.8);font-size:13px;letter-spacing:2px;text-transform:uppercase;">Portfolio Contact</p>
                      <h1 style="margin:0;color:#fff;font-size:26px;font-weight:700;">New Message Received 📬</h1>
                    </td>
                  </tr>
                  <!-- Body -->
                  <tr>
                    <td style="padding:36px 40px;">
                      <!-- Sender Info -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                        <tr>
                          <td width="50%" style="padding-right:10px;">
                            <div style="background:#18183d;border-radius:12px;padding:18px 20px;border:1px solid #242456;">
                              <p style="margin:0 0 4px;color:#94a3b8;font-size:11px;text-transform:uppercase;letter-spacing:1px;">From</p>
                              <p style="margin:0;color:#fff;font-size:16px;font-weight:600;">${name}</p>
                            </div>
                          </td>
                          <td width="50%" style="padding-left:10px;">
                            <div style="background:#18183d;border-radius:12px;padding:18px 20px;border:1px solid #242456;">
                              <p style="margin:0 0 4px;color:#94a3b8;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Email</p>
                              <a href="mailto:${email}" style="color:#00d4ff;font-size:14px;text-decoration:none;font-weight:500;">${email}</a>
                            </div>
                          </td>
                        </tr>
                      </table>
                      <!-- Message -->
                      <div style="background:#18183d;border-radius:12px;padding:24px;border:1px solid #242456;border-left:4px solid #6c5ce7;margin-bottom:28px;">
                        <p style="margin:0 0 12px;color:#94a3b8;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Message</p>
                        <p style="margin:0;color:#e2e8f0;font-size:15px;line-height:1.7;white-space:pre-wrap;">${message}</p>
                      </div>
                      <!-- CTA -->
                      <div style="text-align:center;">
                        <a href="mailto:${email}?subject=Re: Your portfolio inquiry&body=Hi ${name},%0A%0A" 
                           style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#6c5ce7,#00d4ff);color:#fff;text-decoration:none;border-radius:12px;font-weight:600;font-size:15px;">
                          Reply to ${name} →
                        </a>
                      </div>
                    </td>
                  </tr>
                  <!-- Footer -->
                  <tr>
                    <td style="background:#0a0a1a;padding:20px 40px;text-align:center;border-top:1px solid #242456;">
                      <p style="margin:0;color:#475569;font-size:12px;">Sent from your portfolio at harshvasoya.dev • ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    // --- Email 2: Auto-reply to the SENDER ---
    await transporter.sendMail({
      from: `"Harsh Vasoya" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Thanks for reaching out, ${name}! ✨`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        </head>
        <body style="margin:0;padding:0;background:#f8fafc;font-family:'Segoe UI',Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:20px;border:1px solid #e2e8f0;overflow:hidden;max-width:600px;width:100%;">
                  <tr>
                    <td style="background:linear-gradient(135deg,#6c5ce7,#00d4ff);padding:30px 40px;text-align:center;">
                      <h1 style="margin:0;color:#fff;font-size:26px;font-weight:700;">Hi ${name}! 👋</h1>
                      <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:15px;">Thanks for getting in touch</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:36px 40px;">
                      <p style="margin:0 0 20px;color:#334155;font-size:16px;line-height:1.7;">
                        Thank you for reaching out through my portfolio! I've received your message and will get back to you within <strong>24 hours</strong>.
                      </p>
                      <div style="background:#f8fafc;border-radius:12px;padding:20px 24px;border:1px solid #e2e8f0;border-left:4px solid #6c5ce7;margin-bottom:24px;">
                        <p style="margin:0 0 8px;color:#94a3b8;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Your message</p>
                        <p style="margin:0;color:#475569;font-size:14px;line-height:1.7;font-style:italic;">"${message}"</p>
                      </div>
                      <p style="margin:0 0 28px;color:#64748b;font-size:14px;line-height:1.6;">
                        In the meantime, feel free to check out my work or connect with me on LinkedIn.
                      </p>
                      <div style="text-align:center;margin-bottom:28px;">
                        <a href="https://github.com/harsh8877" style="display:inline-block;margin:0 8px;padding:12px 24px;background:#0f172a;color:#fff;text-decoration:none;border-radius:10px;font-size:14px;font-weight:500;">GitHub</a>
                        <a href="https://linkedin.com/in/harsh-vasoya-459b7722a" style="display:inline-block;margin:0 8px;padding:12px 24px;background:#0077b5;color:#fff;text-decoration:none;border-radius:10px;font-size:14px;font-weight:500;">LinkedIn</a>
                      </div>
                      <p style="margin:0;color:#334155;font-size:15px;">Warm regards,<br/><strong>Harsh Vasoya</strong><br/><span style="color:#6c5ce7;font-size:13px;">MERN Stack Developer</span></p>
                    </td>
                  </tr>
                  <tr>
                    <td style="background:#f8fafc;padding:20px 40px;text-align:center;border-top:1px solid #e2e8f0;">
                      <p style="margin:0;color:#94a3b8;font-size:12px;">This is an automated reply from Harsh Vasoya's portfolio</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    return NextResponse.json(
      { success: true, message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
