import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaInstagram, FaTiktok, FaTwitter, FaClock } from "react-icons/fa";
import SEO from "../../Components/SEO/SEO";
import { contactChannelData } from "./contactInfo";
import toast from "react-hot-toast";

const baseUrl = import.meta.env.VITE_SITE_URL || "https://vexo.com";
const API_URL = import.meta.env.VITE_APP_API_URL;

const channelIcons = [FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaClock];

const contactChannels = contactChannelData.map((channel, index) => ({
  ...channel,
  icon: channelIcons[index] || FaEnvelope,
}));

const socialChannels = [
  { icon: FaInstagram, label: "Instagram", link: "https://www.instagram.com/vexo" },
  { icon: FaTiktok, label: "TikTok", link: "https://www.tiktok.com/@vexo" },
  { icon: FaTwitter, label: "Twitter", link: "https://twitter.com/vexo" },
];

function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    topic: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result?.message || "Failed to send message");
      }
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        topic: "",
        message: "",
      });
      toast.success("Message sent! We'll get back to you soon.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to send message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 pt-20">
      <SEO
        title="Contact Us | VEXO"
        description="Reach out to the VEXO team for support, partnerships, or general enquiries. We're here to help with your questions."
        url={`${baseUrl}/contact`}
        type="website"
      />
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-12">
        <header className="space-y-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
            We’re listening
          </p>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-zinc-900 to-zinc-600 bg-clip-text text-transparent">
            Contact VEXO
          </h1>
          <p className="text-sm text-zinc-600 max-w-2xl mx-auto">
            Need help with an order? Have a collaboration idea? Fill out the form or drop into one of
            the channels below.
          </p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl shadow-lg p-6 space-y-6 border border-zinc-100">
            <div>
              <p className="text-sm uppercase font-semibold text-zinc-500 tracking-widest">
                Contact form
              </p>
              <h2 className="text-2xl font-semibold text-zinc-900 mt-2">
                Drop us a message
              </h2>
              <p className="text-sm text-zinc-600 mt-1">
                We reply within 24 hours on weekdays. For urgent requests reach us via phone.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-widest">
                    First name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-widest">
                    Last name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-widest">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-widest">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-widest">
                  Topic
                </label>
                <select
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:ring-2 focus:ring-black bg-white cursor-pointer"
                >
                  <option value="">Select...</option>
                  <option value="order">Order question</option>
                  <option value="returns">Return or exchange</option>
                  <option value="wholesale">Wholesale / Partnership</option>
                  <option value="press">Press / Media</option>
                  <option value="other">Something else</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-widest">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                  placeholder="Drop all the details we should know..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-black text-white py-3 font-semibold uppercase tracking-[0.2em] cursor-pointer outline-none hover:bg-zinc-900 disabled:opacity-60 disabled:cursor-not-allowed"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </motion.button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-lg border border-zinc-100 p-6 space-y-6">
              <div>
                <p className="text-sm uppercase font-semibold text-zinc-500 tracking-widest">
                  Direct lines
                </p>
                <h2 className="text-2xl font-semibold text-zinc-900 mt-2">
                  Talk to a real human
                </h2>
                <p className="text-sm text-zinc-600 mt-1">
                  We answer every email and DM manually. No bots, just the VEXO crew.
                </p>
              </div>
              <div className="space-y-4">
                {contactChannels.map(({ title, description, icon: Icon, detail, link }) => (
                  <motion.a
                    key={title}
                    href={link}
                    target={link?.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="flex items-start gap-4 rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-4 hover:bg-white transition cursor-pointer outline-none"
                    whileHover={{ y: -3 }}
                  >
                    <span className="mt-1 rounded-full bg-black text-white p-3">
                      <Icon className="text-lg" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-zinc-900">{title}</p>
                      <p className="text-xs text-zinc-500">{description}</p>
                      <p className="text-sm font-medium text-zinc-800 mt-1">{detail}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="bg-black text-white rounded-3xl p-6 space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                  Socials
                </p>
                <h3 className="text-2xl font-semibold mt-2">Slide in the DMs</h3>
                <p className="text-sm text-white/80">
                  Tag @vexo and we might repost your fit.
                </p>
              </div>
              <div className="flex gap-3">
                {socialChannels.map(({ icon: Icon, label, link }) => (
                  <motion.a
                    key={label}
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 rounded-2xl border border-white/20 px-4 py-3 flex items-center justify-center gap-2 cursor-pointer outline-none hover:border-white"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon />
                    <span className="text-sm font-semibold">{label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Contact;

