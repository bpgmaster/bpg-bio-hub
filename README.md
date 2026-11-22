# 🦁 Bloody Path Gaming — Bio-Hub & Deals Page
<!-- cspell:disable -->

> **Offizieller BPG Gaming-, Deal- & Community-Hub für TikTok, Instagram, Facebook & Discord**  
> Stand: 2026-10-25 | Autor: BPG Nexus Architect (`@bpg-nexus-architect`)  
> Pfad: `d:\Bisherige Projekte\To-Do-Liste aufarbeiten\TikTok Business und Shop\bpg-bio-hub\`

---

## 🌟 Übersicht & Architektur

Der **BPG Bio-Hub** ist eine extrem performante, mobile Web-Applikation (Single Page Application ohne externe Framework-Ballast), die speziell für die In-App-Browser von TikTok (`@lionspathgaming`), Instagram und Facebook optimiert wurde. Sie monetarisiert Gaming-Traffic über echte Affiliate-Partner, Creator-Codes und eigene UEFN-Content-Produktionen mit **strikt 0,00 € Werbekosten**.

### 💎 Design System & Visuals
* **Cyberpunk Blood-Red Theme:** Maßgeschneidertes BPG Dark-Mode-Design mit tiefschwarzem Hintergrund (`#090a0f`), feinstem Glassmorphism (`rgba(18, 20, 29, 0.75)` mit 14px Backdrop-Blur) und animierten Magma-Ambient-Orbs.
* **Dynamic Pointer Spotlight:** Auf allen Cards (`.deal-card`, `.creator-card`, `.map-showcase-card`) folgt ein dynamischer Radial-Glow dem Cursor bzw. dem Touch-Finger mit markenspezifischer Tönung:
  * ⚡ **Instant Gaming:** Warmes Neon-Orange
  * 💻 **notebooksbilliger.de:** Kräftiges Hardware-Amber
  * 🕹️ **Gamivo:** Cyberpunk-Cyan
  * 🎁 **Eneba:** Konsolen-Violett
  * 🎬 **Eklipse.gg AI:** Creator-Pink
  * ⚔️ **Creator Code:** Blood-Red Neon
  * 🏝️ **Fortnite UEFN Maps:** Toxic Emerald Green
  * 🌟 **BPG Epic Hub:** Epic Royal Blue
  * 🎨 **3D Assets:** Magma Gold
  * 💬 **Discord:** Community Blurple
* **Shimmer Sweep:** Beim Überfahren der Cards gleitet eine elegante, animierte Lichtreflex-Kante (`shimmerSweep`) über die Oberfläche.
* **Staggered Entrance Animation:** Beim Seitenaufruf faden alle Angebote kaskadierend mit sanfter Federungskurve ein.

---

## ⚡ Interaktive Power-Features

### 1. Dynamische Live-Kategorie-Filterung
* Klick auf die Kategorie-Chips (`🔥 Alle`, `🎮 Game-Keys`, `💻 Hardware`, `⚔️ Fortnite`, `🎬 Creator AI`, `🎨 3D Assets`, `💬 Community`) blendet Cards und Sektions-Header live und animiert ein bzw. aus (`.is-hidden`).
* Automatischer geschmeidiger Scroll in den gefilterten Bereich.

### 2. Web Audio API Sound Engine (0 externe Audio-Dateien)
* Völlig ohne externe MP3-Assets synthetisiert der Hub Sounds direkt im Browser über die native `AudioContext`-API:
  * **Sci-Fi Tap:** Knackiger Klick-Sound beim Antippen von Deals und Buttons.
  * **Harmonischer 4-Ton-Chime:** Aufsteigender Arpeggio-Akkord (C5, E5, G5, C6) beim Kopieren des Creator Codes, des Map Codes sowie beim Teilen.
  * **Filter-Whoosh:** Schneller Sweep-Sound beim Wechseln der Kategorien.
  * **Audio/Mute-Toggle:** Oben rechts in der Statusleiste mit speicherbarem Zustand (`localStorage: bpg_sound_enabled`).

