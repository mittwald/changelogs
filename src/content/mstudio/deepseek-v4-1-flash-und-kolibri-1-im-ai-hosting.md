---
title: DeepSeek V4.1 Flash und Kolibri-1 im AI-Hosting
date: 2026-11-19
---
Im AI-Hosting stehen dir ab sofort zwei neue Modelle zur Verfügung: **DeepSeek-V4.1-Flash-1017** und **Kolibri-1**.

**DeepSeek-V4.1-Flash-1017** ist das größte Modell in unserem Angebot und unsere Empfehlung für Coding-Agenten.

- **1.048.576 Token Kontext**: Eine ganze Codebasis passt in eine Anfrage.
- **Reasoning in mehreren Stufen**: Mit `reasoning_effort` steuerst du, wie gründlich das Modell nachdenkt, von `none` bis `max`.
- **Bilder und Tool-Calling**: Das Modell versteht Bilder und ruft Tools für agentische Workflows auf.

**Kolibri-1** von Aleph Alpha ist ein Reasoning-Modell aus Deutschland, gebaut für Deutsch und Englisch.

- **Antworten, die nach Deutsch klingen**, nicht nach Übersetzung. Gut für deutschsprachige Assistenten, Texte und RAG über deutsche Dokumente.
- **1.048.576 Token Kontext** für lange Dokumente.
- **Reasoning-Tiefe wählbar**, von `none` für schnelle Antworten bis `high`.

Beide Modelle sind in der Testphase. Wir können sie kurzfristig abschalten, und Verhalten und Funktionsumfang können sich noch ändern. Für den Produktivbetrieb empfehlen wir Modelle mit dem Status Stable oder LTS, zum Beispiel Qwen3.8-27B-NVFP4.

DeepSeek-V4.1-Flash-1017 hat den Tokenfaktor 2, Kolibri-1 den Tokenfaktor 1.

**Bevor du die Modelle nutzen kannst, musst du ihnen zustimmen.** Öffne dazu im mStudio dein AI-Hosting. Im Dialog „Änderungen zustimmen“ stehen beide Modelle unter „Modelle werden hinzugefügt“. Nach deiner Zustimmung kannst du sie mit deinen bestehenden API-Keys verwenden.

Details, Parameter und Beispiele findest du in der Dokumentation zu [DeepSeek-V4.1-Flash-1017](https://developer.mittwald.de/de/docs/v2/platform/aihosting/models/deepseek-v4-1-flash-1017/) und [Kolibri-1](https://developer.mittwald.de/de/docs/v2/platform/aihosting/models/kolibri-1/).
