"use client";
import React from 'react';

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
import { toast } from "sonner";

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
      // New Testament
      {
        text: "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.",
        reference: "John 3:16",
      },
      {
        text: "Jesus said to him, 'I am the way, and the truth, and the life. No one comes to the Father except through me.'",
        reference: "John 14:6",
      },
      {
        text: "And he said to him, 'You shall love the Lord your God with all your heart and with all your soul and with all your mind.'",
        reference: "Matthew 22:37",
      },
      {
        text: "But seek first the kingdom of God and his righteousness, and all these things will be added to you.",
        reference: "Matthew 6:33",
      },
      {
        text: "For where two or three are gathered in my name, there am I among them.",
        reference: "Matthew 18:20",
      },
      {
        text: "And we know that for those who love God all things work together for good, for those who are called according to his purpose.",
        reference: "Romans 8:28",
      },
      {
        text: "For I am sure that neither death nor life, nor angels nor rulers, nor things present nor things to come, nor powers, nor height nor depth, nor anything else in all creation, will be able to separate us from the love of God in Christ Jesus our Lord.",
        reference: "Romans 8:38-39",
      },
      {
        text: "For by grace you have been saved through faith. And this is not your own doing; it is the gift of God.",
        reference: "Ephesians 2:8",
      },
      {
        text: "And he said to me, 'My grace is sufficient for you, for my power is made perfect in weakness.'",
        reference: "2 Corinthians 12:9",
      },
      {
        text: "Therefore, if anyone is in Christ, he is a new creation. The old has passed away; behold, the new has come.",
        reference: "2 Corinthians 5:17",
      },
      // Isaiah
      {
        text: "But those who wait for the Lord shall renew their strength; they shall mount up with wings like eagles; they shall run and not be weary; they shall walk and not faint.",
        reference: "Isaiah 40:31",
      },
      {
        text: "For to us a child is born, to us a son is given; and the government shall be upon his shoulder, and his name shall be called Wonderful Counselor, Mighty God, Everlasting Father, Prince of Peace.",
        reference: "Isaiah 9:6",
      },
      {
        text: "Fear not, for I am with you; be not dismayed, for I am your God; I will strengthen you, I will help you, I will uphold you with my righteous right hand.",
        reference: "Isaiah 41:10",
      },
      {
        text: "When you pass through the waters, I will be with you; and through the rivers, they shall not overwhelm you; when you walk through fire you shall not be burned, and the flame shall not consume you.",
        reference: "Isaiah 43:2",
      },
      {
        text: "For I am the Lord your God who takes hold of your right hand and says to you, Do not fear; I will help you.",
        reference: "Isaiah 41:13",
      },
      // Psalms
      {
        text: "The Lord is my shepherd; I shall not want. He makes me lie down in green pastures. He leads me beside still waters.",
        reference: "Psalm 23:1-2",
      },
      {
        text: "The Lord is my light and my salvation; whom shall I fear? The Lord is the stronghold of my life; of whom shall I be afraid?",
        reference: "Psalm 27:1",
      },
      {
        text: "Be still, and know that I am God. I will be exalted among the nations, I will be exalted in the earth!",
        reference: "Psalm 46:10",
      },
      {
        text: "Create in me a clean heart, O God, and renew a right spirit within me.",
        reference: "Psalm 51:10",
      },
      {
        text: "I lift up my eyes to the hills. From where does my help come? My help comes from the Lord, who made heaven and earth.",
        reference: "Psalm 121:1-2",
      },
      {
        text: "I praise you, for I am fearfully and wonderfully made. Wonderful are your works; my soul knows it very well.",
        reference: "Psalm 139:14",
      },
      // Proverbs
      {
        text: "Trust in the Lord with all your heart, and do not lean on your own understanding. In all your ways acknowledge him, and he will make straight your paths.",
        reference: "Proverbs 3:5-6",
      },
      {
        text: "The fear of the Lord is the beginning of knowledge; fools despise wisdom and instruction.",
        reference: "Proverbs 1:7",
      },
      {
        text: "Commit your work to the Lord, and your plans will be established.",
        reference: "Proverbs 16:3",
      },
      {
        text: "A gentle answer turns away wrath, but a harsh word stirs up anger.",
        reference: "Proverbs 15:1",
      },
      {
        text: "The heart of man plans his way, but the Lord establishes his steps.",
        reference: "Proverbs 16:9",
      },
      // Ecclesiastes
      {
        text: "For everything there is a season, and a time for every matter under heaven.",
        reference: "Ecclesiastes 3:1",
      },
      {
        text: "Vanity of vanities, says the Preacher, vanity of vanities! All is vanity.",
        reference: "Ecclesiastes 1:2",
      },
      {
        text: "Remember also your Creator in the days of your youth, before the evil days come and the years draw near of which you will say, 'I have no pleasure in them.'",
        reference: "Ecclesiastes 12:1",
      },
      // Job
      {
        text: "And he said, 'Naked I came from my mother's womb, and naked shall I return. The Lord gave, and the Lord has taken away; blessed be the name of the Lord.'",
        reference: "Job 1:21",
      },
      {
        text: "I know that my Redeemer lives, and at the last he will stand upon the earth.",
        reference: "Job 19:25",
      },
      {
        text: "And the Lord restored the fortunes of Job, when he had prayed for his friends. And the Lord gave Job twice as much as he had before.",
        reference: "Job 42:10",
      },
      // Song of Songs
      {
        text: "I am my beloved's and my beloved is mine; he grazes among the lilies.",
        reference: "Song of Songs 6:3",
      },
      {
        text: "Set me as a seal upon your heart, as a seal upon your arm, for love is strong as death, jealousy is fierce as the grave. Its flashes are flashes of fire, the very flame of the Lord.",
        reference: "Song of Songs 8:6",
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
      // New Testament
      {
        text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
        reference: "John 3:16",
      },
      {
        text: "Jesus answered, 'I am the way and the truth and the life. No one comes to the Father except through me.'",
        reference: "John 14:6",
      },
      {
        text: "Jesus replied: 'Love the Lord your God with all your heart and with all your soul and with all your mind.'",
        reference: "Matthew 22:37",
      },
      {
        text: "But seek first his kingdom and his righteousness, and all these things will be given to you as well.",
        reference: "Matthew 6:33",
      },
      {
        text: "For where two or three gather in my name, there am I with them.",
        reference: "Matthew 18:20",
      },
      {
        text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
        reference: "Romans 8:28",
      },
      {
        text: "For I am convinced that neither death nor life, neither angels nor demons, neither the present nor the future, nor any powers, neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord.",
        reference: "Romans 8:38-39",
      },
      {
        text: "For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God.",
        reference: "Ephesians 2:8",
      },
      {
        text: "But he said to me, 'My grace is sufficient for you, for my power is made perfect in weakness.'",
        reference: "2 Corinthians 12:9",
      },
      {
        text: "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!",
        reference: "2 Corinthians 5:17",
      },
      // Isaiah
      {
        text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
        reference: "Isaiah 40:31",
      },
      {
        text: "For to us a child is born, to us a son is given, and the government will be on his shoulders. And he will be called Wonderful Counselor, Mighty God, Everlasting Father, Prince of Peace.",
        reference: "Isaiah 9:6",
      },
      {
        text: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.",
        reference: "Isaiah 41:10",
      },
      {
        text: "When you pass through the waters, I will be with you; and when you pass through the rivers, they will not sweep over you. When you walk through the fire, you will not be burned; the flames will not set you ablaze.",
        reference: "Isaiah 43:2",
      },
      {
        text: "For I am the Lord your God who takes hold of your right hand and says to you, Do not fear; I will help you.",
        reference: "Isaiah 41:13",
      },
      // Psalms
      {
        text: "The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters.",
        reference: "Psalm 23:1-2",
      },
      {
        text: "The Lord is my light and my salvation—whom shall I fear? The Lord is the stronghold of my life—of whom shall I be afraid?",
        reference: "Psalm 27:1",
      },
      {
        text: "He says, 'Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth.'",
        reference: "Psalm 46:10",
      },
      {
        text: "Create in me a pure heart, O God, and renew a steadfast spirit within me.",
        reference: "Psalm 51:10",
      },
      {
        text: "I lift up my eyes to the mountains—where does my help come from? My help comes from the Lord, the Maker of heaven and earth.",
        reference: "Psalm 121:1-2",
      },
      {
        text: "I praise you because I am fearfully and wonderfully made; your works are wonderful, I know that full well.",
        reference: "Psalm 139:14",
      },
      // Proverbs
      {
        text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
        reference: "Proverbs 3:5-6",
      },
      {
        text: "The fear of the Lord is the beginning of knowledge, but fools despise wisdom and instruction.",
        reference: "Proverbs 1:7",
      },
      {
        text: "Commit to the Lord whatever you do, and he will establish your plans.",
        reference: "Proverbs 16:3",
      },
      {
        text: "A gentle answer turns away wrath, but a harsh word stirs up anger.",
        reference: "Proverbs 15:1",
      },
      {
        text: "In their hearts humans plan their course, but the Lord establishes their steps.",
        reference: "Proverbs 16:9",
      },
      // Ecclesiastes
      {
        text: "There is a time for everything, and a season for every activity under the heavens.",
        reference: "Ecclesiastes 3:1",
      },
      {
        text: "'Meaningless! Meaningless!' says the Teacher. 'Utterly meaningless! Everything is meaningless.'",
        reference: "Ecclesiastes 1:2",
      },
      {
        text: "Remember your Creator in the days of your youth, before the days of trouble come and the years approach when you will say, 'I find no pleasure in them.'",
        reference: "Ecclesiastes 12:1",
      },
      // Job
      {
        text: "He said, 'Naked I came from my mother's womb, and naked I will depart. The Lord gave and the Lord has taken away; may the name of the Lord be praised.'",
        reference: "Job 1:21",
      },
      {
        text: "I know that my redeemer lives, and that in the end he will stand on the earth.",
        reference: "Job 19:25",
      },
      {
        text: "After Job had prayed for his friends, the Lord restored his fortunes and gave him twice as much as he had before.",
        reference: "Job 42:10",
      },
      // Song of Songs
      {
        text: "I am my beloved's and my beloved is mine; he browses among the lilies.",
        reference: "Song of Songs 6:3",
      },
      {
        text: "Place me like a seal over your heart, like a seal on your arm; for love is as strong as death, its jealousy unyielding as the grave. It burns like blazing fire, like a mighty flame.",
        reference: "Song of Songs 8:6",
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
      // New Testament
      {
        text: "For God so loved the world that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life.",
        reference: "John 3:16",
      },
      {
        text: "Jesus said to him, 'I am the way, the truth, and the life. No one comes to the Father except through Me.'",
        reference: "John 14:6",
      },
      {
        text: "Jesus said to him, 'You shall love the Lord your God with all your heart, with all your soul, and with all your mind.'",
        reference: "Matthew 22:37",
      },
      {
        text: "But seek first the kingdom of God and His righteousness, and all these things shall be added to you.",
        reference: "Matthew 6:33",
      },
      {
        text: "For where two or three are gathered together in My name, I am there in the midst of them.",
        reference: "Matthew 18:20",
      },
      {
        text: "And we know that all things work together for good to those who love God, to those who are the called according to His purpose.",
        reference: "Romans 8:28",
      },
      {
        text: "For I am persuaded that neither death nor life, nor angels nor principalities nor powers, nor things present nor things to come, nor height nor depth, nor any other created thing, shall be able to separate us from the love of God which is in Christ Jesus our Lord.",
        reference: "Romans 8:38-39",
      },
      {
        text: "For by grace you have been saved through faith, and that not of yourselves; it is the gift of God.",
        reference: "Ephesians 2:8",
      },
      {
        text: "And He said to me, 'My grace is sufficient for you, for My strength is made perfect in weakness.'",
        reference: "2 Corinthians 12:9",
      },
      {
        text: "Therefore, if anyone is in Christ, he is a new creation; old things have passed away; behold, all things have become new.",
        reference: "2 Corinthians 5:17",
      },
      // Isaiah
      {
        text: "But those who wait on the Lord shall renew their strength; they shall mount up with wings like eagles, they shall run and not be weary, they shall walk and not faint.",
        reference: "Isaiah 40:31",
      },
      {
        text: "For unto us a Child is born, unto us a Son is given; and the government will be upon His shoulder. And His name will be called Wonderful, Counselor, Mighty God, Everlasting Father, Prince of Peace.",
        reference: "Isaiah 9:6",
      },
      {
        text: "Fear not, for I am with you; be not dismayed, for I am your God. I will strengthen you, yes, I will help you, I will uphold you with My righteous right hand.",
        reference: "Isaiah 41:10",
      },
      {
        text: "When you pass through the waters, I will be with you; and through the rivers, they shall not overflow you. When you walk through the fire, you shall not be burned, nor shall the flame scorch you.",
        reference: "Isaiah 43:2",
      },
      {
        text: "For I, the Lord your God, will hold your right hand, saying to you, 'Fear not, I will help you.'",
        reference: "Isaiah 41:13",
      },
      // Psalms
      {
        text: "The Lord is my shepherd; I shall not want. He makes me to lie down in green pastures; He leads me beside the still waters.",
        reference: "Psalm 23:1-2",
      },
      {
        text: "The Lord is my light and my salvation; whom shall I fear? The Lord is the strength of my life; of whom shall I be afraid?",
        reference: "Psalm 27:1",
      },
      {
        text: "Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth!",
        reference: "Psalm 46:10",
      },
      {
        text: "Create in me a clean heart, O God, and renew a steadfast spirit within me.",
        reference: "Psalm 51:10",
      },
      {
        text: "I will lift up my eyes to the hills—from whence comes my help? My help comes from the Lord, who made heaven and earth.",
        reference: "Psalm 121:1-2",
      },
      {
        text: "I will praise You, for I am fearfully and wonderfully made; marvelous are Your works, and that my soul knows very well.",
        reference: "Psalm 139:14",
      },
      // Proverbs
      {
        text: "Trust in the Lord with all your heart, and lean not on your own understanding; in all your ways acknowledge Him, and He shall direct your paths.",
        reference: "Proverbs 3:5-6",
      },
      {
        text: "The fear of the Lord is the beginning of knowledge, but fools despise wisdom and instruction.",
        reference: "Proverbs 1:7",
      },
      {
        text: "Commit your works to the Lord, and your thoughts will be established.",
        reference: "Proverbs 16:3",
      },
      {
        text: "A soft answer turns away wrath, but a harsh word stirs up anger.",
        reference: "Proverbs 15:1",
      },
      {
        text: "A man's heart plans his way, but the Lord directs his steps.",
        reference: "Proverbs 16:9",
      },
      // Ecclesiastes
      {
        text: "To everything there is a season, a time for every purpose under heaven.",
        reference: "Ecclesiastes 3:1",
      },
      {
        text: "'Vanity of vanities,' says the Preacher; 'Vanity of vanities, all is vanity.'",
        reference: "Ecclesiastes 1:2",
      },
      {
        text: "Remember now your Creator in the days of your youth, before the difficult days come, and the years draw near when you say, 'I have no pleasure in them.'",
        reference: "Ecclesiastes 12:1",
      },
      // Job
      {
        text: "And he said: 'Naked I came from my mother's womb, and naked shall I return there. The Lord gave, and the Lord has taken away; blessed be the name of the Lord.'",
        reference: "Job 1:21",
      },
      {
        text: "For I know that my Redeemer lives, and He shall stand at last on the earth.",
        reference: "Job 19:25",
      },
      {
        text: "And the Lord restored Job's losses when he prayed for his friends. Indeed the Lord gave Job twice as much as he had before.",
        reference: "Job 42:10",
      },
      // Song of Songs
      {
        text: "I am my beloved's, and my beloved is mine. He feeds his flock among the lilies.",
        reference: "Song of Songs 6:3",
      },
      {
        text: "Set me as a seal upon your heart, as a seal upon your arm; for love is as strong as death, jealousy as cruel as the grave. Its flames are flames of fire, a most vehement flame.",
        reference: "Song of Songs 8:6",
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
      // 신약
      {
        text: "하나님이 세상을 이처럼 사랑하사 독생자를 주셨으니 이는 그를 믿는 자마다 멸망하지 않고 영생을 얻게 하려 하심이라",
        reference: "요한복음 3:16",
      },
      {
        text: "예수께서 이르시되 내가 곧 길이요 진리요 생명이니 나로 말미암지 않고는 아버지께로 올 자가 없느니라",
        reference: "요한복음 14:6",
      },
      {
        text: "예수께서 이르시되 네 마음을 다하고 목숨을 다하고 뜻을 다하여 주 너의 하나님을 사랑하라 하셨으니",
        reference: "마태복음 22:37",
      },
      {
        text: "너희는 먼저 그의 나라와 그의 의를 구하라 그리하면 이 모든 것을 너희에게 더하시리라",
        reference: "마태복음 6:33",
      },
      {
        text: "두 세 사람이 내 이름으로 모인 곳에는 나도 그들 중에 있느니라",
        reference: "마태복음 18:20",
      },
      {
        text: "우리가 알거니와 하나님을 사랑하는 자 곧 그의 뜻대로 부르심을 입은 자들에게는 모든 것이 합력하여 선을 이루느니라",
        reference: "로마서 8:28",
      },
      {
        text: "내가 확신하노니 사망이나 생명이나 천사들이나 권세자들이나 현재 일이나 장래 일이나 능력이나 높음이나 깊음이나 다른 어떤 피조물이라도 우리를 우리 주 그리스도 예수 안에 있는 하나님의 사랑에서 끊을 수 없으리라",
        reference: "로마서 8:38-39",
      },
      {
        text: "너희는 은혜에 의하여 믿음으로 말미암아 구원을 받았으니 이것은 너희에게서 난 것이 아니요 하나님의 선물이라",
        reference: "에베소서 2:8",
      },
      {
        text: "나에게 이르시기를 내 은혜가 네게 족하도다 이는 내 능력이 약한 데서 온전하여짐이라 하신지라",
        reference: "고린도후서 12:9",
      },
      {
        text: "그런즉 누구든지 그리스도 안에 있으면 새로운 피조물이라 이전 것은 지나갔으니 보라 새 것이 되었도다",
        reference: "고린도후서 5:17",
      },
      // 이사야
      {
        text: "오직 여호와를 앙망하는 자는 새 힘을 얻으리니 독수리가 날개치며 올라감 같을 것이요",
        reference: "이사야 40:31",
      },
      {
        text: "이는 한 아기가 우리에게 났고 한 아들을 우리에게 주신 바 되었는데 그 어깨에는 정사를 메었고 그 이름은 기묘자라, 모사라, 전능하신 하나님이라, 영존하시는 아버지라, 평강의 왕이라 할 것임이라",
        reference: "이사야 9:6",
      },
      {
        text: "두려워하지 말라 내가 너와 함께 함이라 놀라지 말라 나는 네 하나님이 됨이라 내가 너를 굳세게 하리라 참으로 너를 도와주리라 참으로 나의 의로운 오른손으로 너를 붙들리라",
        reference: "이사야 41:10",
      },
      {
        text: "네가 물 가운데로 지날 때에 내가 함께 할 것이라 강을 건널 때에 물이 너를 침몰시키지 못할 것이요 네가 불 가운데로 지날 때에 타지도 아니할 것이요 불꽃이 너를 사르지도 못하리라",
        reference: "이사야 43:2",
      },
      {
        text: "나 여호와 네 하나님이 네 오른손을 잡고 말하기를 두려워하지 말라 내가 너를 도와주리라 할 때에",
        reference: "이사야 41:13",
      },
      // 시편
      {
        text: "여호와는 나의 목자시니 내게 부족함이 없으리로다 그가 나를 푸른 풀밭에 누이시며 쉴 만한 물 가로 인도하시는도다",
        reference: "시편 23:1-2",
      },
      {
        text: "여호와는 나의 빛이요 나의 구원이시니 내가 누구를 두려워하리요 여호와는 내 생명의 능력이시니 내가 누구를 무서워하리요",
        reference: "시편 27:1",
      },
      {
        text: "가만히 하고 내가 하나님 됨을 알지어다 나는 만국에서 높임을 받을 것이요 땅에서 높임을 받으리라",
        reference: "시편 46:10",
      },
      {
        text: "하나님이여 내 속에 정한 마음을 창조하시고 내 안에 정직한 영을 새롭게 하소서",
        reference: "시편 51:10",
      },
      {
        text: "내가 산을 향하여 눈을 들리라 나의 도움이 어디서 올까 나의 도움은 천지를 지으신 여호와에게서로다",
        reference: "시편 121:1-2",
      },
      {
        text: "내가 주께 감사하옴은 나를 놀랍고 지으심이니 주의 행사가 기이함을 내 영혼이 잘 아나이다",
        reference: "시편 139:14",
      },
      // 잠언
      {
        text: "너는 마음을 다하여 여호와를 신뢰하고 네 명철을 의지하지 말라 너는 범사에 그를 인정하라 그리하면 네 길을 지도하시리라",
        reference: "잠언 3:5-6",
      },
      {
        text: "여호와를 경외하는 것이 지식의 시작이거늘 미련한 자는 지혜와 훈계를 멸시하느니라",
        reference: "잠언 1:7",
      },
      {
        text: "너의 일을 여호와께 맡기라 그리하면 너의 경영하는 것이 이루어지리라",
        reference: "잠언 16:3",
      },
      {
        text: "유순한 대답은 분노를 쉬게 하여도 과격한 말은 노를 격동하느니라",
        reference: "잠언 15:1",
      },
      {
        text: "사람이 마음으로 자기의 길을 계획할지라도 그 걸음을 인도하는 자는 여호와시니라",
        reference: "잠언 16:9",
      },
      // 전도서
      {
        text: "천하 만사가 기한이 있고 모든 목적이 이룰 때가 있나니",
        reference: "전도서 3:1",
      },
      {
        text: "전도자가 이르되 헛되고 헛되며 헛되고 헛되니 모든 것이 헛되도다",
        reference: "전도서 1:2",
      },
      {
        text: "너는 청년의 때에 너의 창조주를 기억하라 곧 곤고한 날이 이르기 전에, 나는 아무 낙이 없다고 할 해들이 가깝기 전에",
        reference: "전도서 12:1",
      },
      // 욥기
      {
        text: "이르되 내가 모태에서 벌거벗고 나왔사온즉 또한 벌거벗고 그리로 돌아가올지라 주신 자도 여호와시요 취하신 자도 여호와시오니 여호와의 이름이 찬송을 받으실지니이다",
        reference: "욥기 1:21",
      },
      {
        text: "내가 알기에는 나의 구속자가 살아 계시니 마지막에 그가 땅 위에 서실 것이라",
        reference: "욥기 19:25",
      },
      {
        text: "욥이 친구들을 위하여 기도하매 여호와께서 욥의 사로잡힘을 돌이키시고 여호와께서 욥에게 이전의 두 배나 주시니라",
        reference: "욥기 42:10",
      },
      // 아가서
      {
        text: "나는 내 사랑하는 자의 것이요 내 사랑하는 자는 나의 것이라 그는 백합화 가운데서 양떼를 먹이는 자로다",
        reference: "아가 6:3",
      },
      {
        text: "나를 인치듯이 네 마음에 인치고 네 팔에 인치라 사랑은 죽음 같이 강하고 질투는 음부 같이 잔인하며 불꽃같이 일어나니 곧 여호와의 불꽃이니라",
        reference: "아가 8:6",
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
      // 신약
      {
        text: "하나님께서 세상을 이처럼 사랑하셔서 외아들을 주셨으니, 이는 그를 믿는 사람마다 멸망하지 않고 영생을 얻게 하려는 것이다.",
        reference: "요한복음 3:16",
      },
      {
        text: "예수께서 이르시되 내가 곧 길이요 진리요 생명이니 나로 말미암지 않고는 아버지께로 올 자가 없느니라",
        reference: "요한복음 14:6",
      },
      {
        text: "예수께서 이르시되 네 마음을 다하고 목숨을 다하고 뜻을 다하여 주 너의 하나님을 사랑하라 하셨으니",
        reference: "마태복음 22:37",
      },
      {
        text: "너희는 먼저 그의 나라와 그의 의를 구하라 그리하면 이 모든 것을 너희에게 더하시리라",
        reference: "마태복음 6:33",
      },
      {
        text: "두 세 사람이 내 이름으로 모인 곳에는 나도 그들 중에 있느니라",
        reference: "마태복음 18:20",
      },
      {
        text: "우리가 알거니와 하나님을 사랑하는 자 곧 그의 뜻대로 부르심을 입은 자들에게는 모든 것이 합력하여 선을 이루느니라",
        reference: "로마서 8:28",
      },
      {
        text: "내가 확신하노니 사망이나 생명이나 천사들이나 권세자들이나 현재 일이나 장래 일이나 능력이나 높음이나 깊음이나 다른 어떤 피조물이라도 우리를 우리 주 그리스도 예수 안에 있는 하나님의 사랑에서 끊을 수 없으리라",
        reference: "로마서 8:38-39",
      },
      {
        text: "너희는 은혜에 의하여 믿음으로 말미암아 구원을 받았으니 이것은 너희에게서 난 것이 아니요 하나님의 선물이라",
        reference: "에베소서 2:8",
      },
      {
        text: "나에게 이르시기를 내 은혜가 네게 족하도다 이는 내 능력이 약한 데서 온전하여짐이라 하신지라",
        reference: "고린도후서 12:9",
      },
      {
        text: "그런즉 누구든지 그리스도 안에 있으면 새로운 피조물이라 이전 것은 지나갔으니 보라 새 것이 되었도다",
        reference: "고린도후서 5:17",
      },
      // 이사야
      {
        text: "오직 여호와를 앙망하는 자는 새 힘을 얻으리니 독수리가 날개치며 올라감 같을 것이요",
        reference: "이사야 40:31",
      },
      {
        text: "이는 한 아기가 우리에게 났고 한 아들을 우리에게 주신 바 되었는데 그 어깨에는 정사를 메었고 그 이름은 기묘자라, 모사라, 전능하신 하나님이라, 영존하시는 아버지라, 평강의 왕이라 할 것임이라",
        reference: "이사야 9:6",
      },
      {
        text: "두려워하지 말라 내가 너와 함께 함이라 놀라지 말라 나는 네 하나님이 됨이라 내가 너를 굳세게 하리라 참으로 너를 도와주리라 참으로 나의 의로운 오른손으로 너를 붙들리라",
        reference: "이사야 41:10",
      },
      {
        text: "네가 물 가운데로 지날 때에 내가 함께 할 것이라 강을 건널 때에 물이 너를 침몰시키지 못할 것이요 네가 불 가운데로 지날 때에 타지도 아니할 것이요 불꽃이 너를 사르지도 못하리라",
        reference: "이사야 43:2",
      },
      {
        text: "나 여호와 네 하나님이 네 오른손을 잡고 말하기를 두려워하지 말라 내가 너를 도와주리라 할 때에",
        reference: "이사야 41:13",
      },
      // 시편
      {
        text: "여호와는 나의 목자시니 내게 부족함이 없으리로다 그가 나를 푸른 풀밭에 누이시며 쉴 만한 물 가로 인도하시는도다",
        reference: "시편 23:1-2",
      },
      {
        text: "여호와는 나의 빛이요 나의 구원이시니 내가 누구를 두려워하리요 여호와는 내 생명의 능력이시니 내가 누구를 무서워하리요",
        reference: "시편 27:1",
      },
      {
        text: "가만히 하고 내가 하나님 됨을 알지어다 나는 만국에서 높임을 받을 것이요 땅에서 높임을 받으리라",
        reference: "시편 46:10",
      },
      {
        text: "하나님이여 내 속에 정한 마음을 창조하시고 내 안에 정직한 영을 새롭게 하소서",
        reference: "시편 51:10",
      },
      {
        text: "내가 산을 향하여 눈을 들리라 나의 도움이 어디서 올까 나의 도움은 천지를 지으신 여호와에게서로다",
        reference: "시편 121:1-2",
      },
      {
        text: "내가 주께 감사하옴은 나를 놀랍고 지으심이니 주의 행사가 기이함을 내 영혼이 잘 아나이다",
        reference: "시편 139:14",
      },
      // 잠언
      {
        text: "너는 마음을 다하여 여호와를 신뢰하고 네 명철을 의지하지 말라 너는 범사에 그를 인정하라 그리하면 네 길을 지도하시리라",
        reference: "잠언 3:5-6",
      },
      {
        text: "여호와를 경외하는 것이 지식의 시작이거늘 미련한 자는 지혜와 훈계를 멸시하느니라",
        reference: "잠언 1:7",
      },
      {
        text: "너의 일을 여호와께 맡기라 그리하면 너의 경영하는 것이 이루어지리라",
        reference: "잠언 16:3",
      },
      {
        text: "유순한 대답은 분노를 쉬게 하여도 과격한 말은 노를 격동하느니라",
        reference: "잠언 15:1",
      },
      {
        text: "사람이 마음으로 자기의 길을 계획할지라도 그 걸음을 인도하는 자는 여호와시니라",
        reference: "잠언 16:9",
      },
      // 전도서
      {
        text: "천하 만사가 기한이 있고 모든 목적이 이룰 때가 있나니",
        reference: "전도서 3:1",
      },
      {
        text: "전도자가 이르되 헛되고 헛되며 헛되고 헛되니 모든 것이 헛되도다",
        reference: "전도서 1:2",
      },
      {
        text: "너는 청년의 때에 너의 창조주를 기억하라 곧 곤고한 날이 이르기 전에, 나는 아무 낙이 없다고 할 해들이 가깝기 전에",
        reference: "전도서 12:1",
      },
      // 욥기
      {
        text: "이르되 내가 모태에서 벌거벗고 나왔사온즉 또한 벌거벗고 그리로 돌아가올지라 주신 자도 여호와시요 취하신 자도 여호와시오니 여호와의 이름이 찬송을 받으실지니이다",
        reference: "욥기 1:21",
      },
      {
        text: "내가 알기에는 나의 구속자가 살아 계시니 마지막에 그가 땅 위에 서실 것이라",
        reference: "욥기 19:25",
      },
      {
        text: "욥이 친구들을 위하여 기도하매 여호와께서 욥의 사로잡힘을 돌이키시고 여호와께서 욥에게 이전의 두 배나 주시니라",
        reference: "욥기 42:10",
      },
      // 아가서
      {
        text: "나는 내 사랑하는 자의 것이요 내 사랑하는 자는 나의 것이라 그는 백합화 가운데서 양떼를 먹이는 자로다",
        reference: "아가 6:3",
      },
      {
        text: "나를 인치듯이 네 마음에 인치고 네 팔에 인치라 사랑은 죽음 같이 강하고 질투는 음부 같이 잔인하며 불꽃같이 일어나니 곧 여호와의 불꽃이니라",
        reference: "아가 8:6",
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
      const shareText = language === "en" 
        ? `"${verseText}" (${version}) ${verseReference}`
        : `"${verseText}" (${version}) ${verseReference}`;

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
                          새번역 (RNKSV)
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
{language === "en" ? "Just open it!" : "Just open it!"}
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
                    ? "Touch the Bible or the button below!"
                    : "성경이나 아래 버튼을 터치해보세요!"}
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
                  onClick={openBible}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-50/80 to-orange-50/80 backdrop-blur-sm border border-amber-300/50 cursor-pointer hover:from-amber-100/80 hover:to-orange-100/80 transition-all duration-200"
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
                      ? "What word awaits today?"
                      : "오늘은 어떤 말씀이 기다리고 있을까?"}
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
                    className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-amber-900 px-6 py-2 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    {language === "en"
                      ? "Get Another Verse"
                      : "다른 말씀 보기"}
                  </Button>
                  <Button
                    onClick={shareVerse}
                    className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-amber-900 px-6 py-2 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    {language === "en" ? "Copy" : "복사하기"}
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
                    href="https://moimai.org/chat/bible"
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