CREATE TABLE applications (
  -- TODO schema fyrir töflu
  id serial primary key,
  name varchar(64) not null,
  email varchar(64) not null,
  phone varchar(64) not null,
  text text not null,
  job varchar(64) not null,
  finished varchar(64) not null

);
