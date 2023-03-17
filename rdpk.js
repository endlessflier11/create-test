const crypto = require("crypto");

exports.refactoredDeterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  let candidate = event
    ? event.partitionKey ??
      crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex")
    : TRIVIAL_PARTITION_KEY;

  if (candidate?.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }

  return candidate;
};
