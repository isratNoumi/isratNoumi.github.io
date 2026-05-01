# EmailJS Setup Instructions

To receive contact form messages in your email, follow these steps:

## 1. Create an EmailJS Account
- Go to [https://www.emailjs.com/](https://www.emailjs.com/)
- Sign up for a free account

## 2. Add an Email Service
- In the EmailJS dashboard, go to "Email Services"
- Click "Add New Service"
- Choose your email provider (Gmail, Outlook, etc.)
- Connect your email account
- Note the **Service ID**

## 3. Create an Email Template
- Go to "Email Templates"
- Click "Create New Template"
- Use these template variables:
  ```
  From: {{from_name}} ({{from_email}})
  To: {{to_name}}
  
  Message:
  {{message}}
  ```
- Save the template and note the **Template ID**

## 4. Get Your Public Key
- Go to "Account" → "General"
- Find your **Public Key**

## 5. Update ContactSection.tsx
Replace these placeholders in `src/components/portfolio/ContactSection.tsx`:
```typescript
const serviceId = 'YOUR_SERVICE_ID'      // Replace with your Service ID
const templateId = 'YOUR_TEMPLATE_ID'    // Replace with your Template ID
const publicKey = 'YOUR_PUBLIC_KEY'      // Replace with your Public Key
```

## 6. Test the Form
- Run your app: `npm run dev`
- Fill out the contact form
- Submit and check your email!

## Features Implemented:
✅ Email delivery to your inbox using EmailJS
✅ Beautiful success modal with animations
✅ Loading state while sending
✅ Error handling
✅ Form reset after successful submission
✅ Auto-close modal after 3 seconds

## Free Tier Limits:
EmailJS free tier allows 200 emails per month, which should be sufficient for a portfolio website.
