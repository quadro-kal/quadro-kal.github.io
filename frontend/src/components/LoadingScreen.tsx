export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-m3-background">
      <div className="flex flex-col items-center">
        <div className="m3-spinner mb-4"></div>
        <p className="text-m3-primary font-medium tracking-wide">Loading Portfolio...</p>
      </div>
    </div>
  );
}