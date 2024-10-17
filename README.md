# Banking Code Test

## Container

1. Backend Container -> Python 3.10 > Django 4.2.10
1. ExpressJS Container -> node:18 > express ^4.18.2
1. Frontend NextJS/MUI -> node:20 > next ^14.2.0,
1. MSSQL Container,
1. MongoDB,

## Want to use this?

### Pre-requisite

- [Docker](https://www.docker.com/)

### Use the boiler plate code for development

Clone the repository

```sh
$ git clone https://github.com/patel-hardik1126/banking-test.git <DestinationDirectory>
```

### Uses the default Django development server.

1. Rename _.env.sample_ to _.env_.
1. Update the environment variables in the _docker-compose.yml_ and _.env_ files.
1. Build the images and run the containers:

   ```sh
   $ docker-compose up -d --build --force-recreate --remove-orphans
   ```

   Test it out at [http://localhost:4000/](http://localhost:4000). Please use appropriate ::port to access the frontend

## Tasks

1. Create a list of json documents with randomized fields this being the sample:

```json
{
_id: 12345
"originationTime": 1656788800,
"clusterId": "domainserver1",
"userId": "555666777",
"devices": {
     "phone": "SEP123123234234",
     "voicemail": "555666777VM"
  }
}
```

And put them in file.

**DEV COMMENT: Task complete utilized stand alone python script to generate the json file (sample_data.json).**

2. Create a RESTful API backend with endpoints to retrieve records by phone number,
   voicemail, user id and cluster; endpoint should take in a date range as a required
   parameter while the other parameter can be any of the above. Set up logging and
   security measures.

**DEV COMMENT: Task partial complete security measures were not developed. Intention was to develop OAuth mechanisim where user will register and Simple JWT would be generated for future api call. Currently not all filter are working, but primary serverside search and pagination are working for both Django and Express environments due to time constrain.**

3. Create three endpoints – one for MongoDB, the other for SQL Server and the third one
   to read from a json file.
4. Write logic to retrieve records by these parameters implying they are stored in
   MongoDB.
5. Write logic to retrieve records as if they were stored in normalized relational SQL
   Database (MS SQL Server).
   Only \_id attribute is unique, a user can have multiple phones/voicemails and
   phones/voicemails can belong to multiple users.

**DEV COMMENT: Task complete endpoints created.**

6. For the sake of simplicity (and testing) read records from a json file filtering by phone
   number, vm and other parameters mentioned above.

**DEV COMMENT: Task complete have created 3 different dashboards which will allow user to test all 3 endpoints mentioned above (MongoDB, SQL, JSON)**

7. Create a front-end application using React. Bootstrap can be used, but Material UI is
   preferred.

**DEV COMMENT: Task complete.**

8. Front end application should have a form with the ability to select time range and one of
   the parameters (phone number, VM, user id or cluster)
9. Upon submission of the form loading component should be displayed emulating loading

**DEV COMMENT: Partially complete intention was to custmize MaterialUI Datagrid to facilitate runtime filtering for all fields, but couldn't achieve entirelym, due to time constrain.**

10. User friendly table should be displayed with all the records, pagination, and the ability
    to sort records by any of the columns (alphabetically or by time) should be present.
11. Create a button that provides ability to download records displayed as a flat CSV file

**DEV COMMENT: Task complete.**

================================================================================================================

**_PLEASE USE BELOW COMMANDS IN THE BACKEND ENVIRONMENT TO SEED THE DATA FOR DJANGO_**

```
python manage.py import_data sample_data.json
```

**_PLEASE USE BELOW COMMANDS IN THE EXPRESS ENVIRONMENT TO SEED THE DATA FOR EXPRESS_**

```
node seed.js
```
