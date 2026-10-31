create table machines (
  id serial primary key,
  name varchar(50) not null,
  location varchar(100) not null
);

create table sensor_readings (
  id serial primary key,
  machine_id int references machines(id),
  sensor1 float,
  sensor2 float,
  temperature float,
  vibration float,
  timestamp timestamp default now()
);

create table predictions (
  id serial primary key,
  machine_id int references machines(id),
  failure_risk float,
  predicted_on timestamp default now()
);