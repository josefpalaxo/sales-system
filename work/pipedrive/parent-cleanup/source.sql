-- Read-only original mapping source; store output only in ignored local storage.
-- The schema uses a leading underscore on the custom field column.
SELECT id, name, is_deleted,
       _b45e902759f6fb356e939c4b6d45245ecfedb637 AS parent_raw,
       _airbyte_extracted_at AS extracted_at, update_time
FROM raw_pipedrive.organizations
ORDER BY id
LIMIT 10000
SETTINGS max_execution_time = 30,
         max_rows_to_read = 20000,
         max_result_rows = 10000,
         result_overflow_mode = 'throw';
