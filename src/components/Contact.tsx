"use client";

import { Instagram, Music2, Mail, MessageCircle } from "lucide-react";
import { useCMSData } from "@/hooks/useCMSData";
import { scrollToSection } from "@/utils/scrollTo";

export default function Contact() {
  const { siteSettings } = useCMSData();

  return (
    <section id="contact" className="py-24 relative bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div
            
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Connect With <span className="text-gradient">Us</span>
            </h2>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              Follow us on social media for updates, specials, and behind-the-scenes content.
            </p>
          </div>

          {/* Social Links */}
          <div
            
            className="grid md:grid-cols-2 gap-4 mb-12"
          >
            <a
              href={siteSettings.instagram_url || 'https://instagram.com/ombuutah'}
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-2xl p-6 hover:bg-card-hover transition-all duration-300 flex items-center gap-4 group"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0">
                <Instagram className="text-white" size={28} />
              </div>
              <div>
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                  @ombuutah
                </h3>
                <p className="text-muted text-sm">Follow us on Instagram</p>
              </div>
            </a>

            <a
              href={siteSettings.tiktok_url || 'https://tiktok.com/@ombu_utah'}
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-2xl p-6 hover:bg-card-hover transition-all duration-300 flex items-center gap-4 group"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-400 to-pink-500 flex items-center justify-center shrink-0">
                <Music2 className="text-white" size={28} />
              </div>
              <div>
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                  @ombu_utah
                </h3>
                <p className="text-muted text-sm">Follow us on TikTok</p>
              </div>
            </a>
          </div>

          {/* Contact Options */}
          <div
            
            className="glass rounded-2xl p-8 text-center"
          >
            <h3 className="text-2xl font-bold mb-4">Have Questions?</h3>
            <p className="text-muted mb-6">
              For reservations, large party inquiries, or general questions,
              please contact your nearest location directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollToSection("locations")}
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full font-medium transition-colors cursor-pointer"
              >
                <MessageCircle size={18} />
                Contact a Location
              </button>
              <a
                href="mailto:info@ombugrillutah.com"
                className="inline-flex items-center justify-center gap-2 bg-card hover:bg-card-hover border border-border text-foreground px-6 py-3 rounded-full font-medium transition-colors"
              >
                <Mail size={18} />
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
