# Birdsdb
Projektarbete inlämning 1

Som projekt 1 ska ni bygga:

¤ En REST-APIserver med en databas där man ska kunna:
1. Begära (request) data specifikt genom url query.
2. Lägga till, ta bort och ändra data i vår databas genom url query.

¤ En front end där man ska man ska kunna begära data genom ett html-formulär.

How to
----------

1. Ladda ner repositoryt

2. Packa up den zipade filen och dra mappen till terminalen

3. Kör "npm init", "npm install" och sedan "node index.js" för att starta servern - du är nu ansluten till port 8080

4. Öppna ett nytt fönster i terminalen och skriv "mongod"

5. Starta mongodb och postman clienten

6. Testa API:et genom att skicka in listan med fåglarna till databasen via postman: http://localhost:8080/api/insertbirds

7. Hämta listan sedan med: http://localhost:8080/api/get

PUT: http://localhost:8080/api/update

DELETE: http://localhost:8080/api/delete

8. Refresha 3partssystem i mongodb clienten, se sedan tabellen birds.

9. Du kan komma åt formuläret genom URL:en http://localhost:8080/form

/Joel
