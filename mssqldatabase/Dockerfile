# Choose ubuntu version
FROM mcr.microsoft.com/mssql/server:2019-latest

# Set environment variables, not have to write them with the docker run command
ENV SA_PASSWORD $MSSQL_SA_PASSWORD
ENV ACCEPT_EULA Y
ENV TZ=America/Toronto
ENV MSSQL_PID Express
ENV DB_NAME  $DATABASE_NAME
USER root

# Copy custom entrypoint script into the container
COPY mssql-entrypoint.sh /docker-entrypoint-initdb.d/mssql-entrypoint.sh

# Make the script executable
RUN chmod +x /docker-entrypoint-initdb.d/mssql-entrypoint.sh


# Install required packages and mssql-tools
RUN apt-get update && \
    apt-get install -y wget apt-transport-https software-properties-common && \
    wget -qO- https://packages.microsoft.com/keys/microsoft.asc | apt-key add - && \
    wget -qO /etc/apt/sources.list.d/mssql-release.list https://packages.microsoft.com/config/ubuntu/20.04/prod.list && \
    apt-get update && ACCEPT_EULA=Y apt-get install -y \
    mssql-tools unixodbc-dev && \
    apt-get -y install vim \
    && apt-get -y install nano \
    && apt-get -y install dos2unix \
    && apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Add SQLCMD to PATH
RUN echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bashrc

RUN apt-get update \
    && apt-get -y install vim \
    && apt-get -y install nano \
    && apt-get -y install dos2unix \
    && apt-get clean

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN date

EXPOSE $DATABASE_PORT