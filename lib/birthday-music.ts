export const DEFAULT_BIRTHDAY_TRACKS = [
  {
    id: "mountain-happy-birthday",
    label: "Happy Birthday Celebration",
    artist: "The Mountain",
    url: "/birthday/music/the-mountain-happy-birthday.mp3",
  },
  {
    id: "happy-birthday-kitty",
    label: "Happy Birthday, My Kitty",
    artist: "Good B Music",
    url: "/birthday/music/happy-birthday-my-kitty.mp3",
  },
  {
    id: "happy-birthday-cheerful",
    label: "Cheerful Happy Birthday",
    artist: "Ikoliks AJ",
    url: "/birthday/music/ikoliks-happy-birthday.mp3",
  },
  {
    id: "happy-birthday-wishes",
    label: "Happy Birthday Wishes",
    artist: "Saavane",
    url: "/birthday/music/saavane-happy-birthday.mp3",
  },
] as const;

export function getDefaultBirthdayTrack(id: string) {
  return DEFAULT_BIRTHDAY_TRACKS.find((track) => track.id === id) || null;
}
