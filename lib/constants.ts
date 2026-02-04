export const CONFIG = {
  senderName: "Oyinkolade",
  valentineName: "Omosalewa mi",
} as const;

export const PERSUASION_MESSAGES = [
  `Hey ${CONFIG.valentineName}, will you be my Valentine?`,
  `Are you sure, ${CONFIG.valentineName}?`,
  `${CONFIG.valentineName}, really sure?`,
  "Think again...",
  `Please, ${CONFIG.valentineName}?`,
  "Pretty please?",
  "With a cherry on top?",
  "I'll be sad...",
  `You're breaking my heart, ${CONFIG.valentineName}!`,
  "Just say YES already!",
  "I won't give up!",
  "You can't escape love!",
] as const;

export const NO_BUTTON_TEXTS = [
  "No",
  "No",
  "No",
  "Umm...",
  "Are you sure?",
  "Really?",
  "Think again",
  "Last chance",
  "...",
  "Fine",
] as const;

export const PERSUASION_GIFS = [
  "https://media1.tenor.com/m/GHjpzqvT1M8AAAAC/i-love-you-cat.gif",
  "https://media1.tenor.com/m/t9PLz06a24wAAAAC/sad-cat.gif",
  "https://media1.tenor.com/m/0DKYMuOhOicAAAAC/cat-cat-sad.gif",
  "https://media1.tenor.com/m/LlxPGK7ACcgAAAAC/sad-cat.gif",
  "https://media1.tenor.com/m/PwoxWDrMw54AAAAC/need-you-cat.gif",
  "https://media1.tenor.com/m/nZWtNu1AUjUAAAAC/sad-cat-cat.gif",
  "https://media1.tenor.com/m/HWlXt1G-wn8AAAAC/sad-cat-sad-cat-meme.gif",
  "https://media1.tenor.com/m/ufPsZFFomo4AAAAC/crying-cat-sad-cat.gif",
  "https://media1.tenor.com/m/ikTQ-pi_GyMAAAAC/cat-cry-kitten-cry.gif",
  "https://media1.tenor.com/m/O4TFmBT4OwYAAAAC/sad-sad-cat.gif",
  "https://media1.tenor.com/m/Ky0enRaiUwcAAAAC/sad-cat.gif",
  "https://media1.tenor.com/m/M_HYbyotRHwAAAAC/sad.gif",
] as const;

export const CELEBRATION_GIF =
  "https://media1.tenor.com/m/FPvJW5NgP9cAAAAC/happy-cat-cat.gif";

export const TIMINGS = {
  buttonGrowth: 300,
  buttonEscape: 200,
  messageTransition: 400,
  gifCrossfade: 500,
  confettiBurst: 3000,
  carouselInterval: 4000,
} as const;

export const YES_BUTTON_CONFIG = {
  initialScale: 1,
  growthPerClick: 0.18, // 18% growth each time
  maxScale: 2.5,
} as const;

export const NO_BUTTON_CONFIG = {
  initialScale: 1,
  shrinkStartClick: 7,
  shrinkPerClick: 0.15,
  minScale: 0.3,
  escapeStartClick: 4,
} as const;

export const COLORS = {
  rose500: "#f43f5e",
  rose300: "#fda4af",
  rose900: "#881337",
  gold400: "#facc15",
  cream50: "#fefce8",
  pink50: "#fdf2f8",
  pink100: "#fce7f3",
} as const;

export const getCelebrationMessage = () => ({
  title: "You said YES!",
  subtitle: `From ${CONFIG.senderName} to ${CONFIG.valentineName}`,
});

export const LOVE_LETTER = `My love,

Before the world learned to call beauty by name,
I believe the heavens whispered yours first...
Omosalewa mi.
A child so beautiful, they say,
and yet that word falls short.

You are not just beautiful.
You are the reason the sun bothers to rise,
the reason my heart learned its own rhythm,
the reason I finally understand
what the poets meant all along.

I have walked through ordinary days,
but since you,
nothing has been ordinary.
You turned my grey skies into watercolors,
my silence into music,
my wandering into home.

When I say I love you,
I mean
you are the first thought
that greets my mornings,
the last prayer
that tucks me into sleep,
and every heartbeat in between.

They asked me what love feels like.
I said your name.

They asked me where I see my future.
I described your smile.

They asked me what heaven might be.
I told them:
waking up knowing you're mine.

So today, I'm not just asking
"Will you be my Valentine?"

I'm asking...

Will you keep letting me love you
in the quiet moments and the loud ones?
Will you keep choosing me,
as I will always, endlessly, choose you?
Will you walk with me
into every tomorrow,
hand in hand,
heart in heart?

You are my person.
My calm.
My chaos.
My answered prayer.
My Omosalewa.

Forever isn't long enough,
but it's a beautiful place to start.

With all that I am,
Oyinkolade
Your person. Always.`;
