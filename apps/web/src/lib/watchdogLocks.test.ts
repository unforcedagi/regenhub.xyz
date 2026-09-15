import { describe, expect, it } from "vitest";

import { isFrontLockEntity, withoutFrontLocks } from "../../../../packages/shared/src/homeAssistant";

describe("withoutFrontLocks", () => {
  it("drops the front Yale so crash recovery cannot motor that bolt", () => {
    expect(
      withoutFrontLocks(["lock.front_door_lock", "lock.back_door_lock"]),
    ).toEqual(["lock.back_door_lock"]);
  });

  it("returns empty when only the front lock is listed", () => {
    expect(withoutFrontLocks(["lock.front_door_lock"])).toEqual([]);
  });

  it("leaves a back-only list unchanged", () => {
    expect(withoutFrontLocks(["lock.back_door_lock"])).toEqual(["lock.back_door_lock"]);
  });
});

describe("isFrontLockEntity", () => {
  it("matches the production front entity id", () => {
    expect(isFrontLockEntity("lock.front_door_lock")).toBe(true);
  });

  it("does not match the back lock", () => {
    expect(isFrontLockEntity("lock.back_door_lock")).toBe(false);
  });
});
