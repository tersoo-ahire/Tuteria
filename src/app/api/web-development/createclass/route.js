import { NextResponse, NextRequest } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {
  const request = new NextRequest(req);

  if (request.method === "POST") {
    // Get the form data from the request body
    const formData = JSON.parse(await request.text());

    // Read the existing data from the JSON file
    const classesFilePath = path.join(
      process.cwd(),
      "src/app/database/webdev.json"
    );

    // Read the file and parse the JSON data
    let classesData;
    try {
      const fileContent = fs.readFileSync(classesFilePath, "utf8");
      classesData = JSON.parse(fileContent);
    } catch (error) {
      return NextResponse.error(new Error("Error reading JSON file"), 500);
    }

    // Ensure that classesData is an array before pushing the new data
    if (!Array.isArray(classesData)) {
      classesData = [];
    }

    console.log("Data before adding:", classesData);

    // Add the new class to the data
    classesData.push(formData);

    console.log("Data after adding:", classesData);

    // Write the updated data back to the JSON file
    try {
      fs.writeFileSync(
        classesFilePath,
        JSON.stringify(classesData, null, 2),
        "utf8"
      );
    } catch (error) {
      return NextResponse.error(new Error("Error writing JSON file"), 500);
    }

    // Respond with a success message or updated data if needed
    return NextResponse.json({ message: "Class scheduled successfully" });
  } else {
    return NextResponse.error(new Error("Method Not Allowed"), 405); // Method Not Allowed for non-POST requests
  }
}
