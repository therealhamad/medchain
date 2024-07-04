// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract MedicalRecords {
    struct Record {
        string data; // The medical data associated with the record
        address createdBy; // The address of the user who created the record
        uint256 timestamp; // The timestamp when the record was created
        string prescription; // The prescription associated with the record
    }

    struct Patient {
        address id; // The address of the patient
        Record[] records; // An array of medical records associated with the patient
        mapping(address => bool) authorizedDoctors; // Mapping of authorized doctors for the patient
    }

    mapping(address => Patient) private patients; // Mapping of patients

    // Event to log new record creation
    event RecordCreated(address patient, string data, address createdBy, uint256 timestamp);
    
    // Event to log record deletion
    event RecordDeleted(address patient, uint256 index);

    // Modifier to check if the sender is the patient or an authorized doctor
    modifier isAuthorized(address _patient) {
        require(
            msg.sender == _patient || patients[_patient].authorizedDoctors[msg.sender],
            "Not authorized"
        );
        _;
    }

    // Function to create a new medical record
    function createRecord(string memory _data) public {
        Patient storage patient = patients[msg.sender];
        patient.id = msg.sender;
        patient.records.push(Record(_data, msg.sender, block.timestamp, ""));

        emit RecordCreated(msg.sender, _data, msg.sender, block.timestamp);
    }

    // Function to authorize a doctor for a patient
    function authorizeDoctor(address _doctor) public {
        require(_doctor != msg.sender, "Cannot authorize self");
        patients[msg.sender].authorizedDoctors[_doctor] = true;
    }

    // Function to revoke a doctor's authorization for a patient   
    function revokeDoctorAuthorization(address _doctor) public {
        require(patients[msg.sender].authorizedDoctors[_doctor], "Doctor not authorized");
        delete patients[msg.sender].authorizedDoctors[_doctor];
    }

    // Function to get a patient's medical records if authorized
    function getRecords(address _patient) public view isAuthorized(_patient) returns (Record[] memory) {
        return patients[_patient].records;
    }

    // Function to check if a doctor is authorized for a patient
    function isDoctorAuthorized(address _patient, address _doctor) public view returns (bool) {
        return patients[_patient].authorizedDoctors[_doctor];
    }

    // Function to add a new patient to the system
    function addPatient(address _patient) public {
        require(_patient != address(0), "addPatient: Invalid patient address");
        require(patients[_patient].id == address(0), "addPatient: Patient already exists");
        patients[_patient].id = _patient;
    }

    // Function to get the total number of records for a patient
    function getRecordsCount(address _patient) public view returns (uint) {
        require(patients[_patient].id != address(0), "Patient does not exist");
        return patients[_patient].records.length;
    }

    // Function to get a specific record of a patient by index
    function getRecordByIndex(address _patient, uint _index) public view isAuthorized(_patient) returns (Record memory) {
        require(_index < patients[_patient].records.length, "Record index out of bounds");
        return patients[_patient].records[_index];
    }

    // Function to delete a patient's record by index
    function deleteRecord(address _patient, uint _index) public isAuthorized(_patient) {
        require(_index < patients[_patient].records.length, "deleteRecord: Record index out of bounds");
        uint lastIndex = patients[_patient].records.length - 1;

        // If the record to delete is not the last one, move the last one to its place
        if (_index != lastIndex) {
            patients[_patient].records[_index] = patients[_patient].records[lastIndex];
        }

        // Remove the last element
        patients[_patient].records.pop();

        emit RecordDeleted(_patient, _index); // Assuming there's an event for deletion
    }

    // Function to update a patient's record
    function updateRecord(address _patient, uint _index, string memory _newData) public isAuthorized(_patient) {
        require(_index < patients[_patient].records.length, "Record index out of bounds");
        Record storage recordToUpdate = patients[_patient].records[_index];
        recordToUpdate.data = _newData;
        recordToUpdate.timestamp = block.timestamp; // Update timestamp to current
        emit RecordCreated(_patient, _newData, msg.sender, block.timestamp); // Log the update as a new record for audit purposes
    }


    //PRESCRIPTION FUNCTIONALITY:

    // Event to log prescription upload
    event PrescriptionUploaded(address patient, uint256 recordIndex, string prescription);
    
    // Function to upload a prescription for a patient
    function uploadPrescription(address _patient, uint _recordIndex, string memory _prescription) public isAuthorized(_patient) {
        require(_recordIndex < patients[_patient].records.length, "uploadPrescription: Record index out of bounds");
        // Update the record with the prescription
        patients[_patient].records[_recordIndex].prescription = _prescription;
        emit PrescriptionUploaded(_patient, _recordIndex, _prescription); // Assuming there's an event for uploading a prescription
    }
}
