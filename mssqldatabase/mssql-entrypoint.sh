#!/bin/bash

# Start SQL Server in the background
/opt/mssql/bin/sqlservr &

# Wait for SQL Server to start by polling port 1433 to see when it's ready
echo "Waiting for SQL Server to start..."
until /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "$SA_PASSWORD" -Q "SELECT 1" &>/dev/null
do
  echo "SQL Server is starting up..."
  sleep 5
done

# Create the database if it does not exist
echo "Running database creation script..."
/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "$SA_PASSWORD" -Q "
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = '$DATABASE_NAME')
BEGIN
  CREATE DATABASE [$DATABASE_NAME];
  PRINT 'Database created'
END"

# Create the user if it does not exist and grant permissions
echo "Creating user if it doesn't exist..."
/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "$SA_PASSWORD" -Q "
USE [$DATABASE_NAME];
IF NOT EXISTS (SELECT * FROM sys.server_principals WHERE name = '$DATABASE_USER')
BEGIN
  SET ANSI_NULLS ON;
  SET QUOTED_IDENTIFIER ON; 
  CREATE LOGIN [$DATABASE_USER] WITH PASSWORD = '$DATABASE_PASSWORD';

  -- Create the schema if it does not exist
  IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'app')
  BEGIN
    EXEC('CREATE SCHEMA [app]');
    PRINT 'Schema created'
  END
  
  CREATE USER [$DATABASE_USER] FOR LOGIN [$DATABASE_USER] WITH DEFAULT_SCHEMA=[app];
  ALTER ROLE db_owner ADD MEMBER [$DATABASE_USER];
  PRINT 'User created and granted permissions'
END"

# Keep the container running by waiting for SQL Server process
wait
