"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  Server,
  Eye,
  KeyRound,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router";

export default function SecurityPage() {
  const securityPillars = [
    {
      icon: <Lock className="w-6 h-6" />,
      title: "End-to-End Encryption",
      description:
        "All data is encrypted in transit using industry-standard TLS and at rest using AES-256 encryption to ensure your personal information remains unreadable to unauthorized parties.",
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Privacy by Design",
      description:
        "You have full control over what information is visible on your profile. We adhere to global privacy frameworks including GDPR and CCPA, ensuring your data is never sold to third parties.",
    },
    {
      icon: <KeyRound className="w-6 h-6" />,
      title: "Secure Authentication",
      description:
        "We employ modern authentication standards, including optional Two-Factor Authentication (2FA) and secure OAuth integrations, to protect your account from unauthorized access.",
    },
    {
      icon: <Server className="w-6 h-6" />,
      title: "Reliable Infrastructure",
      description:
        "Our platform is hosted on world-class, ISO-certified cloud infrastructure with automated backups and 24/7 monitoring to guarantee maximum uptime and data integrity.",
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
        <div className="bg-white border-b border-slate-200/60 pt-12 pb-20 px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-50"></div>

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50 transition-all duration-300 shadow-sm w-fit"
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
                className="inline-flex items-center justify-center p-3 bg-emerald-50 rounded-2xl text-emerald-600 mb-6"
              >
                <ShieldCheck className="w-8 h-8" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6"
              >
                Your trust is our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                  priority
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-slate-500 font-medium leading-relaxed"
              >
                We implement enterprise-grade security protocols to ensure your
                personal data, professional history, and private communications
                remain strictly confidential and protected.
              </motion.p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {securityPillars.map((pillar, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-1 hover:border-emerald-200 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-50 to-teal-50 text-emerald-600 rounded-2xl flex items-center justify-center border border-emerald-100 mb-6">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {pillar.title}
                </h3>
                <p className="text-slate-500 font-medium leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 bg-slate-900 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-emerald-500/10"></div>
            <h3 className="text-2xl font-bold text-white mb-4 relative z-10">
              Found a vulnerability?
            </h3>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto relative z-10">
              We take security seriously. If you believe you've found a security
              vulnerability in our platform, please report it to our security
              team. We will investigate all legitimate reports.
            </p>
            <a
              href="mailto:security@alumnidirectory.com"
              className="relative z-10 inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-slate-900 bg-white rounded-xl hover:bg-slate-100 transition-colors"
            >
              Report an Issue
            </a>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
