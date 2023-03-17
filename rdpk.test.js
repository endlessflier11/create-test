const { refactoredDeterministicPartitionKey } = require("./rdpk");
const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("refactoredDeterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = refactoredDeterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("should return a string", () => {
    const event = { key: "value" };
    const reactorResult = refactoredDeterministicPartitionKey(event);
    expect(typeof reactorResult).toBe("string");
  });

  it("should return the same partition key given the same input", () => {
    const event1 = { key1: "value1" };
    const event2 = { key1: "value1" };

    const reactorResult1 = refactoredDeterministicPartitionKey(event1);
    const reactorResult2 = refactoredDeterministicPartitionKey(event2);
    expect(reactorResult1).toEqual(reactorResult2);
  });

  it("returns the partition key if it exists in the event object", () => {
    const partitionKey = "test-key";
    const event = {
      partitionKey,
    };
    const refactorResult = refactoredDeterministicPartitionKey(event);
    expect(refactorResult).toEqual(partitionKey);
  });

  it("generates a partition key if the event object has no partition key", () => {
    const event = {
      name: "Test Event",
      time: "2021-10-13T12:00:00Z",
    };
    const refactorResult = refactoredDeterministicPartitionKey(event);
    const hash = crypto
      .createHash("sha3-512")
      .update(JSON.stringify(event))
      .digest("hex");
    expect(refactorResult).toEqual(hash);
    expect(refactorResult.length).toBeLessThanOrEqual(256);
  });

  it("should hash the candidate partition key if it exceeds max length", () => {
    // Generate a string with length greater than MAX_PARTITION_KEY_LENGTH
    const longStr = "x".repeat(300);

    const partitionKey = refactoredDeterministicPartitionKey({
      partitionKey: longStr,
    });
    const hashedKey = crypto
      .createHash("sha3-512")
      .update(longStr)
      .digest("hex");

    expect(partitionKey).toBe(hashedKey);
  });
});
describe("deterministicPartitionKey", () => {
  // Test Case 1
  it('Should return "0" when no event is passed', () => {
    const result = deterministicPartitionKey();
    const result2 = refactoredDeterministicPartitionKey();

    expect(result).toEqual("0");
    expect(result2).toEqual("0");
    expect(result).toEqual(result2);
  });

  // Test Case 2
  it("Should return a string less than or equal to 256 in length", () => {
    const longStr = "a".repeat(300);
    const event = { partitionKey: longStr };
    const result = deterministicPartitionKey(event);
    const result2 = refactoredDeterministicPartitionKey(event);

    expect(typeof result).toEqual("string");
    expect(result.length).toBeLessThanOrEqual(256);
    expect(result2.length).toBeLessThanOrEqual(256);
    expect(result2).toEqual(result);
  });

  // Test Case 3
  it("Should hash event object and return its SHA-512 value", () => {
    const event = {
      name: "Daniel",
      age: 25,
      country: "United States",
    };

    const data = JSON.stringify(event);
    const hashed = crypto.createHash("sha3-512").update(data).digest("hex");

    const result = deterministicPartitionKey(event);
    const result2 = refactoredDeterministicPartitionKey(event);

    expect(result).toEqual(hashed);
    expect(result2).toEqual(hashed);
  });

  // Test Case 4
  it("Should return the value of event.partitionKey if it exists", () => {
    const event = {
      name: "Daniel",
      age: 25,
      country: "United States",
      partitionKey: "key",
    };

    const result = deterministicPartitionKey(event);
    const result2 = refactoredDeterministicPartitionKey(event);

    expect(result).toEqual("key");
    expect(result2).toEqual("key");
  });
});
