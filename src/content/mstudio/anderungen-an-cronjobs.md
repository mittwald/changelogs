---
title: Änderungen an Cronjobs
date: '2025-12-17'
---
- Cronjobs werden jetzt direkt in der Projektumgebung ausgeführt. Dadurch sind sie in Tools wie `top` und `ps` sichtbar und steuerbar.
- Zusätzlich zu den bekannten Log-Dateien wird nun auch ein JSON-Logfile generiert, das Timestamps und den genutzten Standard-Stream (`stdout`, `stderr`) enthält. Diese Datei wird auch zur Anzeige im mStudio verwendet.
- Die plattformseitige Umstellung ist die Voraussetzung dafür, künftig weitere Konfiguration an Cronjobs zu ermöglichen (z.B. Zeitzone, Concurrency Policy).