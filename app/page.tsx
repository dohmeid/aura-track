"use client";

import { ChevronRight, Facebook, Instagram, Music } from "lucide-react";
import { useState, useEffect } from "react";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen w-full overflow-hidden bg-gradient-to-b from-slate-50 via-purple-50 to-slate-50 relative">
      {/* Animated background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-30 blur-3xl float"
             style={{
               background: "linear-gradient(135deg, rgba(243, 178, 221, 0.3) 0%, rgba(196, 242, 232, 0.2) 100%)",
               animationDelay: "0s"
             }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-25 blur-3xl float"
             style={{
               background: "linear-gradient(135deg, rgba(159, 161, 210, 0.3) 0%, rgba(160, 219, 233, 0.2) 100%)",
               animationDelay: "3s"
             }}></div>
        <div className="absolute top-1/3 right-1/6 w-72 h-72 rounded-full opacity-20 blur-3xl float"
             style={{
               background: "linear-gradient(135deg, rgba(241, 230, 174, 0.2) 0%, rgba(243, 178, 221, 0.15) 100%)",
               animationDelay: "1.5s"
             }}></div>
      </div>

      {/* Navigation */}
      <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white/40 backdrop-blur-md shadow-lg shadow-purple-200/20" : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2 group cursor-pointer hover:scale-105 transition-transform duration-300">
            <div className="text-3xl font-bold bg-gradient-to-r from-[#d4a5d4] via-[#a0dbe9] to-[#86bada] bg-clip-text text-transparent">
              ✨ AuraTrack
            </div>
          </div>
          <div className="flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-gray-600 hover:text-purple-600 transition-all duration-300 relative group">
              Features
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-300 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#cta" className="px-6 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-[#d4a5d4] to-[#86bada] hover:shadow-lg hover:shadow-purple-300/50 transition-all duration-300 hover:scale-105">
              Begin Journey
            </a>
          </div>
        </div>
      </nav>


      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden pt-20">
        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Mystical orb background */}
          <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full opacity-20 blur-3xl"
               style={{
                 background: "linear-gradient(135deg, rgba(212, 165, 212, 0.4) 0%, rgba(134, 186, 218, 0.2) 100%)",
               }}></div>

          {/* Main heading */}
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight tracking-tight">
            <span className="inline-block text-gray-900">Discover Your</span>
            <br />
            <span className="inline-block bg-gradient-to-r from-purple-400 via-pink-300 to-blue-300 bg-clip-text text-transparent animate-pulse">
              Inner Light
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            Journey inward to understand the spiritual essence of your emotions. Track your aura's energy, witness your transformation, and embrace your authentic self.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="group px-10 py-4 sm:py-5 rounded-full font-semibold text-white bg-gradient-to-r from-purple-500 via-pink-400 to-purple-400 hover:shadow-2xl hover:shadow-purple-400/50 transition-all duration-500 hover:scale-105 relative overflow-hidden">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Explore Your Aura ✨
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <button className="group px-10 py-4 sm:py-5 rounded-full font-semibold text-gray-700 bg-white/60 backdrop-blur-sm border-2 border-purple-200/50 hover:border-purple-400/80 hover:bg-white/80 transition-all duration-300 hover:scale-105">
              Learn More
            </button>
          </div>

          {/* Trust elements */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-md mx-auto text-center">
            <div className="group hover:scale-110 transition-transform duration-300 cursor-pointer">
              <div className="text-2xl mb-2">🔒</div>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">Privacy First</p>
            </div>
            <div className="group hover:scale-110 transition-transform duration-300 cursor-pointer">
              <div className="text-2xl mb-2">∞</div>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">Lifetime Access</p>
            </div>
            <div className="group hover:scale-110 transition-transform duration-300 cursor-pointer">
              <div className="text-2xl mb-2">✨</div>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">Spiritual Growth</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full opacity-15 blur-3xl"
               style={{
                 background: "linear-gradient(135deg, rgba(212, 165, 212, 0.4) 0%, rgba(134, 186, 218, 0.2) 100%)",
               }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
              Transform Your <span className="bg-linear-to-r from-purple-400 via-pink-300 to-blue-300 bg-clip-text text-transparent">Inner Journey</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
              Experience the spiritual depth of emotional awareness. AuraTrack guides you through meditation-like mood tracking to unveil your authentic self.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-10 mb-16">
            {/* Feature 1 */}
            <div className="feature-card group relative cursor-pointer">
              <div className="absolute inset-0 bg-linear-to-r from-purple-400/20 to-pink-300/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl -z-10"></div>
              <div className="relative p-8 rounded-3xl border border-purple-200/30 group-hover:border-purple-300/60 transition-all duration-500 bg-white/50 backdrop-blur-sm hover:bg-white/80">
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  <div className="text-6xl font-light">�</div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Spiritual Tracking
                </h3>
                <p className="text-gray-600 leading-relaxed font-light">
                  Log your emotional frequency throughout your day. Track the subtle shifts in your aura and watch patterns emerge.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="feature-card group relative cursor-pointer">
              <div className="absolute inset-0 bg-linear-to-r from-blue-300/20 to-purple-400/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl -z-10"></div>
              <div className="relative p-8 rounded-3xl border border-blue-200/30 group-hover:border-blue-300/60 transition-all duration-500 bg-white/50 backdrop-blur-sm hover:bg-white/80">
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  <div className="text-6xl font-light">✨</div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Aura Insights
                </h3>
                <p className="text-gray-600 leading-relaxed font-light">
                  Visualize your emotional spectrum with ethereal charts. Understand what influences your energy and consciousness.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="feature-card group relative cursor-pointer">
              <div className="absolute inset-0 bg-linear-to-r from-pink-300/20 to-blue-300/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl -z-10"></div>
              <div className="relative p-8 rounded-3xl border border-pink-200/30 group-hover:border-pink-300/60 transition-all duration-500 bg-white/50 backdrop-blur-sm hover:bg-white/80">
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  <div className="text-6xl font-light">🌟</div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Mindful Growth
                </h3>
                <p className="text-gray-600 leading-relaxed font-light">
                  Receive wisdom-based prompts that guide your spiritual evolution. Transform emotions into enlightenment.
                </p>
              </div>
            </div>
          </div>

          {/* Secondary features */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="feature-card group relative cursor-pointer">
              <div className="absolute inset-0 bg-linear-to-r from-purple-300/15 to-pink-200/15 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-lg -z-10"></div>
              <div className="relative p-6 rounded-2xl border border-purple-200/20 group-hover:border-purple-300/50 transition-all duration-500 bg-white/40 backdrop-blur-sm hover:bg-white/70 flex items-center gap-4">
                <div className="text-4xl flex-shrink-0">🔐</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Encrypted Privacy</h4>
                  <p className="text-sm text-gray-600 font-light">Your sacred journey is fully protected</p>
                </div>
              </div>
            </div>
            <div className="feature-card group relative cursor-pointer">
              <div className="absolute inset-0 bg-linear-to-r from-blue-300/15 to-purple-200/15 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-lg -z-10"></div>
              <div className="relative p-6 rounded-2xl border border-blue-200/20 group-hover:border-blue-300/50 transition-all duration-500 bg-white/40 backdrop-blur-sm hover:bg-white/70 flex items-center gap-4">
                <div className="text-4xl flex-shrink-0">♾️</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Eternal Access</h4>
                  <p className="text-sm text-gray-600 font-light">Your aura history preserved forever</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{
            background: "radial-gradient(ellipse at center, rgba(212, 165, 212, 0.15) 0%, transparent 70%)"
          }}></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-8">
            Begin Your <span className="bg-linear-to-r from-purple-400 via-pink-300 to-blue-300 bg-clip-text text-transparent">Spiritual Awakening</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Step into a world of self-discovery. Track your emotional essence, nurture your inner light, and embrace the journey toward emotional clarity.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group px-12 py-5 rounded-full font-semibold text-white bg-linear-to-r from-purple-500 via-pink-400 to-purple-400 hover:shadow-2xl hover:shadow-purple-400/50 transition-all duration-500 hover:scale-105 relative overflow-hidden text-lg">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Begin Your Journey
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-linear-to-b from-transparent via-purple-50/30 to-slate-100 border-t border-purple-200/20 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
               style={{
                 background: "linear-gradient(135deg, rgba(212, 165, 212, 0.3) 0%, rgba(134, 186, 218, 0.2) 100%)",
               }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="text-2xl font-bold bg-linear-to-r from-purple-400 via-pink-300 to-blue-300 bg-clip-text text-transparent mb-4">
                ✨ AuraTrack
              </div>
              <p className="text-sm text-gray-600 font-light leading-relaxed">
                Your sacred companion on the journey to emotional clarity and spiritual growth.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Connect With Us</h4>
              <ul className="space-y-3 flex flex-col">
                <li>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="ethereal-link text-sm text-gray-600 hover:text-purple-500 transition-all duration-300 flex items-center gap-2 group">
                    <Facebook className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="ethereal-link text-sm text-gray-600 hover:text-pink-500 transition-all duration-300 flex items-center gap-2 group">
                    <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="ethereal-link text-sm text-gray-600 hover:text-purple-600 transition-all duration-300 flex items-center gap-2 group">
                    <Music className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                    TikTok
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
              <ul className="space-y-3">
                <li><a href="#" className="ethereal-link text-sm text-gray-600 hover:text-purple-500 transition-all duration-300">Privacy Policy</a></li>
                <li><a href="#" className="ethereal-link text-sm text-gray-600 hover:text-purple-500 transition-all duration-300">Terms of Service</a></li>
                <li><a href="#" className="ethereal-link text-sm text-gray-600 hover:text-purple-500 transition-all duration-300">Support</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-purple-200/20 pt-8">
            <p className="text-center text-sm text-gray-600 font-light">
              © 2025 AuraTrack. Nurturing emotional awareness and spiritual growth, one moment at a time. ✨
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
