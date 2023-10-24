import { NextResponse, NextRequest } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {
  const request = new NextRequest(req);

  if (request.method === "POST") {
    // Get the form data from the request body
    const formData = request.body;

    // Read the existing data from the JSON file
    const classesFilePath = path.join(process.cwd(), "src/app/database/webdevclasses.json");
    const classesData = JSON.parse(fs.readFileSync(classesFilePath, "utf8"));

    // Add the new class to the data
    classesData.push(formData);

    // Write the updated data back to the JSON file
    fs.writeFileSync(
      classesFilePath,
      JSON.stringify(classesData, null, 2),
      "utf8"
    );

    // Respond with a success message or updated data if needed
    return NextResponse.json({ message: "Class scheduled successfully" });
  } else {
    return NextResponse.error(new Error("Method Not Allowed"), 405); // Method Not Allowed for non-POST requests
  }
}

// Make sure to export the POST function for the route to work as a Next.js API route.
