const { ethers } = require("hardhat");
const dotenv = require("dotenv");

dotenv.config();

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.ROPSTEN_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const MedicalRecords = await ethers.getContractFactory("MedicalRecords", wallet);
  const medicalRecords = await MedicalRecords.attach("DEPLOYED_CONTRACT_ADDRESS");

  // Create a record
  const createRecordTx = await medicalRecords.createRecord("Patient's first record");
  await createRecordTx.wait();
  console.log("Record created");

  // Authorize a doctor
  const doctorAddress = "DOCTOR_ADDRESS";
  const authorizeDoctorTx = await medicalRecords.authorizeDoctor(doctorAddress);
  await authorizeDoctorTx.wait();
  console.log("Doctor authorized");

  // Revoke a doctor's authorization
  const revokeDoctorTx = await medicalRecords.revokeDoctor(doctorAddress);
  await revokeDoctorTx.wait();
  console.log("Doctor's authorization revoked");

  // Get patient records
  const records = await medicalRecords.getRecords(wallet.address);
  console.log("Patient records:", records);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
