export const MODE = process.env.MODE ?? "prod";
export const MODE_CLIENT = process.env.NEXT_PUBLIC_MODE ?? "prod";

export const isProd = MODE === "prod";
export const isDevLocal = MODE === "dev_local";
export const isDevDB = MODE === "dev_db";

// Para client side
export const isProdClient = MODE_CLIENT === "prod";
export const isDevLocalClient = MODE_CLIENT === "dev_local";
export const isDevDBClient = MODE_CLIENT === "dev_db";
