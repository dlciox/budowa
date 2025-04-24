# Jak wrzucić projekt na GitHub

1. Utwórz konto na GitHub (jeśli jeszcze nie masz) na https://github.com

2. Zainstaluj Git na swoim komputerze:
   - Pobierz z https://git-scm.com/downloads
   - Zainstaluj z domyślnymi ustawieniami

3. Skonfiguruj Git (w terminalu):
```bash
git config --global user.name "Twoja Nazwa"
git config --global user.email "twoj.email@example.com"
```

4. Zainicjuj repozytorium (w folderze projektu):
```bash
git init
```

5. Dodaj pliki do śledzenia:
```bash
git add .
```

6. Wykonaj pierwszy commit:
```bash
git commit -m "Pierwszy commit"
```

7. Utwórz nowe repozytorium na GitHub:
   - Wejdź na https://github.com
   - Kliknij "+" w prawym górnym rogu i wybierz "New repository"
   - Nazwij swoje repozytorium (np. "budowa")
   - Nie zaznaczaj opcji inicjalizacji z README
   - Kliknij "Create repository"

8. Połącz lokalne repo z GitHub:
```bash
git remote add origin https://github.com/TWOJA-NAZWA-UZYTKOWNIKA/NAZWA-REPO.git
git branch -M main
git push -u origin main
```

Gotowe! Twój projekt jest teraz na GitHubie.

### Przydatne komendy do dalszej pracy:

- Sprawdź status zmian: `git status`
- Dodaj nowe zmiany: `git add .`
- Zatwierdź zmiany: `git commit -m "Opis zmian"`
- Wyślij zmiany na GitHub: `git push`