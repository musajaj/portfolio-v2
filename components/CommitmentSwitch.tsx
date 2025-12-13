import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ShoppingCart, Copy, ExternalLink, Gift } from "lucide-react";

// Particle component
const Particle: React.FC<{ index: number }> = ({ index }) => {
  const randomX = (Math.random() - 0.5) * 600; 
  const randomY = (Math.random() - 1) * 200 - 50; 
  const randomDelay = Math.random() * 0.2;
  const randomColor = Math.random() > 0.5 ? "#60a5fa" : "#ffffff"; 

  return (
    <motion.div
      initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
      animate={{ 
        x: randomX, 
        y: randomY, 
        opacity: 0, 
        scale: [0, 1.5, 0] 
      }}
      transition={{ 
        duration: 1.5, 
        ease: "easeOut", 
        delay: randomDelay 
      }}
      className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full z-0 pointer-events-none"
      style={{ backgroundColor: randomColor }}
    />
  );
};

// تعريف نوع البيانات المتوقعة
interface OfferConfig {
  isActive: boolean;
  title: string;
  discountCode: string;
  discountPercent: string;
  offerLink: string;
}

export default function CommitmentSwitch({ offer }: { offer?: OfferConfig }) {
  const [isOn, setIsOn] = useState(false);
  const [copied, setCopied] = useState(false);

  // استخدام البيانات من Sanity أو قيم افتراضية آمنة
  const config = {
    isActive: offer?.isActive ?? true, // افتراضياً مفعل
    title: offer?.title || "تم تفعيل عرض الطالب المميز!",
    code: offer?.discountCode || "STUDENT50",
    percent: offer?.discountPercent || "50%",
    link: offer?.offerLink || "#"
  };

  const toggleSwitch = () => {
    setIsOn(!isOn);
    if (isOn) setCopied(false);
  };

  const copyToClipboard = () => {
    if (!config.code) return;
    navigator.clipboard.writeText(config.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 px-4 relative z-10 flex flex-col items-center justify-center overflow-visible">
      
      <div className="text-center mb-12">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
          القرار بيدك. <span className="text-zinc-500">كيف تريد أن تدير حياتك؟</span>
        </h3>
      </div>

      {/* THE SWITCH CONTAINER */}
      <div 
        className="relative w-full max-w-[500px] h-24 rounded-full cursor-pointer select-none mb-8"
        onClick={toggleSwitch}
      >
        <motion.div
          className="absolute inset-0 rounded-full border border-white/5 shadow-inner overflow-hidden"
          animate={{
            backgroundColor: isOn ? "#2563eb" : "#27272a", 
            boxShadow: isOn ? "0 0 50px rgba(37, 99, 235, 0.4)" : "inset 0 0 20px rgba(0,0,0,0.5)"
          }}
          transition={{ duration: 0.5 }}
        >
          {isOn && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-500/20 blur-xl"
            />
          )}
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-between px-6 pointer-events-none z-10">
           <motion.div 
             animate={{ opacity: isOn ? 0 : 1, x: isOn ? -20 : 0 }}
             className="flex items-center gap-3 text-zinc-400 font-medium text-lg ml-4"
           >
             <X size={24} />
             <span>ما زلت أستخدم الورقة والقلم...</span>
           </motion.div>

           <motion.div 
             animate={{ opacity: isOn ? 1 : 0, x: isOn ? 0 : 20 }}
             className="flex items-center gap-3 text-white font-bold text-xl absolute right-8"
           >
             <span>أنا جاهز للتنظيم - اشترِ الآن</span>
             <ShoppingCart size={24} />
           </motion.div>
        </div>

        <motion.div
          className="absolute top-2 bottom-2 w-20 h-20 bg-white rounded-full shadow-2xl z-20 flex items-center justify-center"
          animate={{
            left: isOn ? "calc(100% - 5.5rem)" : "0.5rem",
            scale: isOn ? 1.1 : 1,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <motion.div
             animate={{ rotate: isOn ? 360 : 0, color: isOn ? "#2563eb" : "#52525b" }}
          >
            {isOn ? <Check size={32} strokeWidth={4} /> : <div className="w-2 h-8 bg-zinc-300 rounded-full" />}
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {isOn && Array.from({ length: 20 }).map((_, i) => (
            <Particle key={i} index={i} />
          ))}
        </AnimatePresence>
      </div>

      {/* --- بطاقة العرض (تظهر فقط إذا كان العرض مفعلاً في Sanity) --- */}
      <AnimatePresence>
        {isOn && config.isActive && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-full max-w-[500px] overflow-hidden"
          >
            <div className="bg-zinc-900/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6 mt-4 shadow-[0_0_40px_rgba(37,99,235,0.15)] flex flex-col items-center text-center gap-4">
              
              <div className="flex items-center gap-2 text-blue-400 font-bold text-lg">
                <Gift className="animate-bounce" size={20} />
                <span>{config.title}</span>
              </div>
              
              <p className="text-zinc-400 text-sm">
                لقد حصلت على خصم خاص بنسبة <span className="text-white font-bold">{config.percent}</span>. انسخ الكود واستخدمه عند الدفع.
              </p>

              {config.code && (
                <div className="flex items-center gap-2 w-full">
                  <div 
                    className="flex-1 bg-black/40 border border-white/10 rounded-xl p-3 font-mono text-xl tracking-widest text-white font-bold text-center cursor-pointer hover:border-blue-500/50 transition-colors relative group"
                    onClick={copyToClipboard}
                  >
                    {config.code}
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 group-hover:text-blue-400 transition-colors">
                      {copied ? <Check size={18} /> : <Copy size={18} />}
                    </span>
                  </div>
                </div>
              )}

              <a 
                href={config.link}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-blue-600/20"
              >
                <span>احصل على نسختك الآن</span>
                <ExternalLink size={18} />
              </a>

              {copied && (
                <motion.span 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
                  className="text-xs text-green-400 font-medium"
                >
                  تم نسخ الكود بنجاح!
                </motion.span>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}