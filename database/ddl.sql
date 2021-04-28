DROP DATABASE IF EXISTS musala;
CREATE DATABASE musala;

CREATE USER 'musalauser'@'localhost' IDENTIFIED BY '12345';

GRANT ALL PRIVILEGES ON * . * TO 'musalauser'@'localhost';
FLUSH PRIVILEGES;


create table musala.gateway
(
    id            bigint       not null primary key,
    ipv4          varchar(255) null,
    name          varchar(255) null,
    serial_number varchar(255) not null,
    constraint UK_ki3yedqxnooh4nmcdhcv8gut6 unique (serial_number)
);

create table musala.device
(
    id         bigint       not null primary key,
    created    datetime(6)  null,
    status     varchar(255) null,
    uid        bigint       not null,
    vendor     varchar(255) null,
    gateway_id bigint       not null,
    constraint UK_bym2ir5cd5feay02tryi5dv1a unique (uid),
    constraint FKq1cskqsy9nxmn4syxncvk1s0o foreign key (gateway_id) references gateway (id)
);

create table musala.hibernate_sequence
(
    next_val bigint null
);

