-- Table: public.korder1

DROP TABLE if exists docs.korder1;

CREATE TABLE docs.korder1
(
  id serial,
  parentid integer NOT NULL,
  rekvid integer NOT NULL,
  userid integer NOT NULL,
  journalid integer NOT NULL,
  kassaid integer NOT NULL,
  tyyp integer NOT NULL DEFAULT 1,
  doklausid integer,
  "number" text NOT NULL,
  kpv date NOT NULL DEFAULT ('now'::text)::date,
  asutusid integer NOT NULL,
  nimi text NOT NULL,
  aadress text,
  dokument text,
  alus text,
  summa numeric(12,4) NOT NULL DEFAULT 0,
  muud text,
  arvid integer,
  doktyyp integer,
  dokid integer
)
WITH (
  OIDS=TRUE
);

GRANT SELECT, UPDATE, INSERT ON TABLE docs.korder1 TO dbkasutaja;
GRANT SELECT, UPDATE, INSERT, DELETE ON TABLE docs.korder1 TO dbpeakasutaja;
GRANT ALL ON TABLE docs.korder1 TO dbadmin;
GRANT SELECT ON TABLE docs.korder1 TO dbvaatleja;


DROP INDEX if exists docs.korder1_rekv_idx;

CREATE INDEX korder1_rekv_idx
  ON docs.korder1
  USING btree
  (rekvid);

DROP INDEX if exists docs.korder1_kpv_idx;

CREATE INDEX korder1_kpv_idx
  ON docs.korder1
  USING btree
  (kpv);

DROP INDEX if exists docs.korder1_number_idx;

CREATE INDEX korder1_number_idx
  ON docs.korder1
  USING btree
  (number);

DROP INDEX if exists docs.korder1_parent_idx;

CREATE INDEX korder1_parent_idx
  ON docs.korder1
  USING btree
  (parentid);
