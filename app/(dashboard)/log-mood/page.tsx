import MoodForm from '@/app/components/mood/MoodForm';

export default function LogMoodPage() {
  return (
    <div className="min-h-full bg-[radial-gradient(circle_at_top_left,var(--blizzard-blue),var(--mint-tulip)_30%,var(--sidecar)_60%,#fff_100%)] p-6 md:p-10">
      <div className="mx-auto max-w-3xl">
        <header className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-wistful tracking-tight mb-2">
            Log Your Aura
          </h1>
          <p className="text-gray-500 font-medium">
            Take a breath. Reflect. How is your energy flowing today?
          </p>
        </header>

        <MoodForm />
      </div>
    </div>
  );
}
