import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SectionOneIntro } from "@/components/sections/SectionOneIntro";
import { WeddingEventVideoSection } from "@/components/wedding-invitation/WeddingEventVideoSection";
import { SectionWeddingCountdown } from "@/components/wedding-invitation/SectionWeddingCountdown";
import { SectionClosingRSVP } from "@/components/wedding-invitation/SectionClosingRSVP";
import { BackgroundMusic } from "@/components/wedding-invitation/BackgroundMusic";
import { RosePetalsShower } from "@/components/wedding-invitation/RosePetalsShower";
import { Navigation } from "@/components/Navigation";
import { weddingData } from "@/config/wedding";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [hasStartedIntro, setHasStartedIntro] = useState(false);
  const [hasFinishedIntro, setHasFinishedIntro] = useState(false);

  // Guarantee that on every fresh load or page refresh, it starts strictly from 0 (1-vid and Tap to Open)
  useEffect(() => {
    // 1. Disable browser's automatic scroll restoration
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // 2. Clear any lingering URL hashes (e.g. #countdown, #rsvp) that cause auto-jump
    if (typeof window !== "undefined" && window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }

    // 3. Immediately reset scroll position to the top
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });

    // Secondary reset after render to overcome any browser race conditions
    const rafId = requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });

    const onBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener("beforeunload", onBeforeUnload);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, []);

  // Strictly lock scrolling from page load until 1-vid finishes playing!
  // User cannot scroll past 1-vid until they tap "Tap to Open" and 1-vid finishes.
  useEffect(() => {
    if (!hasFinishedIntro) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.touchAction = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [hasFinishedIntro]);

  const handleVideoOneFinish = () => {
    setHasFinishedIntro(true);
  };

  const event2 = weddingData.events[0]; // 2-vid: Sukhmani Sahib Path
  const event3 = weddingData.events[1]; // 3-vid: Sagan Ceremony
  const event4 = weddingData.events[2]; // 4-vid: Cocktail & Mehndi
  const event5 = weddingData.events[3]; // 5-vid: Haldi & Chooda Ceremony
  const event6 = weddingData.events[4]; // 6-vid: Wedding Ceremony

  return (
    <div className="relative w-full bg-[#0a0205] font-body text-[#f5ebd7] overflow-x-hidden selection:bg-[#d4af37]/30 selection:text-white">
      {/* Background Music Player & Floating Music Controller (plays music.mp3 after tap, loops continuously) */}
      <BackgroundMusic hasStarted={hasStartedIntro} />

      {/* Rose Petals Showering Gracefully Across Entire Website — subtle, elegant quantity */}
      <RosePetalsShower active={hasFinishedIntro} count={16} />

      {/* Floating Section Navigation */}
      <Navigation />

      <main className="w-full flex flex-col">
        {/* 1. Website Opening – 1-vid with "Tap to Open Invitation" (strictly muted, plays once, never disappears, with Scroll Down prompt) */}
        <SectionOneIntro
          onOpen={() => setHasStartedIntro(true)}
          onFinish={handleVideoOneFinish}
        />

        {/* 2. Second Section – 2-vid: Sukhmani Sahib Path with Map Button (strictly muted, plays once) */}
        {event2 && (
          <WeddingEventVideoSection
            id={event2.id}
            videoSrc={event2.videoSrc}
            title={event2.title}
            date={event2.date}
            time={event2.time}
            venueName={event2.venueName}
            venueAddress={event2.venueAddress}
            mapUrl={event2.mapUrl}
            note={event2.note}
            badgeColor={event2.badgeColor}
          />
        )}

        {/* 3. Countdown Section (Immediately below 2-vid) */}
        <SectionWeddingCountdown />

        {/* 4. Third Section – 3-vid: Sagan Ceremony with Map Button (strictly muted, plays once) */}
        {event3 && (
          <WeddingEventVideoSection
            id={event3.id}
            videoSrc={event3.videoSrc}
            title={event3.title}
            date={event3.date}
            time={event3.time}
            venueName={event3.venueName}
            venueAddress={event3.venueAddress}
            mapUrl={event3.mapUrl}
            note={event3.note}
            badgeColor={event3.badgeColor}
          />
        )}

        {/* 5. Fourth Section – 4-vid: Cocktail & Mehndi with Map Button (strictly muted, plays once) */}
        {event4 && (
          <WeddingEventVideoSection
            id={event4.id}
            videoSrc={event4.videoSrc}
            title={event4.title}
            date={event4.date}
            time={event4.time}
            venueName={event4.venueName}
            venueAddress={event4.venueAddress}
            mapUrl={event4.mapUrl}
            note={event4.note}
            badgeColor={event4.badgeColor}
          />
        )}

        {/* 6. Fifth Section – 5-vid: Haldi & Chooda Ceremony with Map Button (strictly muted, plays once) */}
        {event5 && (
          <WeddingEventVideoSection
            id={event5.id}
            videoSrc={event5.videoSrc}
            title={event5.title}
            date={event5.date}
            time={event5.time}
            venueName={event5.venueName}
            venueAddress={event5.venueAddress}
            mapUrl={event5.mapUrl}
            note={event5.note}
            badgeColor={event5.badgeColor}
          />
        )}

        {/* 7. Sixth Section – 6-vid: Wedding Ceremony with Map Button (strictly muted, plays once) */}
        {event6 && (
          <WeddingEventVideoSection
            id={event6.id}
            videoSrc={event6.videoSrc}
            title={event6.title}
            date={event6.date}
            time={event6.time}
            venueName={event6.venueName}
            venueAddress={event6.venueAddress}
            mapUrl={event6.mapUrl}
            note={event6.note}
            badgeColor={event6.badgeColor}
          />
        )}

        {/* 8. Seventh Section – 7-vid: Presha's Blessing, Dadke & Nanke RSVP, Call & WhatsApp (strictly muted, plays once) */}
        <SectionClosingRSVP />
      </main>
    </div>
  );
}
