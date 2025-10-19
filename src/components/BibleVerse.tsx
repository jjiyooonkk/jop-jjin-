"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  Sparkles,
  RefreshCw,
  Book,
  Languages,
  BookOpen,
  Share2,
  ExternalLink,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "sonner@2.0.3";

interface Verse {
  text: string;
  reference: string;
}

interface BibleVersions {
  [key: string]: {
    [key: string]: Verse[];
  };
}

const bibleVersions: BibleVersions = {
  en: {
    ESV: [
      {
        text: "For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope.",
        reference: "Jeremiah 29:11",
      },
      {
        text: "I can do all things through him who strengthens me.",
        reference: "Philippians 4:13",
      },
      {
        text: "Trust in the Lord with all your heart, and do not lean on your own understanding.",
        reference: "Proverbs 3:5",
      },
      {
        text: "Be strong and courageous. Do not be frightened, and do not be dismayed, for the Lord your God is with you wherever you go.",
        reference: "Joshua 1:9",
      },
      {
        text: "The Lord is my shepherd; I shall not want.",
        reference: "Psalm 23:1",
      },
      {
        text: "And we know that for those who love God all things work together for good.",
        reference: "Romans 8:28",
      },
      {
        text: "Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God.",
        reference: "Philippians 4:6",
      },
      {
        text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles.",
        reference: "Isaiah 40:31",
      },
      {
        text: "The Lord is my light and my salvation; whom shall I fear?",
        reference: "Psalm 27:1",
      },
      {
        text: "For God gave us a spirit not of fear but of power and love and self-control.",
        reference: "2 Timothy 1:7",
      },
    ],
    NIV: [
      {
        text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
        reference: "Jeremiah 29:11",
      },
      {
        text: "I can do all this through him who gives me strength.",
        reference: "Philippians 4:13",
      },
      {
        text: "Trust in the Lord with all your heart and lean not on your own understanding.",
        reference: "Proverbs 3:5",
      },
      {
        text: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
        reference: "Joshua 1:9",
      },
      {
        text: "The Lord is my shepherd, I lack nothing.",
        reference: "Psalm 23:1",
      },
      {
        text: "And we know that in all things God works for the good of those who love him.",
        reference: "Romans 8:28",
      },
      {
        text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.",
        reference: "Philippians 4:6",
      },
      {
        text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles.",
        reference: "Isaiah 40:31",
      },
      {
        text: "The Lord is my light and my salvation—whom shall I fear?",
        reference: "Psalm 27:1",
      },
      {
        text: "For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.",
        reference: "2 Timothy 1:7",
      },
    ],
    NKJV: [
      {
        text: "For I know the thoughts that I think toward you, says the Lord, thoughts of peace and not of evil, to give you a future and a hope.",
        reference: "Jeremiah 29:11",
      },
      {
        text: "I can do all things through Christ who strengthens me.",
        reference: "Philippians 4:13",
      },
      {
        text: "Trust in the Lord with all your heart, and lean not on your own understanding.",
        reference: "Proverbs 3:5",
      },
      {
        text: "Have I not commanded you? Be strong and of good courage; do not be afraid, nor be dismayed, for the Lord your God is with you wherever you go.",
        reference: "Joshua 1:9",
      },
      {
        text: "The Lord is my shepherd; I shall not want.",
        reference: "Psalm 23:1",
      },
      {
        text: "And we know that all things work together for good to those who love God.",
        reference: "Romans 8:28",
      },
      {
        text: "Be anxious for nothing, but in everything by prayer and supplication, with thanksgiving, let your requests be made known to God.",
        reference: "Philippians 4:6",
      },
      {
        text: "But those who wait on the Lord shall renew their strength; they shall mount up with wings like eagles.",
        reference: "Isaiah 40:31",
      },
      {
        text: "The Lord is my light and my salvation; whom shall I fear?",
        reference: "Psalm 27:1",
      },
      {
        text: "For God has not given us a spirit of fear, but of power and of love and of a sound mind.",
        reference: "2 Timothy 1:7",
      },
    ],
  },
  ko: {
    KRV: [
      {
        text: "여호와의 말씀이니라 너희를 향한 나의 생각을 내가 아나니 평안이요 재앙이 아니니라 너희에게 미래와 희망을 주는 것이니라",
        reference: "예레미아 29:11",
      },
      {
        text: "내게 능력 주시는 자 안에서 내가 모든 것을 할 수 있느니라",
        reference: "빌립보서 4:13",
      },
      {
        text: "너는 마음을 다하여 여호와를 신뢰하고 네 명철을 의지하지 말라",
        reference: "잠언 3:5",
      },
      {
        text: "내가 네게 명령한 것이 아니냐 강하고 담대하라 두려워하지 말며 놀라지 말라 네가 어디로 가든지 네 하나님 여호와가 너와 함께 하느니라",
        reference: "여호수아 1:9",
      },
      {
        text: "여호와는 나의 목자시니 내게 부족함이 없으리로다",
        reference: "시편 23:1",
      },
      {
        text: "우리가 알거니와 하나님을 사랑하는 자 곧 그의 뜻대로 부르심을 입은 자들에게는 모든 것이 합력하여 선을 이루느니라",
        reference: "로마서 8:28",
      },
      {
        text: "아무 것도 염려하지 말고 다만 모든 일에 기도와 간구로, 너희 구할 것을 감사함으�� 하나님께 아뢰라",
        reference: "빌립보서 4:6",
      },
      {
        text: "오직 여호와를 앙망하는 자는 새 힘을 얻으리니 독수리가 날개치며 올라감 같을 것이요",
        reference: "이사야 40:31",
      },
      {
        text: "여호와는 나의 빛이요 나의 구원이시니 내가 누구를 두려워하리요",
        reference: "시편 27:1",
      },
      {
        text: "하나님이 우리에게 주신 것은 두려워하는 마음이 아니요 오직 능력과 사랑과 절제하는 마음이니",
        reference: "디모데후서 1:7",
      },
    ],
    RNKSV: [
      {
        text: "나 주님이 말한다. 나는 너희를 위하여 내가 세운 계획이 무엇인지 잘 알고 있다. 그것은 재앙이 아니라 평화의 계획이다. 너희에게 희망찬 미래를 주려는 것이다.",
        reference: "예레미아 29:11",
      },
      {
        text: "내게 힘을 주시는 분 안에서, 나는 모든 것을 할 수 있습니다.",
        reference: "빌립보서 4:13",
      },
      {
        text: "마음을 다하여 주님을 의지하여라. 네 슬기만을 믿지 말아라.",
        reference: "잠언 3:5",
      },
      {
        text: "내가 너에게 명령한 것이 아니냐? 강하고 용감하게 행동하여라. 두려워하거나 떨지 말아라. 네가 어디로 가든지, 주 너의 하나님이 너와 함께 하신다.",
        reference: "여호수아 1:9",
      },
      {
        text: "주님은 나의 목자, 내게는 아쉬울 것 없어라.",
        reference: "시편 23:1",
      },
      {
        text: "하나님을 사랑하는 사람들, 곧 하나님의 계획에 따라 부르심을 받은 사람들에게는, 모든 일이 서로 협력하여 선을 이룬다는 것을 우리는 압니다.",
        reference: "로마서 8:28",
      },
      {
        text: "아무것도 걱정하지 말고, 모든 일을 오직 기도와 간구로 하고, 감사하는 마음으로 여러분이 바라는 바를 하나님께 아뢰십시오.",
        reference: "빌립보서 4:6",
      },
      {
        text: "오직 주님을 바라는 사람은 새 힘을 얻으리니, 그들은 독수리가 날개 치며 솟아오르듯 올라갈 것이다.",
        reference: "이사야 40:31",
      },
      {
        text: "주님은 나의 빛, 나의 구원, 내가 누구를 두려워하랴?",
        reference: "시편 27:1",
      },
      {
        text: "하나님께서 우리에게 주신 것은 두려워하는 영이 아니라, 능력과 사랑과 절제의 영입니다.",
        reference: "디모데후서 1:7",
      },
    ],
  },
};

