const { expect } = require("chai");

describe("MedicalRecords", function () {
  it("should create and retrieve a medical record", async function () {
    const MedicalRecords = await ethers.getContractFactory("MedicalRecords");
    const medicalRecords = await MedicalRecords.deploy();
    await medicalRecords.deployed();

    const [owner] = await ethers.getSigners();

    await medicalRecords.createRecord("Patient's first record");

    const records = await medicalRecords.getRecords(owner.address);
    expect(records.length).to.equal(1);
    expect(records[0].data).to.equal("Patient's first record");
  });

  it("should authorize and revoke doctor access", async function () {
    const MedicalRecords = await ethers.getContractFactory("MedicalRecords");
    const medicalRecords = await MedicalRecords.deploy();
    await medicalRecords.deployed();

    const [owner, doctor] = await ethers.getSigners();

    await medicalRecords.authorizeDoctor(doctor.address);

    await medicalRecords.connect(doctor).getRecords(owner.address);

    await medicalRecords.revokeDoctor(doctor.address);

    await expect(medicalRecords.connect(doctor).getRecords(owner.address)).to.be.revertedWith("Not authorized");
  });
});

