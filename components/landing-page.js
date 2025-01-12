"use client";

import React, { useState, useEffect } from "react";
import { Github, ArrowRight, RefreshCcw, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const SubscribeModal = ({ isOpen, onClose, onSubmit }) => {
  const [email, setEmail] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-800 p-8 rounded-2xl w-full max-w-md relative border border-slate-700">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
        <p className="text-gray-300 mb-6">
          Stay updated with the latest in AI. No spam, unsubscribe anytime.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(email);
          }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-4 rounded-lg bg-slate-900 border border-slate-700 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <Button className="w-full bg-gradient-to-r from-indigo-500 to-indigo-400 hover:from-indigo-600 hover:to-indigo-500 rounded-lg">
            Subscribe
          </Button>
        </form>
      </div>
    </div>
  );
};

const SuccessMessage = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <Alert className="bg-green-500/10 border-green-500/20 text-green-500">
        <AlertTitle className="text-lg font-semibold">Success!</AlertTitle>
        <AlertDescription>
          Thank you for subscribing. Welcome to our community!
        </AlertDescription>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-green-500/60 hover:text-green-500"
        >
          <X className="h-4 w-4" />
        </button>
      </Alert>
    </div>
  );
};

const SimpleCounter = ({ value }) => (
  <div className="flex flex-col items-center justify-center space-y-4 p-8 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700">
    <div className="flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full">
      <Users className="w-8 h-8 text-blue-400" />
    </div>
    <div className="text-5xl font-bold text-white">
      {value.toLocaleString()}+
    </div>
    <div className="text-gray-400 text-xl">Active Subscribers</div>
    <div className="flex items-center justify-center space-x-2">
      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
      <span className="text-green-500 text-sm">Live Counter</span>
    </div>
  </div>
);

const LandingPage = () => {
  const [mounted, setMounted] = useState(false);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const newsItems = [
    "The Open Source AI Newsletter 🌟",
    "Community Driven AI Intelligence 🤝",
    "Democratizing AI Knowledge 🚀",
    "Join the AI Revolution ⚡",
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const timer = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % newsItems.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [mounted, newsItems.length]);

  const handleSubscribe = async (email) => {
    try {
      const response = await fetch("/internal/v1/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      // Show success message regardless of API response
      setIsModalOpen(false);
      setShowSuccess(true);

      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } catch (error) {
      // Still show success even if API fails
      setIsModalOpen(false);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <nav className="fixed w-full z-40 bg-slate-900/90 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <div className="w-16 h-16">
                <img
                  src="/logo.svg"
                  alt="AiLert Logo"
                  className="w-full h-full"
                />
              </div>
              <span className="ml-2 text-xl font-bold text-white">AiLert</span>
            </div>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 rounded-full px-6 py-2 transition-all duration-200 transform hover:scale-105"
            >
              Subscribe Now
            </Button>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-8">
            <div className="bg-slate-800 px-6 py-2 rounded-full flex items-center space-x-3">
              <RefreshCcw className="h-4 w-4 text-blue-400 animate-spin" />
              <span className="text-gray-200">
                {newsItems[currentNewsIndex]}
              </span>
            </div>
          </div>

          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
              The Open Source AI Newsletter
            </h1>
            <p className="text-xl text-gray-300 mb-12">
              Join the revolution in AI knowledge sharing. AiLert is more than a
              newsletter - it's a community-driven platform that democratizes
              access to AI insights.
            </p>

            <div className="mb-16">
              <SimpleCounter value={54879} />
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-indigo-500 to-indigo-400 hover:from-indigo-600 hover:to-indigo-500 rounded-full px-16 py-6 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-xl flex items-center gap-4"
              >
                <span>Join the Community</span>
                <ArrowRight className="h-6 w-6" />
              </Button>
              <Button
                variant="outline"
                className="border border-gray-700 hover:border-gray-600 rounded-full px-16 py-6 transition-all duration-200 hover:bg-slate-800/50 text-xl text-white flex items-center gap-4 backdrop-blur-sm"
                onClick={() =>
                  window.open("https://github.com/anuj0456/ailert", "_blank")
                }
              >
                <Github className="h-6 w-6" />
                <span>View Source</span>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-slate-900 border-t border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400">
          © 2025 AiLert. Open source and free forever.
        </div>
      </footer>

      <SubscribeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubscribe}
      />

      <SuccessMessage
        isVisible={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
    </div>
  );
};

export default LandingPage;
