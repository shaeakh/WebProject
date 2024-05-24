CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20),
  reg_no VARCHAR(50),
  department VARCHAR(100),
  id_card_pic VARCHAR(255),
  user_pic VARCHAR(255),
  password VARCHAR(255) NOT NULL
);
