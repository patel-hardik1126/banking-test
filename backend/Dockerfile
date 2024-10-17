# Load python 3.10
FROM python:3.10


# SET environment variable
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFFERED 1
WORKDIR /usr/src/app
USER root


# # install system dependencies
RUN apt-get update && \
    apt-get install -yq apt-transport-https gcc curl g++ nodejs build-essential vim nano && \
    curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - && \
    curl https://packages.microsoft.com/config/debian/9/prod.list > /etc/apt/sources.list.d/mssql-release.list && \
    apt-get update \
    && ACCEPT_EULA=Y  apt-get -y install msodbcsql18 mssql-tools unixodbc unixodbc-dev dos2unix \
    && echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bash_profile \
    && echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bashrc \
    && apt-get clean 


# # Install python django dependencies
COPY requirements.txt .
RUN pip install --prefer-binary --trusted-host pypi.org --trusted-host pypi.python.org --trusted-host=files.pythonhosted.org --no-cache-dir --upgrade pip
RUN pip install --prefer-binary --trusted-host pypi.org --trusted-host pypi.python.org --trusted-host=files.pythonhosted.org --no-cache-dir -r requirements.txt
RUN pip install --prefer-binary --trusted-host pypi.org --trusted-host pypi.python.org --trusted-host=files.pythonhosted.org --no-cache-dir pip-audit 

# Copy project files
COPY . .

# Expose the Django development server port
EXPOSE $BACKEND_APPLICATION_PORT