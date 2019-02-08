CREATE TABLE applications (
  -- TODO schema fyrir töflu
  id serial primary key,
  name varchar(64) not null,
  email varchar(64) not null,
  phone int not null,
  comment text not null,
  jobTitle varchar(64) not null, -- should have a external refrence table for this
  processed boolean DEFAULT false,
  created timestamp with time zone not null default current_timestamp,
  updated timestamp with time zone not null default current_timestamp
);
