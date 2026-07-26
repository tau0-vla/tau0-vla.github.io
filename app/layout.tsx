import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://tau0-vla.github.io"),
  title: {
    default: "τ0-VLA",
    template: "%s · τ0-VLA",
  },
  description:
    "τ0-VLA: a Hierarchical Robot Foundation Model with World-Model-Guided Test-Time Computation.",
  openGraph: {
    title: "τ0-VLA",
    description:
      "a Hierarchical Robot Foundation Model with World-Model-Guided Test-Time Computation.",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "τ0-VLA — Plan. Preview. Act. Revise.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "τ0-VLA",
    description:
      "a Hierarchical Robot Foundation Model with World-Model-Guided Test-Time Computation.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
