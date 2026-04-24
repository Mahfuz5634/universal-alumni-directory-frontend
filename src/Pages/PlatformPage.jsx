"use client";

import { motion } from "framer-motion";
import {
  Network,
  Briefcase,
  Users,
  CalendarDays,
  LayoutDashboard,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router";

export default function PlatformPage() {
  const features = [
    {
      icon: <Network className="w-6 h-6" />,
      title: "Global Alumni Directory",
      description:
        "Search and connect with fellow graduates worldwide based on industry, graduation year, or location.",
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Exclusive Job Board",
      description:
        "Access career opportunities posted directly by alumni and university partners tailored for your expertise.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Mentorship Programs",
      description:
        "Find a mentor in your field or give back by guiding recent graduates through their early career stages.",
    },
    {
      icon: <CalendarDays className="w-6 h-6" />,
      title: "Events & Reunions",
      description:
        "Stay updated on upcoming alumni meetups, webinars, and official university events happening near you.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa] font-sans text-slate-900 selection:bg-indigo-200 selection:text-indigo-900">
      <main className="flex-grow">
        {/* Header Section */}
        <div className="bg-white border-b border-slate-200/60 pt-12 pb-20 px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50"></div>

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all duration-300 shadow-sm w-fit"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </motion.div>

            <div className="text-center max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center justify-center p-3 bg-indigo-50 rounded-2xl text-indigo-600 mb-6"
              >
                <LayoutDashboard className="w-8 h-8" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6"
              >
                Everything you need to{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                  connect
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-slate-500 font-medium leading-relaxed"
              >
                Our platform provides a centralized hub for universities and
                their graduates to foster lifelong professional relationships,
                discover opportunities, and collaborate globally.
              </motion.p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 hover:border-indigo-200 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-50 to-violet-50 text-indigo-600 rounded-2xl flex items-center justify-center border border-indigo-100 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-500 font-medium leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
