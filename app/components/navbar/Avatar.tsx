// This component generates GitHub-style avatars using initials from username

export default function Avatar({ username }: { username: string }) {
  // Get initials (first 2 letters of username, uppercase)
  const initials = username.slice(0, 2).toUpperCase();

  return (
    <div
      className={`w-12 h-12 text-sm flex items-center justify-center rounded-full font-bold text-gray-800 shadow-md transition-transform duration-300 hover:scale-110`}
      style={{ backgroundColor: 'var(--chantilly)' }}
    >
      {initials}
    </div>
  );
}
