# Design QA: Erlebnis-Karten und Detailansicht

## Vergleichsbasis

- Ausgangszustand Karten: `.codex-audit/experience-kpis/01-summer-overview.png`
- Umsetzung Karten: `.codex-audit/experience-redesign/implementation-desktop-cards.png`
- Ausgangszustand Detail: `.codex-audit/experience-kpis/03-experience-detail-dialog.png`
- Umsetzung Detail: `.codex-audit/experience-redesign/implementation-desktop-detail-garnitzenklamm.png`
- Desktop: 1280 × 720 CSS-Pixel, 1280 × 720 Bild-Pixel, DPR 1
- Mobile: 390 × 844 CSS-Pixel, 390 × 844 Bild-Pixel, DPR 1
- Geprüfte Zustände: Kartenübersicht geschlossen; Detaildialog Garnitzenklamm geöffnet

## Visueller Abgleich

- Bestehende Bildsprache, Typografie, Farben, Overlays, Radien und Abstände bleiben erhalten.
- Die sechs gleichgewichteten Chips wurden auf drei scannbare Kernfakten mit Lucide-Icons reduziert.
- Die Detailansicht wurde verbreitert und ordnet Planung, Tourdaten und externe Links in klar beschriftete Zeilen.
- Desktop und Mobile haben keinen horizontalen Overflow; der Detaildialog scrollt auf kleinen Viewports innerhalb des Panels.
- Keine offenen visuellen P0-, P1- oder P2-Abweichungen.

## Interaktionsprüfung

- Klick auf eine Erlebnis-Karte öffnet die richtige Detailansicht.
- Öffnen nutzt bei unterstützten Browsern eine Shared-Image-View-Transition; andernfalls greift die Svelte-Fly/Fade-Animation.
- `prefers-reduced-motion` wird respektiert.
- Fokus wechselt beim Öffnen auf den Schließen-Button und nach Escape/Schließen zurück zur auslösenden Karte.
- Body-Scroll wird während des geöffneten Dialogs gesperrt und danach wiederhergestellt.
- Nach Korrektur der Close-Transition traten keine neuen Konsolenfehler auf.

## Vergleichshistorie

- Erste Detailanimation: nativer View-Transition-Aufruf auch beim Schließen führte zusammen mit dem Outro zu einem `InvalidStateError`.
- Korrektur: Shared-Image-Transition nur beim Öffnen; Schließen bleibt eine saubere Svelte-Outro-Animation.
- Erneuter Browser-Test: Öffnen, Escape, Fokus-Rückgabe, Scroll-Lock und responsive Darstellung erfolgreich.

## Ergänzung: Schnellnavigation

### Vergleichsbasis

- Ausgangszustand geschlossen: `.codex-audit/experience-nav/source-collapsed.png`
- Umsetzung geschlossen: `.codex-audit/experience-nav/implementation-collapsed.png`
- Bestehender geöffneter Zustand: `.codex-audit/experience-nav/source-expanded.png`
- Umsetzung geöffnet: `.codex-audit/experience-nav/implementation-expanded.png`
- Desktop: 1280 × 720 CSS-Pixel, 1280 × 720 Bild-Pixel, DPR 1

### Visueller und funktionaler Abgleich

- Typografie, Farben, Icons, Glasfläche, Radien und Schatten entsprechen dem bestehenden Panel.
- Der geschlossene Zustand bleibt visuell unverändert.
- Der geöffnete Zustand ist von 240 auf 272 Pixel verbreitert, damit lange Ziele trotz Scrollleiste vollständig lesbar bleiben.
- Die Höhe ist auf den verfügbaren Viewport begrenzt; Filter bleiben über einen dezenten internen Scrollbereich erreichbar.
- Full-View- und fokussierter Panelvergleich zeigen keine offenen visuellen P0-, P1- oder P2-Abweichungen.
- Ein weiterer Crop war nicht nötig, da Labels, Icons, aktive Zustände und Scrollleiste im 1280-Pixel-Vollbild klar lesbar sind.

### Interaktionsprüfung

- Ein Klick öffnet das Panel zuverlässig; ein weiterer Klick auf Schließen klappt es zuverlässig ein.
- Hover, Fokus und manuell angehefteter Zustand sind getrennt und konkurrieren nicht mehr miteinander.
- Fokuswechsel zwischen internen Buttons löst kein unbeabsichtigtes Schließen aus.
- Smooth-Scroll klappt das Panel nicht mehr während der Navigation ein.
- Winter und Traditionelle Feste wurden nacheinander sowie Traditionelle Feste wiederholt angeklickt; Zielposition und geöffneter Panelzustand blieben korrekt.
- Aktive Ziele werden sofort gesetzt; Sommer/Winter liefern zusätzlich `aria-current="location"`.
- Browser-Konsole: keine Fehler; nur der bereits bestehende lokale SvelteKit-Hinweis `Ignoring Event: localhost`.

### Vergleichshistorie

- P1 Ausgangsfehler: `focusin`, Toggle-Klick und Scroll-Handler schrieben konkurrierend denselben Open-State; dadurch wirkte der erste Klick häufig wirkungslos und Smooth-Scroll schloss das Panel sofort.
- Korrektur: getrennte Zustände für Hover, Fokus, angeheftetes Öffnen und explizites Schließen; Scroll aktualisiert nur noch das aktive Ziel.
- P2 Zwischenstand: die neue Viewport-Begrenzung verkürzte `Traditionelle Feste` durch die Scrollleiste.
- Korrektur: geöffnete Breite auf 272 Pixel erhöht und Scrollleiste visuell reduziert; erneuter Vergleich zeigt das Label vollständig.

final result: passed
