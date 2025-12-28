# Email Setup Instructions

Your order system now sends confirmation emails to customers! Follow these steps to enable email sending:

## Quick Fix for Domain Error

The error you encountered happens because Resend requires domain verification for custom emails. Here's the solution:

### Use Resend's Test Email (Works Immediately)

The code is now configured to use `onboarding@resend.dev` which works without domain verification.

**Steps:**
1. Go to [resend.com](https://resend.com) and sign up (free - 100 emails/day)
2. Get your API key from Settings → API Keys
3. Add to your Vercel project:
   - Go to Vars section in the v0 sidebar
   - Add: `RESEND_API_KEY` = your_api_key_here
4. Test your order - emails will now send successfully!

### Use Your Own Domain (Optional - For Production)

If you want emails from your own domain like `noreply@yourstore.com`:

1. In Resend dashboard, go to Domains
2. Add your domain and verify it (follow their DNS instructions)
3. Once verified, update your environment variable:
   - `SENDER_EMAIL` = noreply@yourstore.com

## Alternative: Gmail SMTP

If you prefer Gmail, update the `sendCustomerEmail` function in `app/api/submit-order/route.ts`:

```typescript
async function sendCustomerEmail(orderData: any) {
  const nodemailer = require('nodemailer');
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD, // Use App Password, not regular password
    },
  });

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: orderData.email,
    subject: `Order Confirmation - ${orderData.orderNumber}`,
    html: emailHtml, // Use the same HTML template
  });
}
```

Then add these environment variables:
- `GMAIL_USER` = your-email@gmail.com
- `GMAIL_APP_PASSWORD` = your_app_password (from Google Account settings)

## What's Been Fixed

- Owner email now shows complete customer information (no more "undefined")
- Customer emails are ready to send (just add RESEND_API_KEY)
- Orders won't fail if email sending fails (non-blocking)
- Uses Resend's test domain to avoid verification issues

## Testing

After adding RESEND_API_KEY, place a test order and verify:
1. Owner receives email with complete customer details
2. Customer receives beautiful confirmation email
3. Email includes payment instructions and order tracking info
