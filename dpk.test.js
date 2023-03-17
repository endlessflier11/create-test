const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("should return a string", () => {
    const event = { key: "value" };
    const partitionKey = deterministicPartitionKey(event);
    expect(typeof partitionKey).toBe("string");
  });

  it("should return the same partition key given the same input", () => {
    const event1 = { key1: "value1" };
    const event2 = { key1: "value1" };

    const partitionKey1 = deterministicPartitionKey(event1);
    const partitionKey2 = deterministicPartitionKey(event2);

    expect(partitionKey1).toEqual(partitionKey2);
  });

  it("returns the partition key if it exists in the event object", () => {
    const partitionKey = "test-key";
    const event = {
      partitionKey,
    };
    const result = deterministicPartitionKey(event);
    expect(result).toEqual(partitionKey);
  });

  it("generates a partition key if the event object has no partition key", () => {
    const event = {
      name: "Test Event",
      time: "2021-10-13T12:00:00Z",
    };
    const result = deterministicPartitionKey(event);
    const hash = crypto
      .createHash("sha3-512")
      .update(JSON.stringify(event))
      .digest("hex");
    expect(result).toEqual(hash);
    expect(result.length).toBeLessThanOrEqual(256);
  });

  it("should hash the candidate partition key if it exceeds max length", () => {
    // Generate a string with length greater than MAX_PARTITION_KEY_LENGTH
    const longStr = "x".repeat(300);

    const partitionKey = deterministicPartitionKey({ partitionKey: longStr });
    const hashedKey = crypto
      .createHash("sha3-512")
      .update(longStr)
      .digest("hex");

    expect(partitionKey).toBe(hashedKey);
  });
});
