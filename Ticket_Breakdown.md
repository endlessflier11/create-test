# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

Ticket 1: Implement custom id field for Agents

Description:
Add a custom id field to the Agents table to allow Facilities to save their own custom ids for each Agent they work with. This custom id should be unique and indexed in the database.

Acceptance criteria:

A custom id field is added to the Agents table.
The custom id field is unique and indexed in the database.
Facilities can input and save their own custom id for each Agent they work with.
The custom id can be retrieved for each Agent when generating reports.
Effort estimate:
This ticket should take approximately 4-6 hours to complete.

Implementation details:

Add a new column to the Agents table in the database to store the custom id.
Add validation to ensure that the custom id is unique.
Create an API endpoint to allow Facilities to update the custom id for an Agent.
Modify the generateReport function to use the custom id field when generating reports.
Ticket 2: Update getShiftsByFacility function to return custom Agent ids

Description:
Update the getShiftsByFacility function to include the custom Agent id in the returned Shift metadata, instead of the internal database id.

Acceptance criteria:

The getShiftsByFacility function includes the custom Agent id in the returned Shift metadata.
The generateReport function uses the custom Agent id instead of the internal database id when generating reports.
Effort estimate:
This ticket should take approximately 2-3 hours to complete.

Implementation details:

Modify the SQL query in getShiftsByFacility to include the custom Agent id in the returned metadata.
Update the generateReport function to use the custom Agent id instead of the internal database id when generating reports.
Ticket 3: Add validation for custom Agent ids in generateReport function

Description:
Add validation to the generateReport function to ensure that the custom Agent id provided by the Facility is valid and corresponds to a valid Agent in the database.

Acceptance criteria:

The generateReport function checks that the custom Agent id provided by the Facility corresponds to a valid Agent in the database.
If the custom Agent id is invalid, the generateReport function returns an error message.
Effort estimate:
This ticket should take approximately 1-2 hours to complete.

Implementation details:

Modify the generateReport function to query the Agents table to check if the custom Agent id is valid.
If the custom Agent id is not valid, return an error message indicating that the custom Agent id is invalid.
Ticket 4: Add API endpoint to allow Facilities to retrieve Agent custom ids

Description:
Add an API endpoint to allow Facilities to retrieve the custom id for an Agent.

Acceptance criteria:

An API endpoint is added to retrieve the custom id for an Agent.
The API endpoint returns the custom id for the requested Agent.
Effort estimate:
This ticket should take approximately 2-3 hours to complete.

Implementation details:

Create a new API endpoint to retrieve the custom id for an Agent.
Modify the getShiftsByFacility function to use the custom id field when returning Shift metadata.
Modify the generateReport function to use the custom id field when generating reports.
Ticket 5: Update database schema for Shifts table

Description:
Update the Shifts table to include the custom Agent id instead of the internal database id.

Acceptance criteria:

The Shifts table is updated to include the custom Agent id instead of the internal database id.
The getShiftsByFacility function includes the custom Agent id in the

leer7512@gmail.com
generate continue
Ticket 2: Update Agent model to include custom id field
Description:

Currently, the Agent model only includes an internal database id. To allow Facilities to save their own custom ids for each Agent, we need to update the Agent model to include a new field for the custom id.

Acceptance Criteria:

A new field custom_id is added to the Agent model.
The custom_id field is optional, and can be left blank.
The custom_id field accepts alphanumeric characters only and has a maximum length of 20 characters.
When a Facility updates an Agent's custom_id, the value is saved to the database.
The getShiftsByFacility function now returns the Agent's custom_id along with the other metadata for each Shift.
Effort Estimate: 2 points

Implementation Details:

Update the Agent model to include a new field custom_id using a database migration.
Modify the getShiftsByFacility function to include the Agent's custom_id in the metadata for each Shift.
Add input validation for the custom_id field in the Agent update endpoint to ensure it meets the acceptance criteria.
Ticket 3: Update Report Generation to Use Custom Id
Description:

To use the custom_id instead of the internal database id on the generated reports, we need to update the generateReport function to use the custom_id if it exists, otherwise use the internal id.

Acceptance Criteria:

When generating a report, the Agent's custom_id is used if it exists, otherwise the internal database id is used.
The generateReport function still works with the list of Shifts returned by getShiftsByFacility, which now includes the Agent's custom_id if it exists.
Effort Estimate: 1 point

Implementation Details:

Modify the generateReport function to use the Agent's custom_id if it exists, otherwise use the internal database id.
Test the generateReport function with Shifts from Facilities that have set custom_ids for their Agents.
Summary
In summary, the following tickets have been created to implement the ability for Facilities to save custom ids for Agents:

Add new custom_id field to Facility-Agents pivot table
Update Agent model to include custom id field
Update report generation to use custom id
These tickets should be completed in the order presented, as each subsequent ticket depends on the previous one being completed. With a total estimated effort of 5 points, this should be achievable within the allotted time frame.
