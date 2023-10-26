// pages/api/enroll.js
import { NextResponse, NextRequest } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {
  const request = new NextRequest(req);

  if (request.method === "POST") {
    const formData = JSON.parse(await request.text());

    const webdevFilePath = path.join(
      process.cwd(),
      "src/app/database/webdev.json"
    );
    const myclassesFilePath = path.join(
      process.cwd(),
      "src/app/database/myclasses.json"
    );

    try {
      const webdevFileContent = fs.readFileSync(webdevFilePath, "utf8");
      const webdevData = JSON.parse(webdevFileContent);

      // Generate a unique ID for the new class
      const newClassId =
        webdevData.reduce(
          (maxId, classItem) => Math.max(maxId, classItem.id || 0),
          0
        ) + 1;

      // Create the new class object with the generated ID
      const newClass = { ...formData, id: newClassId };

      // Add the new class to the webdev.json file
      webdevData.push(newClass);

      // Update webdev.json
      fs.writeFileSync(
        webdevFilePath,
        JSON.stringify(webdevData, null, 2),
        "utf8"
      );

      // The rest of your code for enrolling the class remains the same
      // ...
    } catch (error) {
      return NextResponse.error(
        new Error("Error reading/writing JSON files"),
        500
      );
    }
  } else {
    return NextResponse.error(new Error("Method Not Allowed"), 405);
  }
}
