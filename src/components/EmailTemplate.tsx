import * as React from "react";

interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export function EmailTemplate({ name, email, message }: EmailTemplateProps) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2
        style={{
          color: "#333",
          borderBottom: "1px solid #ccc",
          paddingBottom: "10px",
        }}
      >
        New Message From Amlin Website
      </h2>

      <p style={{ fontSize: "16px", marginBottom: "10px" }}>
        <strong style={{ color: "#555" }}>Name:</strong> {name}
      </p>

      <p style={{ fontSize: "16px", marginBottom: "10px" }}>
        <strong style={{ color: "#555" }}>Email:</strong> {email}
      </p>

      <p style={{ fontSize: "16px", marginBottom: "10px" }}>
        <strong style={{ color: "#555" }}>Project Details:</strong>
      </p>

      <div
        style={{
          backgroundColor: "#fff",
          padding: "15px",
          boxShadow: "0 0 5px rgba(0,0,0,0.05)",
          fontSize: "15px",
          lineHeight: "1.6",
          color: "#333",
          whiteSpace: "pre-line",
        }}
      >
        {message}
      </div>

      <p
        style={{
          fontSize: "13px",
          color: "#999",
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        This message was sent via the Amlin contact us form.
      </p>
    </div>
  );
}
