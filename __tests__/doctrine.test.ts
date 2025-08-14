// __tests__/doctrine.test.ts
import { doctrine, BOOKS } from "../src/doctrine/library";
import { Contradiction } from "../src/cases/Case";

describe("Doctrine System", () => {
  test("Books are properly defined", () => {
    expect(BOOKS.length).toBeGreaterThan(0);
    expect(BOOKS[0].title).toBe("The Book of Meaningful Thought");
    expect(BOOKS[0].status).toBe("active");
  });

  test("Doctrine reflection updates version and codifications", () => {
    const initialVersion = doctrine.version;
    const initialCodifications = doctrine.codifications.length;

    const mockContradiction: Contradiction = {
      id: "TEST-123",
      summary: "Test contradiction for reflection",
      severity: "low",
      agentsInvolved: ["JUNO"],
      doctrinalRefs: [1],
      resolved: false,
    };

    doctrine.reflect(mockContradiction);

    expect(doctrine.version).not.toBe(initialVersion);
    expect(doctrine.codifications.length).toBe(initialCodifications + 1);
    expect(doctrine.codifications[doctrine.codifications.length - 1]).toContain(
      "Test contradiction for reflection"
    );
  });

  test("Version bumping works correctly", () => {
    const testVersions = [
      { input: "1.0.0", expected: "1.0.1" },
      { input: "2.5.9", expected: "2.5.10" },
      { input: "10.20.30", expected: "10.20.31" },
    ];

    // Access the bumpVersion function through reflection
    const doctrineModule = require("../src/doctrine/library");
    
    testVersions.forEach(({ input, expected }) => {
      // We'll test this through the reflect method
      const testDoctrine = {
        ...doctrine,
        version: input,
        codifications: [],
        reflect: doctrine.reflect,
      };

      const mockContradiction: Contradiction = {
        id: "TEST",
        summary: "Test",
        severity: "low",
        agentsInvolved: [],
        doctrinalRefs: [],
        resolved: false,
      };

      testDoctrine.reflect(mockContradiction);
      expect(testDoctrine.version).toBe(expected);
    });
  });
});
