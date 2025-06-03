import { AppConfig } from "@/config/app.config";

export const emailStyles = {
  container: {
    fontFamily: "Arial,sans-serif",
    color: "#333",
    maxWidth: "600px",
    padding: "20px",
    backgroundColor: "#fff",
  },
  header: { marginBottom: "20px" },
  headerTitle: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
  },
  content: { margin: "20px 0" },
  p: {
    fontSize: "14px",
    lineHeight: "1.5",
    margin: "0 0 16px 0",
  },
  otp: {
    fontSize: "24px",
    fontWeight: "bold",
    margin: "16px 0",
  },
  footer: { marginTop: "20px" },
  footerText: {
    margin: "0",
    fontSize: "14px",
  },
  disclaimer: {
    marginTop: "20px",
    fontSize: "12px",
    color: "#888",
  },
  disclaimerText: { margin: "0" },
};

export interface ForgotPasswordProps {
  otp: string;
}

export const ForgotPassword = ({ otp }: ForgotPasswordProps) => (
  // Container
  <div style={emailStyles.container}>
    {/* Header */}
    <div style={emailStyles.header}>
      <span style={emailStyles.headerTitle}>Reset your password</span>
    </div>

    {/* Content */}
    <div style={emailStyles.content}>
      <p style={emailStyles.p}>Hello,</p>
      <p style={emailStyles.p}>
        Please provide the following OTP to continue recovering your password:
      </p>
      <div style={emailStyles.otp}>{otp}</div>
    </div>

    {/* Footer */}
    <div style={emailStyles.footer}>
      <p style={emailStyles.footerText}>Thank you,</p>
      <p style={emailStyles.footerText}>{AppConfig.EMAIL.COMPANY_NAME} Team</p>
    </div>

    {/* Disclaimer */}
    <div style={emailStyles.disclaimer}>
      <p style={emailStyles.disclaimerText}>© {AppConfig.EMAIL.COMPANY_NAME}</p>
    </div>
  </div>
);
