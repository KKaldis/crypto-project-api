import MainDataModel from "./models/ProjectDataSchema.Model";

type gitHubEntry = { commits: number };

async function addGitHubEntry(contractAddress: string, data: gitHubEntry) {
  try {
    // Get the current timestamp
    const timestamp = new Date();

    // Find the document corresponding to the contract address or create a new one if it doesn't exist
    let document = await MainDataModel.findOne({
      [contractAddress]: { $exists: true }
    });

    if (!document) {
      // If the document doesn't exist, create a new one
      document = new MainDataModel();
    }

    // Push the new GitHub entry to the array
    document.contractAddress?.github.push({ timestamp, data });

    // Save the updated document to the database
    await document.save();

    console.log(`GitHub entry added to contract ${contractAddress}`);
  } catch (error) {
    console.error("Error adding GitHub entry:", error);
  }
}

// Example usage:
// addGitHubEntry('0x132123423482747892749827', 'Some GitHub event data');

export default addGitHubEntry;
