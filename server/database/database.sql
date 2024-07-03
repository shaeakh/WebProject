CREATE DATABASE webproject;

CREATE TABLE users (
  reg_no  VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  edu_mail VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20), 
  department VARCHAR(100) NOT NULL,
  user_pic_url VARCHAR(255),
  password VARCHAR(255) NOT NULL
);

CREATE TABLE tournament (
  tournament_id INT PRIMARY KEY AUTO_INCREMENT,
  tournament_name VARCHAR(200) NOT NULL,
  tournament_date DATE,
  sport_type VARCHAR(255) NOT NULL,
  reg_no VARCHAR(255) NOT NULL,
  player_base_coin int NOT NULL,
  per_team_coin int NOT NULL,
  tournament_logo_url VARCHAR(255),
  join_code VARCHAR(255) NOT NULL,
  FOREIGN KEY (reg_no) REFERENCES users (reg_no)
);

CREATE TABLE participated_tournament(
  tournament_id INT,
  reg_no VARCHAR(255) ,
  role VARCHAR(255) NOT NULL,
  FOREIGN KEY (reg_no) REFERENCES users (reg_no),
  FOREIGN KEY (tournament_id) REFERENCES tournament (tournament_id)
);

CREATE TABLE member_request (
  request_id INT PRIMARY KEY AUTO_INCREMENT,
  tournament_id INT,
  reg_no VARCHAR(50) ,
  role VARCHAR(255) NOT NULL,
  position VARCHAR(255) ,
  team_name VARCHAR(255) ,
  team_logo VARCHAR(300) ,
  FOREIGN KEY (reg_no) REFERENCES users (reg_no),
  FOREIGN KEY (tournament_id) REFERENCES tournament (tournament_id)
);

CREATE TABLE team (
  team_id INT PRIMARY KEY AUTO_INCREMENT,
  tournament_id INT,
  reg_no VARCHAR(50),
  team_name VARCHAR(255) ,
  team_logo VARCHAR(300) ,
  coin INT(255),
  FOREIGN KEY (reg_no) REFERENCES users (reg_no),
  FOREIGN KEY (tournament_id) REFERENCES tournament (tournament_id)
);


CREATE TABLE player (
  tournament_id INT,
  reg_no VARCHAR(50),
  team_id INT,
  position VARCHAR(255),
  player_price int,
  category VARCHAR(255),
  FOREIGN KEY (team_id) REFERENCES team (team_id),
  FOREIGN KEY (reg_no) REFERENCES users (reg_no) ,
  FOREIGN KEY (tournament_id) REFERENCES tournament (tournament_id) 
);

CREATE TABLE auction_page (
  tournament_id INT,      
  team_id INT NULL,            
  current_player_index INT NULL,     
  current_bid int NULL,        
  sold boolean NULL,           
  start boolean NULL,          
  pause boolean NULL, 
  FOREIGN KEY (team_id) REFERENCES team (team_id),
  FOREIGN KEY (tournament_id) REFERENCES tournament (tournament_id)
);
