import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Tailwind,
  Text,
} from "@react-email/components";

export const PasswordResetEmail = ({
  link = "https://example.com/reset-password",
  appName = "Your App",
  brandLogoUrl,
  brandColor = "#000000",
}: {
  link?: string;
  appName?: string;
  brandLogoUrl?: string;
  brandColor?: string;
}) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-gray-50 font-sans">
          <Container className="mx-auto py-20 px-4">
            <div className="bg-white rounded-md shadow-sm border border-gray-200 p-8">
              {/* Brand Header */}
              {brandLogoUrl && (
                <div className="text-center mb-8">
                  <Img
                    src={brandLogoUrl}
                    alt="Brand Logo"
                    className="mx-auto mb-4"
                    width="120"
                    height="40"
                  />
                </div>
              )}

              {/* Title */}
              <div className="text-center mb-8">
                <Text className="text-2xl font-bold text-gray-800 mb-2">
                  Reset Your Password
                </Text>
                <Text className="text-gray-700 mb-4">
                  We received a request to reset your password for your {appName} account.
                </Text>
              </div>

              {/* Call to Action */}
              <div className="text-center mb-8">
                <Button
                  href={link}
                  className="inline-block px-6 py-3 text-white font-semibold rounded-md text-decoration-none"
                  style={{ backgroundColor: brandColor }}
                >
                  Reset Password
                </Button>
              </div>

              {/* Alternative Link */}
              <div className="text-center mb-6">
                <Text className="text-sm text-gray-500 mb-2">
                  If the button doesn't work, copy and paste this link into your browser:
                </Text>
                <Text className="text-sm text-blue-600 break-all">
                  {link}
                </Text>
              </div>

              {/* Expiry Notice */}
              <div className="text-center mb-6">
                <Text className="text-sm text-gray-500">
                  This password reset link will expire in 24 hours for security reasons.
                </Text>
              </div>

              {/* Security Note */}
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <Text className="text-sm text-red-800">
                  <strong>Security:</strong> If you didn't request a password reset, 
                  please ignore this email. Your password will remain unchanged. 
                  If you're concerned about your account security, please contact our support team.
                </Text>
              </div>
            </div>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default PasswordResetEmail;