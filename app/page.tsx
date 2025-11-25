import Link from 'next/link';
import { LogIn, UserPlus, BookMarked, BarChart3, ScatterChart } from 'lucide-react';
import Logo from './components/general/Logo';
import Footer from './components/general/Footer';

export default function LandingPage() {
  const features = [
    {
      icon: <BookMarked className="w-10 h-10 text-chantilly" />,
      title: 'Log Your Daily Mood',
      description:
        'Easily record your feelings and emotions throughout the day with an intuitive and simple interface.',
    },
    {
      icon: <BarChart3 className="w-10 h-10 text-chantilly" />,
      title: 'Track Emotional Trends',
      description:
        'Watch your emotional patterns evolve over weeks and months. Identify triggers and celebrate your progress.',
    },
    {
      icon: <ScatterChart className="w-10 h-10 text-chantilly" />,
      title: 'Visualize Your Patterns',
      description:
        'See your mood data come to life with beautiful, insightful charts and graphs that reveal your unique inner aura.',
    },
  ];

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      {/* Background container with animated gradient and Floating circles (styles in globals.css)*/}
      <div className="absolute inset-0 aura-gradient z-0"></div>
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      {/* Header */}
      <header className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20">
        <Link href="/" className="flex items-center gap-2 group" aria-label="AuraTrack Home">
          <Logo />
        </Link>

        <nav className="flex gap-4">
          <Link
            href="/login"
            className="ethereal-button bg-white/10 backdrop-blur-md text-white/90 font-semibold py-2 px-5 rounded-full hover:shadow-lg transition-all duration-300 ease-in-out flex items-center gap-2"
          >
            <LogIn className="w-4 h-4" /> Login
          </Link>
          <Link
            href="/signup"
            className="ethereal-button bg-white/90 backdrop-blur-md text-wistful font-bold py-2 px-5 rounded-full hover:shadow-xl transition-all duration-300 ease-in-out flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" /> Sign Up
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="flex min-h-screen flex-col items-center justify-center text-center p-8">
          <div className="w-full max-w-3xl bg-white/20 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-1xl p-10 md:p-16 ethereal-glow radiant-border">
            <h1
              className="text-5xl md:text-7xl font-bold text-white mb-6"
              style={{ textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
            >
              Discover Your
              <br />
              <span className="gradient-animate bg-clip-text text-transparent bg-linear-to-r from-chantilly via-wistful to-mint-tulip">
                Inner Aura
              </span>
            </h1>

            <p
              className="text-lg md:text-xl text-white/80 mb-10 max-w-lg mx-auto"
              style={{ textShadow: '0 1px 4px rgba(0,0,0,0.2)' }}
            >
              Understand your emotions. Track your moods and visualize the beautiful patterns of
              your inner world.
            </p>

            <Link
              href="/login"
              className="ethereal-button bg-ethereal-purple text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 inline-block"
            >
              Begin Your Journey
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-8 w-full bg-white/5 backdrop-blur-xs border-t border-white/10">
          <div className="container mx-auto max-w-5xl">
            <h2
              className="text-4xl md:text-5xl font-bold text-white text-center mb-16"
              style={{ textShadow: '0 3px 15px rgba(0,0,0,0.2)' }}
            >
              Features Crafted For You
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="feature-card bg-white/10 backdrop-blur-3xl border border-white/20 rounded-xl p-8 text-center shadow-lg hover-lift"
                >
                  <div className="flex justify-center mb-6" aria-hidden="true">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white/90 mb-4">{feature.title}</h3>
                  <p className="text-white/80">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
