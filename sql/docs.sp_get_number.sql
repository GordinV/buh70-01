DROP FUNCTION if exists docs.sp_get_number(integer, text, integer, integer);

CREATE OR REPLACE FUNCTION docs.sp_get_number(
    tnRekvId integer,
    tcDok text,
    tnYear integer,
    tnDokPropId integer)
  RETURNS text AS
$BODY$
DECLARE 
	v_number record;
	lcPref text;
	lcNumber text = '0';
	lcTableName text;
	lcAdditionalWhere text = '';
	lcSqlString text;
begin
	if tnDokPropId is not null then
		select ltrim(rtrim(proc_)) into lcPref from libs.dokprop where id = tnDokPropId;
	end if;
	
	lcPref = coalesce(lcPref,'');

	case  tcDok
		when 'ARV' then
			lcTableName = 'docs.arv';
			
		when 'SORDER' then
			lcTableName = 'docs.korder1';
			lcAdditionalWhere  = ' and tyyp = 1 '; 	
		when 'VORDER' then
			lcTableName = 'docs.korder1';
			lcAdditionalWhere  = ' and tyyp = 2 '; 	
		when 'MK' then
			lcTableName = 'docs.mk';
			lcAdditionalWhere  = ' OPT = 1 '; 	
--		when 'AVANS' then
--			lcTableName = 'docs.avans1'; 
	end case;

	-- building sql query with regexp for only numbers 
	lcSqlString = 'select max(SUBSTRING(number, ' || quote_literal('Y*[0-9]\d+') || ')::integer) ::integer as number from ' 
		|| lcTableName 
		|| ' where rekvId = $1::integer and year(kpv) = $2::integer and number ilike $3::text '
		|| lcAdditionalWhere ;

	execute lcSqlString into v_number using tnRekvId, tnYear, lcPref || '%';

	-- will plus pref and encrement

	raise notice 'lcSqlString %', lcSqlString;
	lcNumber = lcPref || (v_number.number + 1)::text;
	
        return lcNumber ;
end; 
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

GRANT EXECUTE ON FUNCTION docs.sp_get_number(integer, text, integer, integer) TO dbpeakasutaja;
GRANT EXECUTE ON FUNCTION docs.sp_get_number(integer, text, integer, integer) TO dbkasutaja;


select docs.sp_get_number(1, 'ARV', year(date()), 1);

/*
select trim(number) as number from docs.arv 
	where rekvId = 1::integer and year(kpv) = 2016::integer and number ilike '%'::text  order by number desc limit 1

select max(SUBSTRING(number, E'Y*[0-9]\\d+')) ::integer as number from docs.arv where rekvId = 1::integer and year(kpv) = 2016::integer and number ilike '%'::text

*/