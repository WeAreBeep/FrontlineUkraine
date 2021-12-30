"""checkin mssql schemas

Revision ID: 9e76e10b7227
Revises: d4867f3a4c0a
Create Date: 2021-12-30 16:00:45.951938

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9e76e10b7227'
down_revision = 'd4867f3a4c0a'
branch_labels = None
depends_on = None


def upgrade():
    op.get_bind().execute(
        """
create sequence "PpeTypes_Id_seq";

alter sequence "PpeTypes_Id_seq" owner to postgres;

create table "__RefactorLog"
(
    "OperationKey" uuid not null
        constraint "idx_20690_PK____Refact__D3AEFFDB8DF00E8E"
            primary key
);

alter table "__RefactorLog"
    owner to postgres;

create table "AspNetRoles"
(
    "Id"               text not null
        constraint "idx_20702_PK_AspNetRoles"
            primary key,
    "Name"             text,
    "NormalizedName"   text,
    "ConcurrencyStamp" text
);

alter table "AspNetRoles"
    owner to postgres;

create table "AspNetRoleClaims"
(
    "Id"         bigserial
        constraint "idx_20695_PK_AspNetRoleClaims"
            primary key,
    "RoleId"     text not null
        constraint fk_aspnetroleclaims_aspnetroles_roleid
            references "AspNetRoles"
            on delete cascade,
    "ClaimType"  text,
    "ClaimValue" text
);

alter table "AspNetRoleClaims"
    owner to postgres;

create index "idx_20695_IX_AspNetRoleClaims_RoleId"
    on "AspNetRoleClaims" ("RoleId");

create unique index "idx_20702_RoleNameIndex"
    on "AspNetRoles" ("NormalizedName")
    where ("NormalizedName" IS NOT NULL);

create table "AspNetUsers"
(
    "Id"                   text    not null
        constraint "idx_20729_PK_AspNetUsers"
            primary key,
    "UserName"             text,
    "NormalizedUserName"   text,
    "Email"                text,
    "NormalizedEmail"      text,
    "EmailConfirmed"       boolean not null,
    "PasswordHash"         text,
    "SecurityStamp"        text,
    "ConcurrencyStamp"     text,
    "PhoneNumber"          text,
    "PhoneNumberConfirmed" boolean not null,
    "TwoFactorEnabled"     boolean not null,
    "LockoutEnd"           timestamp with time zone,
    "LockoutEnabled"       boolean not null,
    "AccessFailedCount"    integer not null
);

alter table "AspNetUsers"
    owner to postgres;

create table "AspNetUserClaims"
(
    "Id"         bigserial
        constraint "idx_20710_PK_AspNetUserClaims"
            primary key,
    "UserId"     text not null
        constraint fk_aspnetuserclaims_aspnetusers_userid
            references "AspNetUsers"
            on delete cascade,
    "ClaimType"  text,
    "ClaimValue" text
);

alter table "AspNetUserClaims"
    owner to postgres;

create index "idx_20710_IX_AspNetUserClaims_UserId"
    on "AspNetUserClaims" ("UserId");

create table "AspNetUserLogins"
(
    "LoginProvider"       text not null,
    "ProviderKey"         text not null,
    "ProviderDisplayName" text,
    "UserId"              text not null
        constraint fk_aspnetuserlogins_aspnetusers_userid
            references "AspNetUsers"
            on delete cascade,
    constraint "idx_20717_PK_AspNetUserLogins"
        primary key ("LoginProvider", "ProviderKey")
);

alter table "AspNetUserLogins"
    owner to postgres;

create index "idx_20717_IX_AspNetUserLogins_UserId"
    on "AspNetUserLogins" ("UserId");

create table "AspNetUserRoles"
(
    "UserId" text not null
        constraint fk_aspnetuserroles_aspnetusers_userid
            references "AspNetUsers"
            on delete cascade,
    "RoleId" text not null
        constraint fk_aspnetuserroles_aspnetroles_roleid
            references "AspNetRoles"
            on delete cascade,
    constraint "idx_20723_PK_AspNetUserRoles"
        primary key ("UserId", "RoleId")
);

alter table "AspNetUserRoles"
    owner to postgres;

create index "idx_20723_IX_AspNetUserRoles_RoleId"
    on "AspNetUserRoles" ("RoleId");

create index "idx_20729_EmailIndex"
    on "AspNetUsers" ("NormalizedEmail");

