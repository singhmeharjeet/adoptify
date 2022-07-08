Please change to it1 branch for the final code of iteration 1.

The project was worked on by everyone. However, to avoid merge conflicts, we did the coding all on 1 machine (Meharjeet Singh's machine)
We worked on the code together either by pair programming or writing code ourselves and giving it to Mehar. That is why it is mainly
Mehar with GitLab activity. This was the process we chose for iteration 1 but we may change it for future iterations. 

We worked on a lot of other features like view posts, add posts, etc and we have some code to support it but we could not finish them off in 
time because we were having trouble getting used to React. React was completely new to us so we had a hard time getting everything to work in time.

Steps for creating local database "adoptify":
Step1:
create DATABASE adoptify;

Step 2:
\c adoptify;

Step 3:
create TABLE users(username text PRIMARY KEY, password text, firstname text, lastname text, phone text, email text, address text, profilepicture text, isadmin boolean);

Step 4:
create TABLE posts(postid serial PRIMARY KEY, pet_name text, pet_species text, pet_color text, images text[], description text, fk_username text, CONSTRAINT fk_username FOREIGN KEY(fk_username) REFERENCES users(username) ON DELETE CASCADE);
--> Please note that fk stands for foreign key and it connects the posts table to the users table using the username of the user

Step 5:
Populate the tables:
For users:
insert into users(username, password, firstname, lastname, profilePicture, phone, email, address, isadmin) VALUES ('harry.potter123@gmail.com', 'password123', 'Harry', 'Potter', 'imageProfileURL', '778-023-1234', 'imageProfileURL', 'Washington Street', false);

For posts:
insert into posts(pet_name, pet_species, pet_color, images, description, fk_username) VALUES ('Oreo', 'Cat', 'Black', ARRAY ['image1', 'image2'], 'This is our wonderful cat.', 'harry.potter123@gmail.com');
