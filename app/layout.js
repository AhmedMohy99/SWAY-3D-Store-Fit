import './globals.css'; // السطر ده هو اللي بيرجع الستايل بتاعنا!

export const metadata = {
  title: 'Sway 3D Fitting Room',
  description: 'Technical Streetwear',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white m-0 p-0 overflow-hidden">
        {children}
      </body>
    </html>
  );
}
