CREATE DATABASE webproject;

CREATE TABLE users (
  reg_no VARCHAR(50)PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  edu_mail VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20) , 
  department VARCHAR(100) NOT NULL,
  user_pic LONGBLOB,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE tournament (
    tournament_id int PRIMARY KEY AUTO_INCREMENT,
    tournament_name VARCHAR(200) NOT NULL ,
    tournament_date date,
    sport_type VARCHAR(255) NOT NULL,
  	reg_no VARCHAR(255) NOT NULL,
   	player_base_coin varchar(100) not null,
  	per_team_coin VARCHAR(100) NOT NULL,
  	logo_pic LONGBLOB,
  	join_code VARCHAR(255) NOT NULL,
    FOREIGN KEY (reg_no) REFERENCES users (reg_no)
);

CREATE TABLE member_request ( 
  request_id int PRIMARY KEY AUTO_INCREMENT, 
  tournament_id int not null, 
  reg_no VARCHAR(50) NOT NULL, 
  role VARCHAR(255) NOT NULL , 
  FOREIGN KEY (reg_no) REFERENCES users (reg_no), 
  FOREIGN KEY (tournament_id) REFERENCES tournament (tournament_id) 
);

CREATE TABLE player (  
  tournament_id int not null, 
  reg_no VARCHAR(50) NOT NULL, 
  position VARCHAR(255) NOT NULL , 
  catagory varchar(255),
  FOREIGN KEY (reg_no) REFERENCES users (reg_no), 
  FOREIGN KEY (tournament_id) REFERENCES tournament (tournament_id) 
);

CREATE TABLE manager (  
  tournament_id int not null, 
  reg_no VARCHAR(50) NOT NULL, 
  team_name VARCHAR(255) NOT NULL ,
  team_logo LONGBLOB NOT NULL , 
  FOREIGN KEY (reg_no) REFERENCES users (reg_no), 
  FOREIGN KEY (tournament_id) REFERENCES tournament (tournament_id) 
);

CREATE TABLE team (  
  team_id int PRIMARY KEY AUTO_INCREMENT,
  tournament_id int not null, 
  reg_no VARCHAR(50) NOT NULL, 
  FOREIGN KEY (reg_no) REFERENCES users (reg_no), 
  FOREIGN KEY (tournament_id) REFERENCES tournament (tournament_id) 
);