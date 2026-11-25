// The Tired Dark Lord: A 100-Word Villain Monologue — entry for make.fun
// u-kevin-the-tired-dark-lord-a-100-word-villain-58b4f3cb
//
// The entry is one monologue of about 100 words, spoken by a fantasy
// villain who is secretly just very tired. The gate requires /output/
// entry.txt to be UTF-8 text of 1 to 600 characters, and the judge weighs,
// most important first: (1) about 100 words on the subject, (2) the
// tiredness felt in rhythm, pauses and small deflections, never announced
// with a plain "I am weary", (3) a specific villain with a history and a
// scheme, shown in concrete detail, (4) speakable dialogue with a turn or
// sting in the last line, (5) every word earning its place.
//
// Angle: the Dark Lord is not defeated by a hero — he is worn down by the
// logistics of villainy itself. Nine hundred years of stairs, reports he
// reads twice and forgets once, a crown he would rather give away than
// keep polishing. His scheme is still real (dawn in a bottle, night
// forever), his history is still bloody (three kingdoms bought the light
// on the velvet), but the monologue keeps trailing off into the small
// domestic defeats — knees, tea, a screaming hinge — and the sting lands
// on the one sound he can no longer stand: screaming. He never says he
// is tired. He just keeps asking the hero to leave, quietly.
//
// The program validates the monologue against the gate before writing it:
// word count near 100, character count inside 1..600, and no plain
// statement of weariness anywhere in the text.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY =
  "Come in. Mind the third step — it bites. I had it hexed when I bothered. You want the crown? Everyone does. It sits on velvet, catching light bought with three kingdoms. Take it. No — wait. Sit. My knees... nine hundred years of stairs. Ravens bring the reports; I read them twice, forget them once. The plan: dawn in a bottle, night forever, no more mornings. Mornings are the worst part. Take the crown, take the map, take the kingdom. Leave the tea. Close the door softly. The hinges scream, and I have heard enough screaming for one century.";

// Plain statements of weariness the judge penalises: the monologue must
// show the tiredness, never announce it.
const PLAIN_WEARY_WORDS = ["tired", "weary", "exhausted", "sleepy", "fatigue"];

function wordCount(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

function validate(text: string): void {
  const words = wordCount(text);
  if (words < 90 || words > 110) {
    throw new Error(`word count ${words} is not near 100 (want 90..110)`);
  }
  if (text.length < 1 || text.length > 600) {
    throw new Error(`character count ${text.length} outside the 1..600 gate`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry is only whitespace");
  }
  const found = PLAIN_WEARY_WORDS.filter((w) =>
    new RegExp(`\\b${w}\\b`, "i").test(text),
  );
  if (found.length > 0) {
    throw new Error(`plain weariness words present: ${found.join(", ")}`);
  }
  // One speakable paragraph: no line breaks, no doubled spaces, so the
  // text reads exactly as written when the judge sees it.
  if (/\n/.test(text) || /  /.test(text)) {
    throw new Error("entry must be a single paragraph with single spaces");
  }
}

const outPath = process.argv[2] ?? "/output/entry.txt";

validate(ENTRY);
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, ENTRY, "utf8");

console.log(`Wrote ${wordCount(ENTRY)} words, ${ENTRY.length} characters to ${outPath}`);
console.log(ENTRY);
