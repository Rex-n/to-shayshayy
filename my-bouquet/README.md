# A Bouquet For You

A small gift page. She taps a gift box, flowers burst across the screen, a
bouquet appears with floating hearts, a song plays, and a letter slides up.

It is plain HTML, CSS and JavaScript. No build step, no installs, no
dependencies.

## Files

```
index.html     the page structure
style.css      colors, layout and animations
script.js      settings, the bouquet drawing, hearts, burst, song
music/song.mp3 the song (you add or replace this file)
```

## Make it yours

Open `script.js`. The `SETTINGS` block at the top holds everything personal:

```js
const SETTINGS = {
  to: "Someone special",
  letter: ["First paragraph.", "Second paragraph."],
  from: "With love, your name",
  song: "music/song.mp3",
  bpm: 90,
  volume: 0.6
};
```

- `to` appears as "Dear ___,"; `from` is the sign-off.
- Each line in `letter` becomes one paragraph.
- Long letters are fine: the letter box scrolls on its own, with a "keep reading"
  hint until the reader reaches the end.
- `bpm` is the song's tempo. The hearts pulse to it, so set it to your song's
  real beats per minute.
- You can also personalize through the link, with no code changes:
  `https://YOUR-USERNAME.github.io/REPO/?to=Ana&from=Ben`

The flowers are lists near the top of section 2 in `script.js`. Each row is one
flower with its position, so you can move, add or remove them. Colors live in
`style.css` under "COLORS AS VARIABLES".

## Run it on your computer

1. Install Visual Studio Code and its **Live Server** extension.
2. Open this folder in VS Code (File, then Open Folder).
3. Right-click `index.html` and choose **Open with Live Server**.

Tap the gift to start the sequence. Browsers only allow sound after a tap, so
the song always starts from that tap.

## Publish it with GitHub Pages

1. Create a free GitHub account, then click **New repository**. Give it a name
   (this becomes part of the link) and set it to **Public**.
2. Click **Add file, then Upload files**. Drag in the CONTENTS of this folder
   (`index.html`, `style.css`, `script.js`, `README.md` and the `music`
   folder), then click **Commit changes**.
3. Open **Settings, then Pages**. Under **Build and deployment**, choose
   **Deploy from a branch**, pick `main` and `/ (root)`, and save.
4. Wait a minute or two. Your link appears at the top of that page:
   `https://YOUR-USERNAME.github.io/REPO-NAME/`

To change the link, rename the repository under Settings, then General. Do it
before you send the link, because the old address stops working.

To update the page later, open a file in the repository, click the pencil icon,
edit, and commit. The site refreshes in a minute or two.

## Good to know

- **It is unlisted, not private.** The repository is public, so anyone who finds
  it can read the files, including the letter and download the song. Do not put
  anything in it that you would not want a stranger to see. `index.html` asks
  search engines not to list the page, but that is only a request.
- **Music rights.** A commercial song in a public repository can be taken down.
  A royalty-free track is the safe choice. Keep the file name `song.mp3`, or
  change `song:` in `SETTINGS` to match.
- **File names are case-sensitive on GitHub.** `Song.mp3` and `song.mp3` are
  different files.
- **Phones.** Test on a phone before sending. Make sure the volume is up and
  silent mode is off. Opening the link in the normal browser works better than
  inside a chat app's built-in viewer.

## Troubleshooting

- **No sound:** check the file is at `music/song.mp3`, then open the browser
  console (F12) and look for "Song could not play".
- **Page is plain or unstyled:** the file names or folder layout do not match
  the list above.
- **Blank page on GitHub:** make sure `index.html` is at the top level of the
  repository, not inside another folder.
