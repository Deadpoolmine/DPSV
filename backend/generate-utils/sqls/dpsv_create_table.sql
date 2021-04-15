/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2021-04-01 22:21:09                          */
/*==============================================================*/

/* 使用dpsv数据库 */
use dpsv;

/* 关闭外键约束 */
set foreign_key_checks = 0;

drop table if exists Comment;

drop table if exists User;

drop table if exists Video;

drop table if exists Bgm;

drop table if exists BgmGenre;

drop table if exists Favorites;

drop table if exists Follow;

drop table if exists Message;

drop table if exists Reply;

drop table if exists Search;

drop table if exists Thumb;

drop table if exists VideoGenre;

drop table if exists Video_VideoGenre;

drop table if exists Watch;

/*==============================================================*/
/* Table: Bgm                                                   */
/*==============================================================*/
create table Bgm
(
   bgm_id               bigint not null auto_increment,
   bgmgenre_id          bigint not null,
   bgm_title            varchar(40) not null,
   bgm_src              text not null,
   bgm_duration         time not null,
   bgm_author           varchar(100) not null,
   primary key (bgm_id)
);

alter table Bgm comment 'For Every User And Every Video, There could have Bgm';

/*==============================================================*/
/* Table: BgmGenre                                              */
/*==============================================================*/
create table BgmGenre
(
   bgmgenre_id          bigint not null auto_increment,
   bgmgenre_name        varchar(40) not null,
   bgmgenre_description varchar(500),
   primary key (bgmgenre_id)
);

alter table BgmGenre comment 'Bgm Genre';

/*==============================================================*/
/* Table: Comment                                               */
/*==============================================================*/
create table Comment
(
   comment_id           bigint not null auto_increment,
   video_id             bigint not null,
   user_id              bigint not null,
   comment_content      text not null,
   comment_date         date not null,
   comment_time         time not null,
   comment_reply_cnt    int not null,
   primary key (comment_id)
);

alter table Comment comment 'This is Entity Video Comment';

/*==============================================================*/
/* Table: Favorites                                             */
/*==============================================================*/
create table Favorites
(
   id                   bigint not null auto_increment,
   user_id              bigint not null,
   video_id             bigint not null,
   favorites_time       time not null,
   favorites_date       date not null,
   primary key (id)
);

alter table Favorites comment 'User can add some videos to his Favorites';


/*==============================================================*/
/* Table: Follow                                                */
/*==============================================================*/
create table Follow
(
   id                   bigint not null auto_increment,
   user_id              bigint not null,
   follow_user_id       bigint not null,
   follow_time          time not null,
   follow_date          date not null,
   primary key (id)
);

alter table Follow comment 'User can follow another User';

/*==============================================================*/
/* Table: Message                                               */
/*==============================================================*/
create table Message
(
   id                   bigint not null auto_increment,
   user_id              bigint not null,
   message_user_id      bigint not null,
   message_content      text not null,
   message_dt           datetime not null,
   primary key (id)
);

alter table Message comment 'Private Message ';

/*==============================================================*/
/* Table: Reply                                                 */
/*==============================================================*/
create table Reply
(
   id                   bigint not null auto_increment,
   reply_comment_id     bigint not null,
   comment_id           bigint not null,
   primary key (id)
);

alter table Reply comment 'One Comment could be another''s reply';

/*==============================================================*/
/* Table: Search                                                */
/*==============================================================*/
create table Search
(
   search_id          bigint not null auto_increment,
   user_id              bigint not null,
   search_content     varchar(100) not null,
   primary key (search_id)
);

alter table Search comment 'User Search Results Reserved';

/*==============================================================*/
/* Table: Thumb                                                 */
/*==============================================================*/
create table Thumb
(
   id                   bigint not null auto_increment,
   user_id              bigint not null,
   video_id             bigint not null,
   thumb_time           time not null,
   thumb_date           date not null,
   thumb_cnt            bigint not null,
   primary key (id)
);

alter table Thumb comment 'User Can like a Video';

/*==============================================================*/
/* Table: User                                                  */
/*==============================================================*/
create table User
(
   user_id              bigint not null auto_increment,
   user_name            char(12) not null,
   user_passwd          varchar(20) not null,
   user_description     varchar(150),
   user_nickname        varchar(20) not null,
   user_avatar          longblob,
   user_bg              text,
   user_followers_cnt   bigint,
   user_subscribers_cnt bigint,
   primary key (user_id)
);

alter table User comment 'This is Description of Entity User
';

