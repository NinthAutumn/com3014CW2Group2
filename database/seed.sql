-- password = 123456
\c tinder;
insert into users(username,email,password,created_at,updated_at) 
values
('arif','test@arif.dev','$2a$10$s6y3J8FHPwqJVscnorpFoulI27GmCrTZafTc9ERn9dUKwPtQ74FE.',now(),now()),
('ai0011','ai00411@surrey.ac.uk','$2a$10$s6y3J8FHPwqJVscnorpFoulI27GmCrTZafTc9ERn9dUKwPtQ74FE.',now(),now()),
('test','test@surrey.ac.uk','$2a$10$s6y3J8FHPwqJVscnorpFoulI27GmCrTZafTc9ERn9dUKwPtQ74FE.',now(),now()),
('test2','test2@surrey.ac.uk','$2a$10$s6y3J8FHPwqJVscnorpFoulI27GmCrTZafTc9ERn9dUKwPtQ74FE.',now(),now()),
('test4','test4@surrey.ac.uk','$2a$10$s6y3J8FHPwqJVscnorpFoulI27GmCrTZafTc9ERn9dUKwPtQ74FE.',now(),now());

insert into shelters(name,description,email,phone_number,address,created_at,updated_at)  
values ('shelter1','shelter1 info','shelter1@shelter.com','0000000000','shelter1 location address',now(),now()),
('shelter2','shelter2 info','shelter2@shelter.com','0000000000','shelter2 location address',now(),now());

insert into user_shelters(user_id,shelter_id) 
values (3,1),(4,2);

insert into pets(name,description,image_url,age,shelter_id,created_at,updated_at) 
values
('pet1','pet 1 description','https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',5,1,now(),now()),
('pet2','pet 2 description','https://images.pexels.com/photos/406014/pexels-photo-406014.jpeg',0,1,now(),now()),
('pet3','pet 3 description','https://images.pexels.com/photos/850602/pexels-photo-850602.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',5,1,now(),now()),
('pet4','pet 4 description','https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',10,2,now(),now()),
('pet5','pet 5 description','https://images.pexels.com/photos/733416/pexels-photo-733416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',5,1,now(),now()),
('pet6','pet 6 description','https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',110,2,now(),now()),
('pet7','pet 7 description','https://images.pexels.com/photos/160846/french-bulldog-summer-smile-joy-160846.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',5,1,now(),now()),
('pet8','pet 8 description','https://images.pexels.com/photos/406014/pexels-photo-406014.jpeg',0,1,now(),now());
