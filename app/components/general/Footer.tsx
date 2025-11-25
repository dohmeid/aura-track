import { Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="text-center p-10 text-white/60 z-10 relative">
      <div className="flex justify-center gap-6 mb-4">
        <a href="#" className="ethereal-link hover:text-white">
          <Twitter />
        </a>
        <a href="#" className="ethereal-link hover:text-white">
          <Github />
        </a>
        <a href="#" className="ethereal-link hover:text-white">
          <Linkedin />
        </a>
      </div>
      <p>&copy; {new Date().getFullYear()} AuraTrack. All rights reserved.</p>
    </footer>
  );
}
