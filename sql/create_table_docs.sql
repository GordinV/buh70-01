﻿drop table if exists docs.doc;

CREATE TABLE docs.doc
(
  id serial,
  created timestamp default now(),
  lastupdate timestamp default now(),
  doc_type_id integer,
  bpm jsonb,
  history jsonb,
  status integer default 0,	
  CONSTRAINT docs_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=TRUE
);

GRANT SELECT, UPDATE, INSERT, DELETE ON TABLE docs.doc TO dbpeakasutaja;
GRANT SELECT, UPDATE, INSERT ON TABLE docs.doc TO dbkasutaja;
GRANT ALL ON TABLE docs.doc TO dbadmin;
GRANT SELECT ON TABLE docs.doc TO dbvaatleja;


COMMENT ON COLUMN docs.doc.doc_type_id  IS 'тип документа, из таблицы library.kood';
COMMENT ON COLUMN docs.doc.bpm  IS 'бизнес процесс';

ALTER TABLE docs.doc ADD COLUMN docs_ids integer[];
COMMENT ON COLUMN docs.doc.docs_ids IS 'seotud dokumendide id';


/*

insert into docs.doc (doc_type_id) values ((select id from library where library = 'DOK' AND kood = 'ARV'))
select * from docs.doc
*/
