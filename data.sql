INSERT INTO User (name, password, picture_location) VALUES ('Leonardo', 'pizza', '/Leonardo.png');
INSERT INTO User (name, password, picture_location) VALUES ('Raphael', 'pizza', '/Raphael.png');
INSERT INTO User (name, password, picture_location) VALUES ('Donatello', 'pizza', '/Donatello.png');
INSERT INTO User (name, password, picture_location) VALUES ('Michelangelo', 'pizza', '/Michelangelo.png');

INSERT INTO Squad (name) VALUES ('TMNT');

INSERT INTO `Episode` VALUES (1,'TMNT','1990-03-24','/tmnt.mp3',4),(2,'TMNT II: The Secrets of the Ooze','1991-03-08','/tmnt2.mp3',4),(3,'TMNT III','1993-03-24','/tmnt3.mp3',4),(4,'TMNT','2007-03-21','/tmnt4.mp3',4);

INSERT INTO `Friend_Relationship` VALUES (1,1,2),(2,1,3),(3,1,4),(4,2,1),(5,2,3),(6,2,4),(7,3,1),(8,3,2),(9,3,4),(10,4,1),(11,4,2),(12,4,3);

INSERT INTO Squad_User (user_ID, squad_ID) VALUES (1, 1);
INSERT INTO Squad_User (user_ID, squad_ID) VALUES (2, 1);
INSERT INTO Squad_User (user_ID, squad_ID) VALUES (3, 1);
INSERT INTO Squad_User (user_ID, squad_ID) VALUES (4, 1);

INSERT INTO `Audio` VALUES (1,1,1,'/tmnt1/Leonardo.mp3'),(2,2,1,'/tmnt1/Michelangelo.mp3'),(3,3,1,'/tmnt1/Raphael.mp3'),(4,4,1,'/tmnt1/Donatello.mp3'),(5,1,2,'/tmnt2/Leonardo.mp3'),(6,2,2,'/tmnt2/Michelangelo.mp3'),(7,3,2,'/tmnt2/Raphael.mp3'),(8,4,2,'/tmnt2/Donatello.mp3');
