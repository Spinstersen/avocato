-- AVOCATO Cabinet local mirror -- schema 001
-- Local-first mirror of the browser localStorage. SQLite file: server/data/avocato.db
-- ASCII on purpose (encoding-incident policy, see SUIVI_AUDIENCES_PLAN.md section 4).

CREATE TABLE IF NOT EXISTS schema_version (
  version INTEGER PRIMARY KEY,
  applied_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS meta (
  key TEXT PRIMARY KEY,
  value TEXT
);

-- devices: each browser/app installation gets one token
CREATE TABLE IF NOT EXISTS devices (
  id TEXT PRIMARY KEY,
  label TEXT,
  token_hash TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL,
  last_seen TEXT
);

-- future multi-seat (solo for now, table reserved)
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT,
  role TEXT NOT NULL DEFAULT 'owner',   -- owner | staff | clerk
  created_at TEXT NOT NULL
);

-- the entity store: one row per record, LWW merged on push
-- scope = dossiers | conventions | factures | echeances | frais | veille |
--         settings | seq | vault | transitions | dossierChecks |
--         clients | audiences | jugements | ...
CREATE TABLE IF NOT EXISTS entities (
  scope TEXT NOT NULL,
  id TEXT NOT NULL,
  payload TEXT,                          -- JSON of the record (NULL if never set)
  at TEXT NOT NULL,                      -- last write time (ISO), LWW key
  device TEXT,
  deleted INTEGER NOT NULL DEFAULT 0,    -- tombstone
  PRIMARY KEY (scope, id)
);
CREATE INDEX IF NOT EXISTS idx_entities_scope ON entities(scope, deleted);

-- number sequences (CH/RP/FH/LM/PV), anti-collision when multi-device
CREATE TABLE IF NOT EXISTS sequences (
  prefix TEXT PRIMARY KEY,               -- e.g. 'CH-2026'
  value INTEGER NOT NULL DEFAULT 0
);

-- alert engine output (phases D + H)
CREATE TABLE IF NOT EXISTS alerts (
  id TEXT PRIMARY KEY,
  kind TEXT NOT NULL,                    -- audience48 | audience24 | recours | retard | relance | abonnement | sauvegarde
  ref_scope TEXT,
  ref_id TEXT,
  fire_at TEXT,
  created_at TEXT NOT NULL,
  muted_until TEXT,
  read_at TEXT
);

-- audit of mahakim imports (phase F)
CREATE TABLE IF NOT EXISTS imports_batch (
  id TEXT PRIMARY KEY,
  source TEXT NOT NULL,                  -- 'mahakim'
  received_at TEXT NOT NULL,
  device TEXT,
  stats TEXT,                            -- JSON {new, report, skip}
  payload TEXT                           -- JSON rows received before mapping
);

-- append-only transitions mirror
CREATE TABLE IF NOT EXISTS transitions_log (
  id TEXT PRIMARY KEY,
  dossier_id TEXT,
  payload TEXT NOT NULL,
  at TEXT NOT NULL
);

-- conflict reports (client pushes what LWW rejected, for display)
CREATE TABLE IF NOT EXISTS conflicts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  scope TEXT NOT NULL,
  rec_id TEXT NOT NULL,
  server_at TEXT,
  incoming_at TEXT,
  device TEXT,
  seen_at TEXT NOT NULL
);

-- convenience views (JSON1)
CREATE VIEW IF NOT EXISTS v_dossiers AS
  SELECT id,
         json_extract(payload,'$.client')     AS client,
         json_extract(payload,'$.statut')     AS statut,
         json_extract(payload,'$.honoraires') AS honoraires,
         json_extract(payload,'$.tva')        AS tva,
         json_extract(payload,'$.updatedAt')  AS updated_at,
         payload
  FROM entities WHERE scope='dossiers' AND deleted=0;

CREATE VIEW IF NOT EXISTS v_factures AS
  SELECT id,
         json_extract(payload,'$.dossierId') AS dossier_id,
         json_extract(payload,'$.num')       AS num,
         json_extract(payload,'$.type')      AS type,
         json_extract(payload,'$.date')      AS date,
         json_extract(payload,'$.statut')    AS statut,
         json_extract(payload,'$.ht')        AS ht,
         json_extract(payload,'$.tva')       AS tva,
         json_extract(payload,'$.ttc')       AS ttc,
         payload
  FROM entities WHERE scope='factures' AND deleted=0;

CREATE VIEW IF NOT EXISTS v_echeances AS
  SELECT id,
         json_extract(payload,'$.dossierId') AS dossier_id,
         json_extract(payload,'$.date')      AS date,
         json_extract(payload,'$.type')      AS type,
         json_extract(payload,'$.done')      AS done,
         json_extract(payload,'$.auto')      AS auto,
         payload
  FROM entities WHERE scope='echeances' AND deleted=0;

CREATE VIEW IF NOT EXISTS v_audiences AS
  SELECT id,
         json_extract(payload,'$.dossierId')   AS dossier_id,
         json_extract(payload,'$.role')        AS role,
         json_extract(payload,'$.juridiction') AS juridiction,
         json_extract(payload,'$.date')        AS date,
         json_extract(payload,'$.heure')       AS heure,
         json_extract(payload,'$.etat')        AS etat,
         json_extract(payload,'$.source')      AS source,
         payload
  FROM entities WHERE scope='audiences' AND deleted=0;

CREATE VIEW IF NOT EXISTS v_jugements AS
  SELECT id,
         json_extract(payload,'$.dossierId')        AS dossier_id,
         json_extract(payload,'$.date')             AS date,
         json_extract(payload,'$.delai_recours_iso') AS delai_recours,
         json_extract(payload,'$.issue')            AS issue,
         payload
  FROM entities WHERE scope='jugements' AND deleted=0;

CREATE VIEW IF NOT EXISTS v_clients AS
  SELECT id,
         json_extract(payload,'$.name_norm') AS name_norm,
         json_extract(payload,'$.label')     AS label,
         json_extract(payload,'$.tel')       AS tel,
         json_extract(payload,'$.email')     AS email,
         payload
  FROM entities WHERE scope='clients' AND deleted=0;
