import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { useSEO } from "../hooks/useSEO";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPaperPlane,
  FaGoogle,
  FaMicrosoft,
  FaYahoo,
  FaEnvelope,
  FaTimes,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import personalData from "../data/personal.json";
import SocialIcons from "../components/ui/SocialIcons";
import Button from "../components/ui/Button";
const Contact = () => {
  useSEO({
    title: "Contact - Vivek J. Utture | Get in Touch",
    description:
      "Get in touch with Vivek J. Utture. Reach out for collaboration, mentorship, or inquiries about projects and services.",
    keywords:
      "contact, get in touch, email, inquiry, collaboration, mentorship, connect",
    canonical: "https://vivekjutture.com/contact",
    applyOn: "/contact",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);
  const [notification, setNotification] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);
  const handleFormSubmit = (data) => {
    setFormData(data);
    setIsModalOpen(true);
  };
  const showNotification = (type, message) => {
    setNotification({
      type,
      message,
    });
    if (type === "success") {
      setIsModalOpen(false);
    }
  };
  const sendEmail = (provider) => {
    if (!formData) return;
    const recipient = personalData.email;
    const subject = encodeURIComponent(
      `Portfolio Inquiry from ${formData.name}`,
    );
    const bodyContent = `
Name: ${formData.name}
Message:
${formData.message}
--------------------------------------------------
Sent via Portfolio Contact Form
    `.trim();
    const body = encodeURIComponent(bodyContent);
    let url = "";
    switch (provider) {
      case "gmail":
        url = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${subject}&body=${body}`;
        break;
      case "outlook":
        url = `https://outlook.office.com/mail/deeplink/compose?to=${recipient}&subject=${subject}&body=${body}`;
        break;
      case "yahoo":
        url = `https://compose.mail.yahoo.com/?to=${recipient}&subject=${subject}&body=${body}`;
        break;
      default:
        url = `mailto:${recipient}?subject=${subject}&body=${body}`;
    }
    try {
      if (provider === "default") {
        window.location.href = url;
        showNotification("success", "Opening your default email app...");
      } else {
        const newWindow = window.open(url, "_blank", "noopener,noreferrer");
        if (newWindow) {
          showNotification(
            "success",
            `Draft opened in ${provider}! Don't forget to hit Send.`,
          );
        } else {
          showNotification(
            "error",
            "Popup blocked. Please allow popups or use 'Default E-Mail Provider'.",
          );
        }
      }
    } catch {
      showNotification("error", "Something went wrong. Please try again.");
    }
  };
  return (
    <div className="min-h-screen pt-20 pb-20 px-4 transition-colors duration-300 bg-gray-50 dark:bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.5,
          }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display bg-clip-text text-transparent bg-linear-to-r from-violet-600 to-fuchsia-500">
            Get In Touch
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <motion.div
            initial={{
              opacity: 0,
              x: -50,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
            className="lg:col-span-5 space-y-8 text-center lg:text-left"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-display">
                Let's Chat
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed font-sans">
                {" "}
                Whether it's a project inquiry or just a friendly hello, I'll do
                my best to get back to you!
              </p>
            </div>
            <div className="flex justify-center lg:justify-start">
              <div className="relative w-56 h-36 bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 flex items-center justify-center p-4 shadow-sm">
                <svg viewBox="0 0 200 150" className="w-full h-full opacity-90">
                  <rect
                    x="20"
                    y="30"
                    width="160"
                    height="100"
                    rx="8"
                    className="fill-slate-100 dark:fill-slate-800"
                    stroke="#94a3b8"
                    strokeWidth="2"
                  />
                  <path d="M20 70 L180 70" stroke="#cbd5e1" strokeWidth="1" />
                  <circle cx="35" cy="45" r="3" fill="#ef4444" />
                  <circle cx="45" cy="45" r="3" fill="#eab308" />
                  <circle cx="55" cy="45" r="3" fill="#22c55e" />
                  <rect
                    x="35"
                    y="85"
                    width="80"
                    height="4"
                    rx="2"
                    className="fill-violet-400"
                  />
                  <rect
                    x="35"
                    y="95"
                    width="60"
                    height="4"
                    rx="2"
                    className="fill-slate-400"
                  />
                  <circle
                    cx="150"
                    cy="100"
                    r="12"
                    className="fill-violet-500/20 animate-pulse"
                  />
                </svg>
              </div>
            </div>
            <div className="flex justify-center lg:justify-start">
              <SocialIcons />
            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              x: 50,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
              delay: 0.2,
            }}
            className="lg:col-span-7"
          >
            <div className="bg-white dark:bg-slate-900/50 p-8 md:p-10 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-2xl relative">
              <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className="space-y-6"
              >
                <div>
                  <input
                    {...register("name", {
                      required: true,
                    })}
                    className={`w-full px-5 py-4 rounded-xl border outline-none transition-all text-base bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 placeholder:text-gray-400 ${errors.name ? "border-red-500" : "border-gray-200 dark:border-slate-700"}`}
                    placeholder="Your Name"
                  />
                  {errors.name && (
                    <span className="text-red-500 text-sm pl-2">
                      Name is required
                    </span>
                  )}
                </div>
                <div>
                  <textarea
                    {...register("message", {
                      required: true,
                    })}
                    rows="6"
                    className={`w-full px-5 py-4 rounded-xl border outline-none transition-all text-base resize-none bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 placeholder:text-gray-400 ${errors.message ? "border-red-500" : "border-gray-200 dark:border-slate-700"}`}
                    placeholder="How can I help you?"
                  ></textarea>
                  {errors.message && (
                    <span className="text-red-500 text-sm pl-2">
                      Message cannot be empty
                    </span>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full text-lg py-4 font-bold"
                >
                  <FaPaperPlane size={20} /> Send a Mail
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {createPortal(
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                onClick={() => setIsModalOpen(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{
                  scale: 0.95,
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  scale: 0.95,
                  opacity: 0,
                  y: 20,
                }}
                className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-slate-800 z-10"
              >
                <div className="p-5 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center bg-gray-50 dark:bg-slate-900/50">
                  <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white">
                    Choose Email App
                  </h3>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-800 text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
                  >
                    <FaTimes size={18} />
                  </button>
                </div>
                <div className="p-6 space-y-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center">
                    Where would you like to send this message from?
                  </p>
                  <button
                    onClick={() => sendEmail("gmail")}
                    className="w-full flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-slate-700 hover:bg-red-50 dark:hover:bg-red-900/10 hover:border-red-200 transition-all group cursor-pointer bg-white dark:bg-slate-800/50"
                  >
                    <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400 shrink-0">
                      <FaGoogle size={20} />
                    </div>
                    <div className="text-left">
                      <span className="block font-bold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400">
                        Gmail
                      </span>
                    </div>
                  </button>
                  <button
                    onClick={() => sendEmail("outlook")}
                    className="w-full flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-slate-700 hover:bg-violet-50 dark:hover:bg-violet-900/10 hover:border-violet-200 transition-all group cursor-pointer bg-white dark:bg-slate-800/50"
                  >
                    <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600 dark:text-violet-400 shrink-0">
                      <FaMicrosoft size={20} />
                    </div>
                    <div className="text-left">
                      <span className="block font-bold text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400">
                        Outlook
                      </span>
                    </div>
                  </button>
                  <button
                    onClick={() => sendEmail("yahoo")}
                    className="w-full flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-slate-700 hover:bg-purple-50 dark:hover:bg-purple-900/10 hover:border-purple-200 transition-all group cursor-pointer bg-white dark:bg-slate-800/50"
                  >
                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
                      <FaYahoo size={20} />
                    </div>
                    <div className="text-left">
                      <span className="block font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400">
                        Yahoo Mail
                      </span>
                    </div>
                  </button>
                  <button
                    onClick={() => sendEmail("default")}
                    className="w-full flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 hover:border-gray-300 transition-all group cursor-pointer bg-white dark:bg-slate-800/50"
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-600 dark:text-gray-400 shrink-0">
                      <FaEnvelope size={20} />
                    </div>
                    <div className="text-left">
                      <span className="block font-bold text-gray-900 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white">
                        Default E-Mail Provider
                      </span>
                    </div>
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body,
      )}

      {createPortal(
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{
                opacity: 0,
                y: 50,
                x: "-50%",
              }}
              animate={{
                opacity: 1,
                y: 0,
                x: "-50%",
              }}
              exit={{
                opacity: 0,
                y: 50,
                x: "-50%",
              }}
              className={`fixed bottom-8 left-1/2 z-10000 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 border ${notification.type === "success" ? "bg-white dark:bg-slate-900 text-green-600 dark:text-green-400 border-green-200 dark:border-green-900" : "bg-white dark:bg-slate-900 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900"}`}
            >
              {notification.type === "success" ? (
                <FaCheckCircle size={20} />
              ) : (
                <FaExclamationCircle size={20} />
              )}
              <p className="font-semibold text-gray-900 dark:text-white text-sm">
                {notification.message}
              </p>
              <button
                onClick={() => setNotification(null)}
                className="ml-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <FaTimes size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  );
};
export default Contact;
