---
title: 'Backup-Downloads mit Prüfsumme und neue App PHP-Worker'
date: '2025-03-14'
---

- **Backup-Downloads** enthalten nun eine **Prüfsumme** (SHA256) der Datei im `ETag`-Header. Diese kann genutzt werden, um die Vollständigkeit und Korrektheit des Downloads zu überprüfen.
- Es gibt eine **neue App "PHP-Worker"**. Die App kann zum Betrieb von **PHP-Anwendungen mit eigenem Server**, wie beispielsweise [ReactPHP](https://reactphp.org/) und [Laravel Reverb](https://reverb.laravel.com/), genutzt werden. Außerdem können mit ihr **Worker-Prozesse**, wie beispielsweise vom [Symfony Messenger](https://symfony.com/doc/current/messenger.html), betrieben werden. Eine ausführliche Dokumentation mit Beispielen steht im [Developer-Portal](https://developer.mittwald.de/de/docs/v2/platform/workloads/php-worker/) zur Verfügung.