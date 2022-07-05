insert into racun
values(nextval('racun_id_seq'),to_date ('19.01.2022', 'dd.mm.yyyy'), 'Kartica' );

insert into racun
values(nextval('racun_id_seq'),to_date ('22.01.2022', 'dd.mm.yyyy'), 'Gotovina' );

insert into racun
values(nextval('racun_id_seq'),to_date ('22.01.2022', 'dd.mm.yyyy'), 'Cek' );



insert into proizvodjac
values(nextval ('proizvodjac_id_seq'), 'Roventa', 'Narodnog Fronta 3, Beograd', '066549824');

insert into proizvodjac
values(nextval ('proizvodjac_id_seq'), 'Remington', 'Danila Kisa 71, Beograd', '0657855120');

insert into proizvodjac
values(nextval ('proizvodjac_id_seq'), 'Phillips', 'Arse Teodorovica 22, Beograd', '0621995844');

insert into proizvodjac
values(nextval ('proizvodjac_id_seq'), 'Gorenje', 'Maksima Gorkog 7', '0601195664');

insert into proizvod
values(nextval ('proizvod_id_seq'), 'Presa za kosu', '1');

insert into proizvod
values(nextval ('proizvod_id_seq'), 'Figaro', '1');

insert into proizvod
values(nextval ('proizvod_id_seq'), 'Fen', '1');

insert into proizvod
values(nextval ('proizvod_id_seq'), 'Presa za kosu', '2');

insert into proizvod
values(nextval ('proizvod_id_seq'), 'Figaro', '2');

insert into proizvod
values(nextval ('proizvod_id_seq'), 'Fen', '2');

insert into proizvod
values(nextval ('proizvod_id_seq'), 'Presa za kosu', '3');

insert into proizvod
values(nextval ('proizvod_id_seq'), 'Figaro', '3');

insert into proizvod
values(nextval ('proizvod_id_seq'), 'Fen', '3');

insert into proizvod
values(nextval ('proizvod_id_seq'), 'Presa za kosu', '4');

insert into proizvod
values(nextval ('proizvod_id_seq'), 'Figaro', '4');

insert into proizvod
values(nextval ('proizvod_id_seq'), 'Fen', '4');

insert into stavka_racuna
values (nextval('stavka_racuna_id_seq'), '1', '2', 'kolicina', '8500', '1', '10');

insert into stavka_racuna
values (nextval('stavka_racuna_id_seq'), '2', '1', 'kolicina', '7000', '3', '7');


insert into racun
values(-100 ,to_date ('13.02.2022', 'dd.mm.yyyy'), 'Kartica' );


insert into proizvodjac
values(-100, 'Roventa', 'Narodnog Fronta 7, Beograd', '066549823');

insert into proizvod
values(-100, 'Presa za kosu', '1');

insert into stavka_racuna
values (-100, '4', '1', 'kolicina', '4700', '2', '1');









