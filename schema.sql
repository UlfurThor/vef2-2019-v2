CREATE TABLE applications (
  -- TODO schema fyrir töflu
  id serial primary key,
  name varchar(64) not null,
  email varchar(64) not null,
  phone int not null,
  comment text not null,
  job varchar(64) not null,
  processed boolean DEFAULT false,
  created timestamp not null default current_timestamp,
  updated timestamp not null default current_timestamp
);
