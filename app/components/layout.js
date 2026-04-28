export const metadata = {
  title: "SWAY 3D Virtual Fitting Room",
  description: "Try on clothes virtually with 3D preview and smart size recommendations",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#fafafa" }}>
        {children}
      </body>
    </html>
  );
}