create unique index "idx_20729_UserNameIndex"
    on "AspNetUsers" ("NormalizedUserName")
    where ("NormalizedUserName" IS NOT NULL);

create table "AspNetUserTokens"
(
    "UserId"        text not null
        constraint fk_aspnetusertokens_aspnetusers_userid
            references "AspNetUsers"
            on delete cascade,
    "LoginProvider" text not null,
    "Name"          text not null,
    "Value"         text,
    constraint "idx_20735_PK_AspNetUserTokens"
        primary key ("UserId", "LoginProvider", "Name")
);

alter table "AspNetUserTokens"
    owner to postgres;

create table "Audits"
(
    "Id"        bigserial
        constraint "idx_20741_PK_Audits"
            primary key,
    "Timestamp" timestamp with time zone not null,
    "UserName"  text,
    "TableName" text,
    "Action"    text,
    "KeyValues" text,
    "OldValues" text,
    "NewValues" text
);

alter table "Audits"
    owner to postgres;

create table "ContactSubmissions"
(
    "Id"        bigint                   not null
        constraint "idx_20747_PK_ContactSubmissions"
            primary key,
    "Name"      text,
    "Email"     text,
    "Message"   text,
    "EmailedTo" text,
    "Created"   timestamp with time zone not null
);

alter table "ContactSubmissions"
    owner to postgres;

create table "Needs"
(
    "Id"                 bigserial
        constraint "idx_20762_PK_Needs"
            primary key,
    "UshahidiId"         bigint,
    "Timestamp"          timestamp with time zone not null,
    "StatusId"           integer                  not null,
    "PublishAnonymously" boolean                  not null,
    "ContactName"        text                     not null,
    "JobTitle"           text,
    "Email"              text                     not null,
    "PhoneNumber"        text,
    "OrganisationName"   text,
    "Department"         text,
    "OrgTypeId"          integer                  not null,
    "OrgTypeOther"       text,
    "TownOrCity"         text,
    "TweetId"            bigint,
    "Postcode"           text                     not null,
    "TellUsMore"         text,
    "Latitude"           numeric,
    "Longitude"          numeric,
    "AddressLineOne"     text default ''::text    not null,
    "AddressLineTwo"     text default ''::text
);

alter table "Needs"
    owner to postgres;

create table "Notes"
(
    "Id"        bigserial
        constraint "idx_20770_PK_Notes"
            primary key,
    "Timestamp" timestamp with time zone not null,
    "UserId"    text                     not null
        constraint fk_notes_users
            references "AspNetUsers"
            on delete cascade,
    "Text"      text
);

alter table "Notes"
    owner to postgres;

create table "NeedNotes"
(
    "NeedId" bigint not null
        constraint fk_neednotes_needs
            references "Needs"
            on delete cascade,
    "NoteId" bigint not null
        constraint fk_neednotes_notes
            references "Notes"
            on delete cascade,
    constraint "idx_20753_PK_NeedNotes"
        primary key ("NeedId", "NoteId")
);

alter table "NeedNotes"
    owner to postgres;

create table "PostcodesRegions"
(
    "Postcode"    text     not null
        constraint "idx_20776_PK_PostcodesRegions"
            primary key,
    "NhsRegionId" smallint not null
);

alter table "PostcodesRegions"
    owner to postgres;

create table "PpeTypes"
(
    "Id"   smallint default nextval('frontlinelive."PpeTypes_Id_seq"'::regclass) not null
        constraint "idx_20782_PK_PpeTypes"
            primary key,
    "Name" text
);

alter table "PpeTypes"
    owner to postgres;

alter sequence "PpeTypes_Id_seq" owned by "PpeTypes"."Id";

create table "Suppliers"
(
    "Id"                bigserial
        constraint "idx_20797_PK_Suppliers"
            primary key,
    "UshahidiId"        bigint,
    "Timestamp"         timestamp with time zone not null,
    "StatusId"          integer                  not null,
    "Name"              text,
    "Description"       text,
    "SupplierTypeId"    integer                  not null,
    "SupplierTypeOther" text,
    "Email"             text,
    "Website"           text,
    "PhoneNumber"       text,
    "ContactName"       text,
    "Postcode"          text                     not null,
    "TellUsMore"        text,
    "Latitude"          numeric,
    "Longitude"         numeric,
    "CapacityNotes"     text
);

alter table "Suppliers"
    owner to postgres;

