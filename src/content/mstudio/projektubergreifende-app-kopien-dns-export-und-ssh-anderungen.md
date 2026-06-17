---
title: 'Projektübergreifende App-Kopien, DNS-Export und SSH-Änderungen'
date: '2023-11-08'
---
- **Apps** können nicht mehr nur innerhalb eines Projektes **kopiert** werden (z.B. zu Staging-/Entwicklungszwecken), sondern auch **projektübergreifend** (z.B. um sie als **Vorlage** zu verwenden). Im mStudio können Kopien innerhalb eines Space-Servers angestoßen werden, mithilfe unserer [API](https://api.mittwald.de/v2/docs/#/App/app-request-appinstallation-copy) können Apps in alle Projekte im gleichen Cluster kopiert werden.
- Die DNS-Einträge einer Domain oder eines vHost können nun als **Bind-Zonendatei** exportiert werden, um diese einfacher bei einem externen DNS-Provider zu konfigurieren.
- Die Domain-Verzeichnisauswahl wurde zur Fehlervermeidung abwärtskompatibel entfernt. Um weiterhin statische Dateien ausliefern zu können, kann die "Static App" genutzt werden. 
- Es gibt nun die Möglichkeit, das Ziel einer Domain zu entfernen.
- SSH-Verbindungen sind nur noch direkt zu einer App möglich, nicht mehr zum Projekt. Diese Änderung wurde abwärtskompatibel implementiert, sodass sich an bestehenden Setups nichts verändern wird.