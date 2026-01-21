show databases ;
create DATABASE katalog_toko;

use katalog_toko;

show tables ;

create table user_admin(
                           user_id integer primary key not null auto_increment,
                           password varchar(255) not null,
                           status BOOLEAN DEFAULT TRUE,
                           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                           id_role int not null,

                           constraint fk_role_admin
                               foreign key (id_role) references role_admin(id_role)
                                   ON delete cascade
                                   on update cascade
);

create table role_admin(
                           id_role integer primary key auto_increment not null ,
                           nama_role varchar(255) not null ,
                           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create table kategori(
                         id_kategori integer primary key not null auto_increment,
                         nama_kategori varchar(255) not null,
                         deskripsi varchar(255),
                         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

create table brand_produk(
                             id_brand integer primary key not null ,
                             nama_brand varchar(255) not null ,
                             deskripsi varchar(255),
                             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                             status boolean default true
);

CREATE TABLE log (
                     id_log INT AUTO_INCREMENT PRIMARY KEY,
                     user_id INT NOT NULL,
                     method VARCHAR(10) NOT NULL,
                     deskripsi VARCHAR(255) NOT NULL,
                     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                     CONSTRAINT fk_log_user
                         FOREIGN KEY (user_id)
                             REFERENCES user_admin(user_id)
                             ON DELETE CASCADE
                             ON UPDATE CASCADE
);

create table produk(
                       id_produk integer auto_increment primary key ,
                       nama_produk varchar(255) not null ,
                       harga_produk integer not null ,
                       deskrpis varchar(255),
                       status boolean default true,
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                       id_kategori integer not null ,
                       id_brand integer not null ,
                       user_id integer not null,
                       CONSTRAINT fk_kategori_produk
                           foreign key (id_kategori)
                               references kategori(id_kategori)
                               on delete cascade
                               on update cascade,
                       constraint fk_brand_produk
                           foreign key (id_brand)
                               references brand_produk(id_brand)
                               on delete cascade
                               on update cascade,
                       constraint fk_user_produk
                           foreign key (user_id)
                               references user_admin(user_id)
                               on delete cascade
                               on update cascade

);


select * from role_admin;
delete from role_admin;


