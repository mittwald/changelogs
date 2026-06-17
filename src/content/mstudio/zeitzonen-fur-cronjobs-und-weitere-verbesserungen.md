---
title: 'Zeitzonen für Cronjobs und weitere Verbesserungen'
date: '2026-01-29'
---

Für Cronjobs lässt sich jetzt **pro Job eine eigene Zeitzone** für das Ausführungsintervall konfigurieren. Damit ist es (endlich) möglich, Cronjobs zuverlässig zu einer festen Uhrzeit laufen zu lassen – ohne dass bei der Umstellung zwischen Sommer- und Winterzeit manuell nachjustiert werden muss.

Zusätzlich haben wir ein paar Detailverbesserungen umgesetzt:

* **Exit-Code pro Ausführung:** Wird nun angezeigt und kann damit auch automatisiert über die **API** ausgewertet werden.
* **Verbesserter Ausführungsstatus:** Der Status ist aussagekräftiger und zeigt z. B. auch, wenn ein Cronjob in einen **Timeout** gelaufen ist.
