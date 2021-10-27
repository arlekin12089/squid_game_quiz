Kravsättning

Quizet ska innehålla 10 frågor.

Användaren ska utöver att besvara frågor för quizet, även kunna byta utseende på sidan till dark mode (dvs mörk bakgrundsfärg med ljus text ) och light mode (ljus bakgrundsfärg med mörk text).

Användaren ska kunna göra om quizet med hjälp av ett knapptryck (OBS! Skapa t.ex en knapp som du kan åstadkomma detta med, användaren ska ej behöva uppdatera med funktionalitet som är inbyggd i webbläsaren).

Uppgiften ska laddas upp på Github. Du behöver göra minst tre commits under arbetets gång.

VG

Under varje fråga ska det finnas minst tre svarsalternativ.

Om svaret var korrekt eller inte ska detta ej skrivas ut direkt när användaren väljer ett svarsalternativ.

Frågorna ska besvaras med <input type=”radio”> för svarsalternativen.

En fråga ska besvaras med checkboxar (minst tre svarsalternativ). För att få rätt på denna fråga, behöver samtliga rätta svarsalternativ vara ifyllda, varken fler eller mindre.

Längst ned i quizet ska det finnas en knapp med texten “Check answers”. När den klickas på, ska det visas hur många rätt användaren hade (ska skrivas ut i DOM:en). Om användaren har över hälften rätt, ska meddelandet stå i orange färg. Om användaren har över 75% rätt, ska meddelandet stå i grön färg.