create table "NeedPpeTypes"
(
    "NeedId"               bigint   not null
        constraint fk_needppetypes_needs
            references "Needs"
            on delete cascade,
    "PpeTypeId"            smallint not null
        constraint fk_needppetypes_ppetypes
            references "PpeTypes"
            on delete cascade,
    "PpeTypeOther"         text,
    "DailyShortage"        integer,
    "DailyShortageForWhom" text,
    "StatusId"             integer  not null,
    "SupplierId"           bigint
        constraint fk_needppetypes_suppliers
            references "Suppliers"
            on delete cascade,
    "SupplierOther"        text,
    "DateClosed"           timestamp with time zone,
    constraint "idx_20756_PK_NeedPpeTypes"
        primary key ("NeedId", "PpeTypeId")
);

alter table "NeedPpeTypes"
    owner to postgres;

create table "SupplierNotes"
(
    "SupplierId" bigint not null
        constraint fk_suppliernotes_needs
            references "Suppliers"
            on delete cascade,
    "NoteId"     bigint not null
        constraint fk_suppliernotes_notes
            references "Notes"
            on delete cascade,
    constraint "idx_20788_PK_SupplierNotes"
        primary key ("SupplierId", "NoteId")
);

alter table "SupplierNotes"
    owner to postgres;

create table "SupplierPpeTypes"
(
    "SupplierId"                    bigint   not null
        constraint fk_supplierppetypes_suppliers
            references "Suppliers"
            on delete cascade,
    "PpeTypeId"                     smallint not null
        constraint fk_supplierppetypes_ppetypes
            references "PpeTypes"
            on delete cascade,
    "PpeTypeOther"                  text,
    "CostTypeId"                    integer  not null,
    "CostTypeOther"                 text,
    "CapacityPerWeek"               integer  not null,
    "CurrentStock"                  integer  not null,
    "LeadTimeInDays"                integer  not null,
    "Notes"                         text,
    "MeetsRegulatoryRequirementsId" integer  not null,
    constraint "idx_20791_PK_SupplierPpeTypes"
        primary key ("SupplierId", "PpeTypeId")
);

alter table "SupplierPpeTypes"
    owner to postgres;

create view "Requests"
            ("Id", "Timestamp", "UshahidiId", "StatusId", "ContactName", "OrganisationName", "Email", "PhoneNumber",
             "Department", "JobTitle", "OrgTypeId", "OrgTypeOther", "AddressLineOne", "AddressLineTwo", "Postcode",
             "TownOrCity", "TweetId", "Longitude", "Latitude", "TellUsMore", "PpeTypeId", "PpeTypeOther",
             "DailyShortage", "DailyShortageForWhom", "PpeStatusId", "SupplierId", "SupplierOther", "DateClosed",
             "SupplierName", "NoteText", "NoteTimestamp", "NoteAuthor")
as
SELECT "Needs"."Id",
       "Needs"."Timestamp",
       "Needs"."UshahidiId",
       "Needs"."StatusId",
       "Needs"."ContactName",
       "Needs"."OrganisationName",
       "Needs"."Email",
       "Needs"."PhoneNumber",
       "Needs"."Department",
       "Needs"."JobTitle",
       "Needs"."OrgTypeId",
       "Needs"."OrgTypeOther",
       "Needs"."AddressLineOne",
       "Needs"."AddressLineTwo",
       "Needs"."Postcode",
       "Needs"."TownOrCity",
       "Needs"."TweetId",
       "Needs"."Longitude",
       "Needs"."Latitude",
       "Needs"."TellUsMore",
       "NeedPpeTypes"."PpeTypeId",
       "NeedPpeTypes"."PpeTypeOther",
       "NeedPpeTypes"."DailyShortage",
       "NeedPpeTypes"."DailyShortageForWhom",
       "NeedPpeTypes"."StatusId"     AS "PpeStatusId",
       "NeedPpeTypes"."SupplierId",
       "NeedPpeTypes"."SupplierOther",
       "NeedPpeTypes"."DateClosed",
       "Suppliers"."Name"            AS "SupplierName",
       mostrecentnotes.notetext      AS "NoteText",
       mostrecentnotes.notetimestamp AS "NoteTimestamp",
       mostrecentnotes.noteauthor    AS "NoteAuthor"
