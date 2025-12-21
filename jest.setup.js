// Global Jest setup: mock framer-motion to avoid dynamic style props in all snapshots
jest.mock("framer-motion", () => {
  const React = require("react");
  return {
    __esModule: true,
    ...jest.requireActual("framer-motion"),
    motion: new Proxy({}, {
      get: (target, prop) => (props) => React.createElement("div", props),
    }),
  };
});
