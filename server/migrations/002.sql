-- AVOCATO migration 002 — packs 14-18 : registres / dividendes / sejours
-- entities reste generique (scope+id), on ajoute vues + index + kinds d'alertes.
CREATE INDEX IF NOT EXISTS idx_entities_at ON entities(scope, at);
CREATE VIEW IF NOT EXISTS v_registres AS
  SELECT id,
         json_extract(payload,'$.dossierId') AS dossier_id,
         json_extract(payload,'$.facture') AS facture,
         json_extract(payload,'$.exig') AS exig,
         json_extract(payload,'$.butoir') AS butoir,
         json_extract(payload,'$.creditDate') AS credit_date,
         payload
  FROM entities WHERE scope='registres' AND deleted=0;
CREATE VIEW IF NOT EXISTS v_dividendes AS
  SELECT id,
         json_extract(payload,'$.dossierId') AS dossier_id,
         json_extract(payload,'$.agDate') AS ag_date,
         json_extract(payload,'$.montant') AS montant,
         payload
  FROM entities WHERE scope='dividendes' AND deleted=0;
CREATE VIEW IF NOT EXISTS v_sejours AS
  SELECT id,
         json_extract(payload,'$.dossierId') AS dossier_id,
         json_extract(payload,'$.expiry') AS expiry,
         payload
  FROM entities WHERE scope='sejours' AND deleted=0;