/*==============================================================*/
/* Table: Video                                                 */
/*==============================================================*/
create table Video
(
   video_id             bigint not null auto_increment,
   bgm_id               bigint not null,
   user_id              bigint not null,
   video_title          varchar(40) not null,
   video_description    varchar(500),
   video_src            text not null,
   video_cover          longblob not null,
   video_create_dt      datetime not null,
   video_update_dt      datetime not null,
   video_delete_dt      datetime,
   video_duration       time not null,
   video_height         int,
   video_width          int,
   video_like_cnt       int,
   video_comment_cnt    int,
   video_watched_cnt    int,
   primary key (video_id)
);

alter table Video comment 'This is Description of Entity Video
';

/*==============================================================*/
/* Table: VideoGenre                                            */
/*==============================================================*/
create table VideoGenre
(
   videogenre_id        bigint not null auto_increment,
   videogenre_name      varchar(40) not null,
   videogenre_description varchar(500),
   primary key (videogenre_id)
);

alter table VideoGenre comment 'This is Video Genre';

/*==============================================================*/
/* Table: Video_VideoGenre                                      */
/*==============================================================*/
create table Video_VideoGenre
(
   id                   bigint not null auto_increment,
   videogenre_id        bigint not null,
   video_id             bigint not null,
   primary key (id)
);

alter table Video_VideoGenre comment 'Each Video Has Multiple Genre, Each Genre May Has Multiple V';

/*==============================================================*/
/* Table: Watch                                                 */
/*==============================================================*/
create table Watch
(
   id                   bigint not null auto_increment,		
   user_id              bigint not null,
   video_id             bigint not null,
   watch_time           time not null,
   watch_date           date not null,
   watch_duration       time not null,
   primary key (id)
);

alter table Watch comment 'Each User can watch video';

alter table Bgm add constraint FK_Bgm_BgmGenre foreign key (bgmgenre_id)
      references BgmGenre (bgmgenre_id) on delete restrict on update restrict;

alter table Comment add constraint FK_User_Comment foreign key (user_id)
      references User (user_id) on delete restrict on update restrict;

alter table Comment add constraint FK_Video_Comment foreign key (video_id)
      references Video (video_id) on delete restrict on update restrict;

alter table Favorites add constraint FK_Favorites foreign key (video_id)
      references Video (video_id) on delete restrict on update restrict;

alter table Favorites add constraint FK_Favorites2 foreign key (user_id)
      references User (user_id) on delete restrict on update restrict;

alter table Follow add constraint FK_Follow foreign key (follow_user_id)
      references User (user_id) on delete restrict on update restrict;

alter table Follow add constraint FK_Followed foreign key (user_id)
      references User (user_id) on delete restrict on update restrict;

alter table Message add constraint FK_Receive foreign key (message_user_id)
      references User (user_id) on delete restrict on update restrict;

alter table Message add constraint FK_Send foreign key (user_id)
      references User (user_id) on delete restrict on update restrict;

alter table Reply add constraint FK_Comment foreign key (comment_id)
      references Comment (comment_id) on delete restrict on update restrict;

alter table Reply add constraint FK_Reply foreign key (reply_comment_id)
      references Comment (comment_id) on delete restrict on update restrict;

alter table Search add constraint FK_User_Search foreign key (user_id)
      references User (user_id) on delete restrict on update restrict;

alter table Thumb add constraint FK_Thumb foreign key (video_id)
      references Video (video_id) on delete restrict on update restrict;

alter table Thumb add constraint FK_Thumb2 foreign key (user_id)
      references User (user_id) on delete restrict on update restrict;

alter table Video add constraint FK_User_Video foreign key (user_id)
      references User (user_id) on delete restrict on update restrict;

alter table Video add constraint FK_Video_Bgm foreign key (bgm_id)
      references Bgm (bgm_id) on delete restrict on update restrict;

alter table Video_VideoGenre add constraint FK_Video_VideoGenre foreign key (videogenre_id)
      references VideoGenre (videogenre_id) on delete restrict on update restrict;

alter table Video_VideoGenre add constraint FK_Video_VideoGenre2 foreign key (video_id)
      references Video (video_id) on delete restrict on update restrict;

alter table Watch add constraint FK_Watch foreign key (video_id)
      references Video (video_id) on delete restrict on update restrict;

alter table Watch add constraint FK_Watch2 foreign key (user_id)
      references User (user_id) on delete restrict on update restrict;

/* 启动外键约束 */            
set foreign_key_checks = 1;


