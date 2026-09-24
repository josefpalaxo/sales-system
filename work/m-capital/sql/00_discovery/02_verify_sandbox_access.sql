-- Non-mutating verification following administrator grant.
CHECK GRANT SELECT, INSERT, CREATE TABLE, CREATE VIEW ON sandbox.m_capital__access_probe;
SHOW GRANTS;
SELECT database, name, engine, total_rows FROM system.tables WHERE database='sandbox' AND startsWith(name,'m_capital__') ORDER BY name LIMIT 500 SETTINGS max_execution_time=20 FORMAT JSON;
