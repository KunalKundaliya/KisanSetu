const logger = {
  info: (...args) => console.log("[INFO]", ...args),
  error: (...args) => console.error("[ERROR]", ...args),
  warn: (...args) => console.warn("[WARN]", ...args),
  debug: (...args) => console.debug("[DEBUG]", ...args),
};
// logger wrapper :- instead of console.log for diff [LEVELS]
export default logger;