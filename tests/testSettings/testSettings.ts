import fs from 'fs';
import path from 'path';

// Function to load configuration from the JSON file
export async function loadConfig(): Promise<any> {
  const configPath = path.resolve("tests/testSettings.json");  // Adjust the path if needed
  try {
    const data = await fs.promises.readFile(configPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading config file:', error);
    throw error;
  }
}