### 3. 1-Tap Copy mit Haptik & Toast
* **Epic Creator Code:** Ein Klick auf die Creator-Card kopiert `BloodyPathGaming` in die Zwischenablage inklusive Smartphone-Vibration (`navigator.vibrate`) und dynamischer Toast-Benachrichtigung.
* **Exotic Gun Game Map-Code:** Schnellkopier-Button (`8440-7299-2792`) direkt auf dem Thumbnail der UEFN-Map.

### 4. Native Web Share API
* Ein-Klick-Teilen (`shareHubBtn`) nutzt auf mobilen Endgeräten das native Sharing-Menü des Betriebssystems (`navigator.share`) mit automatischem Fallback-Kopieren des Hub-Links.

### 5. Geheimes Studio Admin Analytics Dashboard
* **Triple-Tap-Trigger:** Ein Dreifach-Klick auf das BPG-Neon-Logo im Footer öffnet ein lokales Analytics-Dashboard mit genauen Klick-Zahlen, prozentualen Balken je Partner-Deal und Reset-Funktion.

### 6. Rechtssicherheit & DSGVO-Schutz (DE)
* Diskreter Footer-Link öffnet ein Glassmorphic-Modal mit:
  * Vollständigen Angaben gemäß § 5 DDG (Telemediengesetz)
  * Offiziellem Affiliate-Transparenzhinweis
  * DSGVO-Datenschutzerklärung (keine Tracking-Cookies, reine lokale Klickzählung)

---

## 💼 Integrierte Partner & Angebote (0,00 € Werbekosten)

1. 💻 **notebooksbilliger.de (NBB):** AWIN Partnerprogramm (`awinmid=11348`, `awinaffid=2572227`) mit 30-Tage-Cookie für Hardware, Gaming-PCs und Laptops.
2. ⚡ **Instant Gaming:** Partnerlink (`igr=bloodypathgaming`) für PC-, Steam-, PS5- & Xbox-Keys + automatischer dynamischer Live-Deals-Banner (`loader.js`).
3. 🕹️ **Gamivo:** Globaler Game-Marktplatz (`glv=bloodypathgaming`) mit offiziellem Vektorlogo.
4. 💳 **Eneba:** Vorbereitet für Konsolen-Guthabenkarten & Mystery Packs.
5. 🎬 **Eklipse.gg AI:** Partnerlink `https://eklipse.gg/premium#BPG` (KI-Highlight-Clipper für Streamer).
6. ⚔️ **Epic Games Creator Code:** `BloodyPathGaming` zur 100% kostenlosen Unterstützung im Fortnite Item-Shop & Epic Games Store.
7. 🏝️ **Fortnite UEFN Maps:** Exotic Gun Game (`8440-7299-2792`) mit Artwork-Banner und Link zum offiziellen BPG Creator Portal.
8. 🎨 **3D Game Assets:** Dev-Portfolio mit Bahamut VoidFlare AR-Render und Discord-Auftragsanfrage.
9. 💬 **BPG Discord & Socials:** Community Squad Server sowie Social-Icons für TikTok, Instagram, Facebook, Snapchat, YouTube, Twitch und Kick.

---

## 🚀 Lokale Vorschau & Testen

1. **Einfachste Methode:**  
   Doppelklicke auf [`index.html`](index.html), um den Hub direkt in Chrome, Edge oder Firefox anzusehen.
2. **Mit lokalem Entwicklungsserver:**  
   ```bash
   npx serve .
   ```

---

## 🌐 Kostenlos & 24/7 online schalten (0,00 € Budget)

Damit du die finale URL in die Bio von `@lionspathgaming` und deine Instagram-Profile eintragen kannst:

### Option A: Cloudflare Pages (Empfohlen — blitzschnell & unbegrenzt kostenlos)
1. Kostenlosen Account auf [pages.cloudflare.com](https://pages.cloudflare.com) anlegen.
2. Neues Projekt erstellen ➔ *Direct Upload* (Ordner `bpg-bio-hub` per Drag & Drop hochladen) ODER mit GitHub verbinden.
3. Du erhältst sofort eine kostenlose HTTPS-Adresse wie z. B. `bpg-hub.pages.dev`.

### Option B: GitHub Pages
1. Den Ordnerinhalt in ein GitHub-Repository hochladen.
2. In den Repository-Settings unter **Pages** den Branch `main` auswählen.
3. Seite ist erreichbar unter `https://<username>.github.io/<repo>/`.
