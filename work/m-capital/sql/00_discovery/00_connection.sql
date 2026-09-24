/*---
kind: query
project_id: m-capital
status: exploratory
purpose: Verify configured ClickHouse identity and read-only discovery access without exposing credentials.
grain: 1 connection context
source: [system.one]
depends_on: []
owner: Finance / Revenue Operations
materialization: none
---*/
SELECT currentUser() AS query_user, currentDatabase() AS default_database,
       now64(3) AS checked_at_utc, getSetting('readonly') AS readonly
LIMIT 1
SETTINGS max_execution_time=20, max_rows_to_read=1000000,
         timeout_before_checking_execution_speed=0
FORMAT JSON;