FROM "NeedPpeTypes"
         JOIN "Needs" ON "NeedPpeTypes"."NeedId" = "Needs"."Id"
         LEFT JOIN "Suppliers" ON "NeedPpeTypes"."SupplierId" = "Suppliers"."Id"
         LEFT JOIN LATERAL ( SELECT latestnotes."Text"       AS notetext,
                                    latestnotes."Timestamp"  AS notetimestamp,
                                    "AspNetUsers"."UserName" AS noteauthor
                             FROM "Notes" latestnotes
                                      LEFT JOIN "NeedNotes" ON "NeedNotes"."NoteId" = latestnotes."Id"
                                      JOIN "AspNetUsers" ON latestnotes."UserId" = "AspNetUsers"."Id"
                             WHERE "NeedNotes"."NeedId" = "Needs"."Id"
                             ORDER BY latestnotes."Timestamp" DESC
                             LIMIT 1) mostrecentnotes ON true;

alter table "Requests"
    owner to postgres;

create view "Supplies"
            ("Id", "Timestamp", "UshahidiId", "StatusId", "Name", "Description", "SupplierTypeId", "SupplierTypeOther",
             "Email", "Website", "PhoneNumber", "ContactName", "Postcode", "TellUsMore", "Longitude", "Latitude",
             "PpeTypeId", "PpeTypeOther", "CostTypeId", "CostTypeOther", "CapacityPerWeek", "CurrentStock",
             "LeadTimeInDays", "Notes", "MeetsRegulatoryRequirementsId", "NoteText", "NoteTimestamp", "NoteAuthor")
as
SELECT "Suppliers"."Id",
       "Suppliers"."Timestamp",
       "Suppliers"."UshahidiId",
       "Suppliers"."StatusId",
       "Suppliers"."Name",
       "Suppliers"."Description",
       "Suppliers"."SupplierTypeId",
       "Suppliers"."SupplierTypeOther",
       "Suppliers"."Email",
       "Suppliers"."Website",
       "Suppliers"."PhoneNumber",
       "Suppliers"."ContactName",
       "Suppliers"."Postcode",
       "Suppliers"."TellUsMore",
       "Suppliers"."Longitude",
       "Suppliers"."Latitude",
       "SupplierPpeTypes"."PpeTypeId",
       "SupplierPpeTypes"."PpeTypeOther",
       "SupplierPpeTypes"."CostTypeId",
       "SupplierPpeTypes"."CostTypeOther",
       "SupplierPpeTypes"."CapacityPerWeek",
       "SupplierPpeTypes"."CurrentStock",
       "SupplierPpeTypes"."LeadTimeInDays",
       "SupplierPpeTypes"."Notes",
       "SupplierPpeTypes"."MeetsRegulatoryRequirementsId",
       mostrecentnotes.notetext      AS "NoteText",
       mostrecentnotes.notetimestamp AS "NoteTimestamp",
       mostrecentnotes.noteauthor    AS "NoteAuthor"
FROM "SupplierPpeTypes"
         JOIN "Suppliers" ON "SupplierPpeTypes"."SupplierId" = "Suppliers"."Id"
         LEFT JOIN LATERAL ( SELECT latestnotes."Text"       AS notetext,
                                    latestnotes."Timestamp"  AS notetimestamp,
                                    "AspNetUsers"."UserName" AS noteauthor
                             FROM "Notes" latestnotes
                                      LEFT JOIN "SupplierNotes"
                                                ON "SupplierNotes"."NoteId" = latestnotes."Id"
                                      JOIN "AspNetUsers" ON latestnotes."UserId" = "AspNetUsers"."Id"
                             WHERE "SupplierNotes"."SupplierId" = "Suppliers"."Id"
                             ORDER BY latestnotes."Timestamp" DESC
                             LIMIT 1) mostrecentnotes ON true;

alter table "Supplies"
    owner to postgres;


        """
    )


def downgrade():
    op.get_bind().execute(
        """
drop table "__RefactorLog";

drop table "AspNetRoleClaims";

drop table "AspNetUserClaims";

drop table "AspNetUserLogins";

drop table "AspNetUserRoles";

drop table "AspNetRoles";

drop table "AspNetUserTokens";

drop table "Audits";

drop table "ContactSubmissions";

drop table "NeedNotes";

drop table "NeedPpeTypes";

drop table "Needs";

drop table "PostcodesRegions";

drop table "SupplierNotes";

drop table "Notes";

drop table "AspNetUsers";

drop table "SupplierPpeTypes";

drop table "PpeTypes";

drop table "Suppliers";

drop view "Requests";

drop view "Supplies";
        """)
