-- View: public.view_get_users_data

DROP VIEW public.view_get_users_data;

CREATE OR REPLACE VIEW public.view_get_users_data AS 
 SELECT u.id,
    u.rekvid,
    u.kasutaja,
    u.ametnik,
    u.parool,
    u.kasutaja_,
    u.peakasutaja_,
    u.admin,
    u.muud,
    u.last_login,
    r.nimetus AS asutus,
    rs.a AS allowed_access,
    libs.libs AS allowed_libs
   FROM userid u
     JOIN rekv r ON r.id = u.rekvid
     JOIN ( SELECT u_1.kasutaja,
            array_agg(((('{"id":'::text || u_1.rekvid::text) || ',"nimetus":"'::text) || ltrim(rtrim(rekv.nimetus::text))) || '"}'::text) AS a
           FROM rekv
             JOIN userid u_1 ON u_1.rekvid = rekv.id
          GROUP BY u_1.kasutaja) rs ON rs.kasutaja = u.kasutaja
     JOIN ( SELECT l.rekvId as rekvId,
            array_agg(((('{"id":'::text || l.id::text) || ',"nimetus":"'::text) || ltrim(rtrim(l.nimetus::text))) || '","lib":"' || ltrim(rtrim(l.library)) || '"}'::text) AS libs
            from library l where library in ('DOK') 
          GROUP BY l.rekvid) libs ON libs.rekvId = u.id;

ALTER TABLE public.view_get_users_data
  OWNER TO postgres;

/*
select * from view_get_users_data

*.