type BibleState = "unopened" | "opening" | "opened";

export function BibleVerse() {
  const [state, setState] = useState<BibleState>("unopened");
  const [currentVerse, setCurrentVerse] =
    useState<Verse | null>(null);
  const [language, setLanguage] = useState<string>("en");
  const [version, setVersion] = useState<string>("ESV");

  const openBible = () => {
    if (state !== "unopened") return;

    setState("opening");
    const verses = bibleVersions[language][version];
    const randomVerse =
      verses[Math.floor(Math.random() * verses.length)];
    setCurrentVerse(randomVerse);

    // Show opening animation for 2 seconds, then reveal verse
    setTimeout(() => {
      setState("opened");
    }, 2000);
  };

  const getNewVerse = () => {
    setState("unopened");
    setCurrentVerse(null);
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    // Set default version for the language
    if (newLanguage === "en") {
      setVersion("ESV");
    } else if (newLanguage === "ko") {
      setVersion("KRV");
    }
  };

  const shareVerse = async () => {
    if (currentVerse) {
      const verseText = currentVerse.text;
      const verseReference = currentVerse.reference;
      const shareText = `Verse of the Day: "${verseText}" - ${verseReference}`;

      try {
        // Try modern clipboard API first
        if (
          navigator.clipboard &&
          navigator.clipboard.writeText
        ) {
          await navigator.clipboard.writeText(shareText);
          toast.success(
            language === "en"
              ? "Verse copied to clipboard!"
              : "말씀이 클립보드에 복사되었습니다!",
            {
              duration: 3000,
            },
          );
        } else {
          // Fallback for older browsers
          const textArea = document.createElement("textarea");
          textArea.value = shareText;
          textArea.style.position = "fixed";
          textArea.style.left = "-999999px";
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand("copy");
          document.body.removeChild(textArea);
          toast.success(
            language === "en"
              ? "Verse copied to clipboard!"
              : "말씀이 클립보드에 복사되었습니다!",
            {
              duration: 3000,
            },
          );
        }
      } catch (err) {
        console.error("Failed to copy:", err);
        toast.error(
          language === "en"
            ? "Failed to copy verse"
            : "말씀 복사에 실패했습니다",
          {
            duration: 3000,
          },
        );
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-amber-50/90 to-orange-50/80 backdrop-blur-sm">
      <AnimatePresence mode="wait">
        {state === "unopened" && (
          <motion.div
            key="unopened"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 0.6,
            }}
            className="flex flex-col items-center"
          >
            {/* Version and Language Selectors */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 mb-8 w-full max-w-sm"
            >
              <div className="flex-1">
                <Select
                  value={language}
                  onValueChange={handleLanguageChange}
                >
                  <SelectTrigger className="w-full bg-white/80 backdrop-blur-sm border-amber-200 hover:border-amber-300 transition-colors">
                    <div className="flex items-center gap-2">
                      <Languages className="w-4 h-4 text-amber-700" />
                      <SelectValue />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ko">
                      한국어 (Korean)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1">
                <Select
                  value={version}
                  onValueChange={setVersion}
                >
                  <SelectTrigger className="w-full bg-white/80 backdrop-blur-sm border-amber-200 hover:border-amber-300 transition-colors">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-amber-700" />
                      <SelectValue />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {language === "en" ? (
                      <>
                        <SelectItem value="ESV">ESV</SelectItem>
                        <SelectItem value="NIV">NIV</SelectItem>
                        <SelectItem value="NKJV">
                          NKJV
                        </SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="KRV">
                          개역한글 (KRV)
                        </SelectItem>
                        <SelectItem value="RNKSV">
                          개역개정 (RNKSV)
                        </SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                y: [0, -10, 0],
                rotate: [0, 1, -1, 0],
              }}
              transition={{
                y: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                rotate: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              onClick={openBible}
              className="cursor-pointer mb-8"
            >
              <div className="relative">
                {/* Bible Shadow */}
                <div className="absolute top-2 left-2 w-40 h-48 bg-black/20 rounded-lg blur-md" />

                {/* Bible Book */}
                <div className="relative w-40 h-48 bg-gradient-to-br from-amber-900 via-orange-900 to-amber-800 rounded-lg shadow-2xl border-4 border-amber-600/40">
                  {/* Spine highlight */}
                  <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-amber-950/50 to-transparent rounded-l-lg" />

                  {/* Gold cross decoration */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-12 h-16 relative">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-16 bg-gradient-to-b from-yellow-600 via-amber-500 to-yellow-600 rounded-full shadow-lg" />
                      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-2 bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-600 rounded-full shadow-lg" />
                    </div>
                  </div>

                  {/* Page edges */}
                  <div className="absolute right-0 top-3 bottom-3 w-1 bg-white/90 rounded-r" />
                  <div className="absolute right-1 top-4 bottom-4 w-0.5 bg-white/70" />
                  <div className="absolute right-2 top-5 bottom-5 w-0.5 bg-white/50" />

                  {/* Sparkle effects */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -top-2 -right-2"
                  >
                    <Sparkles className="w-6 h-6 text-yellow-400 drop-shadow-lg" />
                  </motion.div>
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -bottom-1 -left-2"
                  >
                    <Sparkles className="w-4 h-4 text-amber-400 drop-shadow-lg" />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center relative"
            >
              {/* Magical aura around title */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.2 }}
                transition={{ delay: 0.8, duration: 1.2 }}
                className="absolute inset-0 bg-gradient-to-r from-amber-200/30 via-orange-200/25 to-yellow-200/30 rounded-full blur-2xl transform scale-150"
              />

              {/* Orbiting sparkles around title */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1, 0.8, 1],
                    opacity: [0, 0.8, 0.6, 0.8],
                    rotate: 360,
                  }}
                  transition={{
                    scale: {
                      delay: 1 + i * 0.1,
                      duration: 0.8,
                    },
                    opacity: {
                      delay: 1 + i * 0.1,
                      duration: 0.8,
                    },
                    rotate: {
                      delay: 1.5,
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    },
                  }}
                  className="absolute"
                  style={{
                    left: `${50 + Math.cos((i * Math.PI * 2) / 8) * 80}%`,
                    top: `${50 + Math.sin((i * Math.PI * 2) / 8) * 60}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <Sparkles
                    className={`w-${i % 2 === 0 ? "3" : "2"} h-${i % 2 === 0 ? "3" : "2"} text-${i % 3 === 0 ? "amber" : i % 3 === 1 ? "orange" : "yellow"}-500/60`}
                  />
                </motion.div>
              ))}

              {/* Enhanced title with gradient and glow */}
              <motion.h1
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: 0.7,
                  duration: 0.8,
                  ease: "backOut",
                }}
                className="text-3xl mb-3 bg-gradient-to-r from-amber-800 via-orange-700 to-amber-900 bg-clip-text text-transparent relative z-10"
                style={{
                  filter:
                    "drop-shadow(0 2px 8px rgba(180, 83, 9, 0.3))",
                  textShadow:
                    "0 0 30px rgba(217, 119, 6, 0.4)",
                }}
              >
                <motion.span
                  animate={{
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {language === "en" ? "Holy Bible" : "성경"}
                </motion.span>
              </motion.h1>

              {/* Enhanced subtitle with shimmer effect */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="text-amber-800 mb-4 relative z-10"
                style={{
                  textShadow: "0 1px 3px rgba(0,0,0,0.1)",
                }}
              >
                <motion.span className="bg-clip-text">
                  {language === "en"
                    ? "Tap the Bible to open it!"
                    : "성경을 터치하여 열어보세요!"}
                </motion.span>
              </motion.p>

              {/* Enhanced magic text with pulsing border */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 }}
                className="relative z-10"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      "0 0 0 1px rgba(217, 119, 6, 0.2)",
                      "0 0 0 2px rgba(217, 119, 6, 0.4)",
                      "0 0 0 1px rgba(217, 119, 6, 0.2)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-50/80 to-orange-50/80 backdrop-blur-sm border border-amber-300/50"
                >
                  <motion.div
                    animate={{
                      rotate: 360,
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      rotate: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                      },
                      scale: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                  >
                    <Book className="w-4 h-4 text-amber-700" />
                  </motion.div>
                  <span className="text-sm text-amber-800 font-medium">
                    {language === "en"
                      ? "Divine wisdom awaits"
                      : "하나님의 지혜가 기다립니다"}
                  </span>
                  <motion.div
                    animate={{
                      rotate: -360,
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      rotate: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      },
                      scale: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5,
                      },
                    }}
                  >
                    <Sparkles className="w-4 h-4 text-amber-600" />
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {state === "opening" && (
          <motion.div
            key="opening"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            <motion.div
              animate={{
                rotateY: [0, 90],
              }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="relative mb-8"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Opening Bible with perspective */}
              <div className="relative w-40 h-48">
                {/* Left page */}
                <motion.div
                  animate={{ rotateY: [0, -90] }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  className="absolute left-0 w-20 h-48 bg-gradient-to-br from-amber-900 via-orange-900 to-amber-800 rounded-l-lg border-4 border-amber-600/40 overflow-hidden origin-right"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="absolute inset-2 bg-white/5 rounded" />
                </motion.div>

                {/* Right page */}
                <motion.div
                  animate={{ rotateY: [0, 90] }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  className="absolute right-0 w-20 h-48 bg-gradient-to-br from-amber-900 via-orange-900 to-amber-800 rounded-r-lg border-4 border-amber-600/40 overflow-hidden origin-left"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="absolute inset-2 bg-white/5 rounded" />
                </motion.div>

                {/* Light particles emanating */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      x: [0, (Math.random() - 0.5) * 100],
                      y: [0, (Math.random() - 0.5) * 100],
                    }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.1,
                      ease: "easeOut",
                    }}
                    className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-400 rounded-full"
                  />
                ))}
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.7, 1] }}
              transition={{ duration: 2 }}
              className="text-amber-800 text-center"
            >
              {language === "en"
                ? "Opening the Bible..."
                : "성경을 여는 중..."}
            </motion.p>
          </motion.div>
        )}

        {state === "opened" && currentVerse && (
          <motion.div
            key="opened"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              delay: 0.2,
            }}
            className="w-full max-w-md"
          >
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-amber-200 shadow-xl">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center mb-6 relative"
              >
                {/* Magical glow background */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.3 }}
                  transition={{ delay: 0.6, duration: 1 }}
                  className="absolute inset-0 bg-gradient-to-r from-amber-200/40 via-orange-200/40 to-yellow-200/40 rounded-full blur-xl"
                />

                {/* Floating sparkles */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [0, 1, 0.8, 1],
                      opacity: [0, 1, 0.7, 1],
                      y: [0, -20, 0, -15, 0],
                      x: [
                        0,
                        Math.sin(i) * 20,
                        0,
                        -Math.sin(i) * 15,
                        0,
                      ],
                    }}
                    transition={{
                      delay: 0.8 + i * 0.1,
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute"
                    style={{
                      left: `${20 + i * 12}%`,
                      top: `${10 + (i % 2) * 20}%`,
                    }}
                  >
                    <Sparkles
                      className={`w-${i % 2 === 0 ? "4" : "3"} h-${i % 2 === 0 ? "4" : "3"} text-${i % 3 === 0 ? "amber" : i % 3 === 1 ? "orange" : "yellow"}-500 drop-shadow-lg`}
                    />
                  </motion.div>
                ))}

                {/* Main book icon with complex animation */}
                <motion.div
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{
                    scale: [0, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    scale: {
                      delay: 0.5,
                      duration: 0.8,
                      ease: "backOut",
                    },
                    rotate: {
                      delay: 0.7,
                      duration: 0.6,
                      ease: "easeInOut",
                    },
                  }}
                  className="inline-block mb-4 relative z-10"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      filter: [
                        "brightness(1)",
                        "brightness(1.3)",
                        "brightness(1)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Book className="w-10 h-10 text-amber-700 drop-shadow-2xl" />
                  </motion.div>

                  {/* Pulsing ring around main icon */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [0.8, 1.5, 0.8],
                      opacity: [0.8, 0, 0.8],
                    }}
                    transition={{
                      delay: 0.8,
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 border-2 border-amber-500 rounded-full"
                  />
                </motion.div>

                {/* Enhanced title with gradient and glow */}
                <motion.h2
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: 0.7,
                    duration: 0.6,
                    ease: "backOut",
                  }}
                  className="text-2xl mb-4 bg-gradient-to-r from-amber-700 via-orange-700 to-amber-800 bg-clip-text text-transparent relative z-10"
                  style={{
                    filter:
                      "drop-shadow(0 2px 4px rgba(180, 83, 9, 0.3))",
                    textShadow:
                      "0 0 20px rgba(217, 119, 6, 0.4)",
                  }}
                >
                  <motion.span
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {language === "en"
                      ? "Today's Verse"
                      : "오늘의 말씀"}
                  </motion.span>
                </motion.h2>
              </motion.div>

              <motion.blockquote
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-center text-gray-700 mb-4 italic leading-relaxed"
              >
                "{currentVerse.text}"
              </motion.blockquote>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-center mb-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 1,
                    type: "spring",
                    stiffness: 500,
                    damping: 25,
                  }}
                  className="inline-block px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full border border-amber-300"
                >
                  <span className="text-amber-800 font-medium">
                    {currentVerse.reference}
                  </span>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="text-center space-y-4"
              >
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <Button
                    onClick={getNewVerse}
                    className="bg-gradient-to-r from-green-700 to-lime-700 hover:from-green-800 hover:to-lime-800 text-white px-6 py-2 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    {language === "en"
                      ? "Get Another Verse"
                      : "다른 말씀 보기"}
                  </Button>
                  <Button
                    onClick={shareVerse}
                    className="bg-gradient-to-r from-green-700 to-lime-700 hover:from-green-800 hover:to-lime-800 text-white px-6 py-2 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    {language === "en" ? "Share" : "공유"}
                  </Button>
                </div>

                {/* External Links */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.4 }}
                  className="flex flex-col gap-2 pt-4 border-t border-amber-100"
                >
                  <a
                    href="https://beta.thewordforum.org/ko/home"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 text-amber-800 rounded-lg transition-all duration-200 hover:shadow-md group"
                  >
                    <Book className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {language === "en"
                        ? "Study the Bible Deeply"
                        : "성경 깊이 공부하기"}
                    </span>
                    <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <a
                    href="https://9pt.ai.kr/chat/bible"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 text-amber-800 rounded-lg transition-all duration-200 hover:shadow-md group"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {language === "en"
                        ? "Ask Questions about the Bible"
                        : "성경 질문하기"}
                    </span>
                    <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </a>
                </motion.div>
              </motion.div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}