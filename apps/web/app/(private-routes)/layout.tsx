import AppBar from "@/components/ui/AppBar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <AppBar />
      {children}
    </div>
  );
}