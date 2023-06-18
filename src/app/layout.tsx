import { AppWrapper } from "@/context/AppContext";
import "./globals.css";

export const metadata = {
  title: "Todo List Serverless",
  description: "Done by wagnercaetano.dev for simple daily uses",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="text-inter bg-gray-800 text-white">
      <body>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
