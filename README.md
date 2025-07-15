# Parse Server Resend Adapter

A modern email adapter for Parse Server that uses [Resend](https://resend.com/) to send beautiful, customizable emails with React Email templates.

## Features

- 🚀 **Easy Integration** - Drop-in replacement for Parse Server's built-in email adapter
- 📧 **Beautiful Templates** - Pre-built React Email templates for verification and password reset emails
- 🎨 **Customizable** - Support for custom branding (logo, colors) and custom templates
- 📱 **Responsive** - Mobile-friendly email templates with Tailwind CSS
- 🔒 **TypeScript** - Full TypeScript support with type definitions
- ⚡ **Modern** - Built with the latest Resend API and React Email

## Installation

```bash
npm install parse-server-resend-adapter
# or
yarn add parse-server-resend-adapter
# or
pnpm add parse-server-resend-adapter
```

## Quick Start

### 1. Get your Resend API key

Sign up at [Resend](https://resend.com/) and get your API key from the dashboard.

### 2. Configure Parse Server

```javascript
import { ResendEmailAdapter } from 'parse-server-resend-adapter';

const parseServer = new ParseServer({
  // ... other Parse Server options
  emailAdapter: new ResendEmailAdapter({
    apiKey: 'your-resend-api-key',
    defaultFrom: 'noreply@yourdomain.com',
    brandLogoUrl: 'https://yourdomain.com/logo.png', // optional
    brandColor: '#007bff', // optional, defaults to #000000
  }),
  appName: 'Your App Name',
  publicServerURL: 'https://yourserver.com/parse',
});
```

### 3. That's it!

Parse Server will now use Resend to send verification emails and password reset emails with beautiful, responsive templates.

## Configuration Options

| Option | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| `apiKey` | `string` | ✅ | - | Your Resend API key |
| `defaultFrom` | `string` | ✅ | - | Default sender email address |
| `brandLogoUrl` | `string` | ❌ | - | URL to your brand logo (displayed in emails) |
| `brandColor` | `string` | ❌ | `#000000` | Brand color for buttons and accents |
| `templates` | `object` | ❌ | - | Custom email templates (see below) |

## Custom Templates

> ⚠️ **Version Compatibility Warning**
> 
> When using custom templates, ensure that your project uses compatible versions of React Email dependencies with this adapter. Version mismatches can cause rendering errors like "Objects are not valid as a React child".
> 
> **Required versions:**
> - `@react-email/components`: `^0.3.1`
> - `react`: `^19.0.0` 
> - `react-dom`: `^19.0.0`
> 
> If you encounter rendering errors with custom templates, check that your project's `package.json` uses compatible versions.

You can provide your own React Email templates for verification and password reset emails:

```javascript
import { ResendEmailAdapter } from 'parse-server-resend-adapter';
import MyVerificationTemplate from './templates/MyVerificationTemplate';
import MyPasswordResetTemplate from './templates/MyPasswordResetTemplate';

const adapter = new ResendEmailAdapter({
  apiKey: 'your-resend-api-key',
  defaultFrom: 'noreply@yourdomain.com',
  templates: {
    verification: MyVerificationTemplate,
    passwordReset: MyPasswordResetTemplate,
  },
});
```

### Custom Template Props

Your custom templates will receive the following props:

**Verification Email Template:**
```typescript
{
  link: string;           // Verification link
  appName: string;        // Your app name
  brandLogoUrl?: string;  // Your brand logo URL
  brandColor?: string;    // Your brand color
}
```

**Password Reset Email Template:**
```typescript
{
  link: string;           // Password reset link
  appName: string;        // Your app name
  brandLogoUrl?: string;  // Your brand logo URL
  brandColor?: string;    // Your brand color
}
```

### Example Custom Template

```jsx
import { Html, Head, Body, Container, Text, Button } from '@react-email/components';

export const MyVerificationTemplate = ({ 
  link, 
  appName, 
  brandLogoUrl, 
  brandColor = '#007bff'
}) => {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: 'Arial, sans-serif' }}>
        <Container>
          <Text>Welcome to {appName}!</Text>
          <Text>Please verify your email address:</Text>
          <Button 
            href={link}
            style={{ 
              backgroundColor: brandColor,
              color: 'white',
              padding: '12px 24px',
              borderRadius: '6px',
              textDecoration: 'none'
            }}
          >
            Verify Email
          </Button>
        </Container>
      </Body>
    </Html>
  );
};
```

## Default Templates

The adapter comes with beautiful, responsive default templates that include:

- **Professional Design** - Clean, modern layout
- **Mobile Responsive** - Optimized for all devices
- **Security Notes** - Built-in security warnings and best practices
- **Accessibility** - Proper contrast and readable fonts
- **Fallback Links** - Copy-paste links when buttons don't work

## Environment Variables

You can also configure the adapter using environment variables:

```bash
RESEND_API_KEY=your-resend-api-key
EMAIL_FROM=noreply@yourdomain.com
EMAIL_BRAND_LOGO_URL=https://yourdomain.com/logo.png
EMAIL_BRAND_COLOR=#007bff
```

```javascript
const adapter = new ResendEmailAdapter({
  apiKey: process.env.RESEND_API_KEY,
  defaultFrom: process.env.EMAIL_FROM,
  brandLogoUrl: process.env.EMAIL_BRAND_LOGO_URL,
  brandColor: process.env.EMAIL_BRAND_COLOR,
});
```

## API Reference

### ResendEmailAdapter

The main adapter class that extends Parse Server's `MailAdapter`.

#### Methods

##### `sendMail(options)`
Send a custom email.

```typescript
await adapter.sendMail({
  to: 'user@example.com',
  subject: 'Hello World',
  text: 'Plain text content',
  html: '<h1>HTML content</h1>', // optional
  from: 'sender@yourdomain.com', // optional, uses defaultFrom if not provided
});
```

##### `sendVerificationEmail({ link, appName, user })`
Send a verification email (called automatically by Parse Server).

##### `sendPasswordResetEmail({ link, appName, user })`
Send a password reset email (called automatically by Parse Server).

## Troubleshooting

### "Objects are not valid as a React child" Error

This error typically occurs when there are version mismatches between React Email dependencies. To fix:

1. **Check your dependencies** - Ensure your project uses compatible versions:
   ```json
   {
     "@react-email/components": "^0.3.1",
     "react": "^19.0.0",
     "react-dom": "^19.0.0"
   }
   ```

2. **Update package versions** - If using older versions, update them:
   ```bash
   npm install @react-email/components@^0.3.1 react@^19.0.0 react-dom@^19.0.0
   ```

3. **Clear node_modules** - Sometimes a clean install helps:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Use default templates** - If custom templates still don't work, the default templates will always work as a fallback.

### Template Not Rendering

- Ensure your custom template exports a React component
- Check that all required props are handled in your template
- Verify your template uses only `@react-email/components` for email-safe rendering

## Requirements

- Node.js 14 or higher
- Parse Server 4.0 or higher
- A verified domain in Resend

## Development

```bash
# Clone the repository
git clone https://github.com/0xtiby/parse-server-resend-adapter.git

# Install dependencies
npm install

# Build the package
npm run build
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📧 **Email**: Create an issue on GitHub
- 📚 **Documentation**: [Resend Documentation](https://resend.com/docs)
- 💬 **Community**: [Parse Community Forum](https://community.parseplatform.org/)

## Related

- [Parse Server](https://github.com/parse-community/parse-server)
- [Resend](https://resend.com/)
- [React Email](https://react.email/)

---

Made with ❤️ by [0xtiby](https://github.com/0xtiby)
