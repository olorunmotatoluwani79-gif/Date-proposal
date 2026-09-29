import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Check, ChevronLeft, ChevronRight, Clock3, Heart, MapPin } from "lucide-react";
import { useMemo, useState } from "react";

import puppy from "@/assets/fluffy-puppy.jpg";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A Little Date Proposal" },
      { name: "description", content: "A sweet, playful invitation to plan the perfect date together." },
      { property: "og:title", content: "A Little Date Proposal" },
      { property: "og:description", content: "A sweet, playful invitation to plan the perfect date together." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const activities = [
  { label: "Pizza", icon: "🍕" },
  { label: "Sushi", icon: "🍣" },
  { label: "Burgers", icon: "🍔" },
  { label: "Pasta", icon: "🍝" },
  { label: "Tacos", icon: "🌮" },
  { label: "Ramen", icon: "🍜" },
];

const times = ["5:30 PM", "6:30 PM", "7:30 PM", "8:30 PM"];

function Index() {
  const [step, setStep] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 58, y: 50 });
  const [noAttempts, setNoAttempts] = useState(0);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("7:30 PM");
  const [activity, setActivity] = useState("Tacos");

  const formattedDate = useMemo(() => {
    if (!date) return "a day we both love";
    return new Intl.DateTimeFormat("en", { weekday: "long", month: "long", day: "numeric" }).format(
      new Date(`${date}T12:00:00`),
    );
  }, [date]);

  function dodgeNo() {
    setNoAttempts((attempts) => attempts + 1);
    setNoPosition({
      x: 8 + Math.floor(Math.random() * 66),
      y: 8 + Math.floor(Math.random() * 62),
    });
  }

  return (
    <main className="proposal-shell">
      <div className="paper-grain" aria-hidden="true" />
      <div className="floating-blooms" aria-hidden="true">
        {Array.from({ length: 12 }, (_, index) => (
          <span key={index} style={{ "--i": index } as React.CSSProperties}>✿</span>
        ))}
      </div>

      <section className="proposal-stage" aria-live="polite">
        <div className="brand-mark" aria-label="Made with love">
          <Heart aria-hidden="true" fill="currentColor" />
          <span>made for us</span>
        </div>

        {step === 0 && (
          <div className="scene scene-enter">
            <img className="puppy-portrait" src={puppy} alt="A tiny fluffy white puppy" width={1024} height={1024} />
            <p className="eyebrow">One tiny question…</p>
            <h1>Will you go on a date with me?</h1>
            <p className="support-copy">I promise good food, easy laughs, and your favorite company.</p>
            <div className="answer-arena">
              <Button className="yes-button" size="lg" onClick={() => setStep(1)}>
                YES <Heart fill="currentColor" aria-hidden="true" />
              </Button>
              <Button
                className="no-button"
                variant="secondary"
                size="lg"
                style={{ left: `${noPosition.x}%`, top: `${noPosition.y}%` }}
                onPointerEnter={dodgeNo}
                onFocus={dodgeNo}
                onClick={dodgeNo}
              >
                {noAttempts > 2 ? "still no?" : "no…"}
              </Button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="scene scene-enter">
            <div className="celebration-icon">🥹</div>
            <p className="eyebrow">Wait—you actually said yes!</p>
            <h1>I knew you had excellent taste.</h1>
            <p className="support-copy">Now let’s turn that very good decision into an actual plan.</p>
            <Button className="primary-action" size="lg" onClick={() => setStep(2)}>
              Plan our date <ChevronRight aria-hidden="true" />
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="scene scene-enter compact-scene">
            <div className="step-icon"><CalendarDays aria-hidden="true" /></div>
            <p className="eyebrow">Step 1 of 3</p>
            <h1>So… when are you free?</h1>
            <label className="field-label" htmlFor="date">Pick our day</label>
            <input
              id="date"
              className="date-field"
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
            <div className="footer-actions">
              <Button variant="ghost" onClick={() => setStep(1)} aria-label="Go back"><ChevronLeft /></Button>
              <Button className="primary-action" disabled={!date} onClick={() => setStep(3)}>Pick a time <ChevronRight /></Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="scene scene-enter compact-scene">
            <div className="step-icon"><Clock3 aria-hidden="true" /></div>
            <p className="eyebrow">Step 2 of 3</p>
            <h1>What time should I pick you up?</h1>
            <div className="choice-grid two-column">
              {times.map((option) => (
                <Button key={option} variant={time === option ? "default" : "outline"} onClick={() => setTime(option)}>
                  {time === option && <Check aria-hidden="true" />} {option}
                </Button>
              ))}
            </div>
            <div className="footer-actions">
              <Button variant="ghost" onClick={() => setStep(2)} aria-label="Go back"><ChevronLeft /></Button>
              <Button className="primary-action" onClick={() => setStep(4)}>Choose food <ChevronRight /></Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="scene scene-enter compact-scene">
            <div className="step-icon">🍽️</div>
            <p className="eyebrow">Step 3 of 3</p>
            <h1>What are we feeling?</h1>
            <div className="choice-grid food-grid">
              {activities.map((option) => (
                <Button
                  key={option.label}
                  className="food-choice"
                  variant={activity === option.label ? "default" : "outline"}
                  onClick={() => setActivity(option.label)}
                >
                  <span>{option.icon}</span>{option.label}
                </Button>
              ))}
            </div>
            <div className="footer-actions">
              <Button variant="ghost" onClick={() => setStep(3)} aria-label="Go back"><ChevronLeft /></Button>
              <Button className="primary-action" onClick={() => setStep(5)}>Make it official <Heart fill="currentColor" /></Button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="scene scene-enter final-scene">
            <div className="heart-burst"><Heart fill="currentColor" aria-hidden="true" /></div>
            <p className="eyebrow">It’s a date!</p>
            <h1>Can’t wait to see you.</h1>
            <div className="date-ticket">
              <div><CalendarDays aria-hidden="true" /><span><small>WHEN</small>{formattedDate}</span></div>
              <div><Clock3 aria-hidden="true" /><span><small>TIME</small>{time}</span></div>
              <div><MapPin aria-hidden="true" /><span><small>THE PLAN</small>{activity} and good company</span></div>
            </div>
            <p className="sign-off">See you there, cutie. ♡</p>
            <Button variant="ghost" onClick={() => setStep(0)}>Start over</Button>
          </div>
        )}

        <div className="progress-dots" aria-label={`Step ${step + 1} of 6`}>
          {Array.from({ length: 6 }, (_, index) => <span key={index} className={index === step ? "active" : ""} />)}
        </div>
      </section>
    </main>
  );
}
