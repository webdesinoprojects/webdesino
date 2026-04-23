export class MigrationLogger {
  section(title: string) {
    console.log("");
    console.log("=".repeat(72));
    console.log(title);
    console.log("=".repeat(72));
  }

  info(message: string) {
    console.log(`[INFO] ${message}`);
  }

  warn(message: string) {
    console.warn(`[WARN] ${message}`);
  }

  error(message: string) {
    console.error(`[ERROR] ${message}`);
  }

  json(label: string, payload: unknown) {
    console.log(`${label}:`);
    console.log(JSON.stringify(payload, null, 2));
  }
}
