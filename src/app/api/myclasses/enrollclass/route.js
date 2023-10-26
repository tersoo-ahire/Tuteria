// pages/api/enroll.js
import { NextResponse, NextRequest } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {
  const request = new NextRequest(req);

  if (request.method === "POST") {
    const formData = JSON.parse(await request.text());

    let databaseFilePath;

    // Determine the database file path based on the route
    if (req.url.includes("/schools/web-development")) {
      databaseFilePath = path.join(
        process.cwd(),
        "src/app/database/webdev.json"
      );
    } else if (req.url.includes("/schools/datascience")) {
      databaseFilePath = path.join(
        process.cwd(),
        "src/app/database/artificialintelligence.json"
      );
    } else if (req.url.includes("/schools/artificial-intelligence")) {
      databaseFilePath = path.join(
        process.cwd(),
        "src/app/database/datascience.json"
      );
    } else {
      return NextResponse.error(new Error("Invalid route"), 400);
    }

    try {
      const databaseFileContent = fs.readFileSync(databaseFilePath, "utf8");
      const databaseData = JSON.parse(databaseFileContent);

      // Find the class to enroll in by ID
      const classToEnroll = databaseData.find(
        (classItem) => classItem.id === formData.classId
      );

      if (!classToEnroll) {
        return NextResponse.error(new Error("Class not found"), 404);
      }

      const myclassesFilePath = path.join(
        process.cwd(),
        "src/app/database/myclasses.json"
      );

      const myclassesFileContent = fs.readFileSync(myclassesFilePath, "utf8");
      let myclassesData = JSON.parse(myclassesFileContent);

      if (!Array.isArray(myclassesData)) {
        myclassesData = [];
      }

      // Add the class to myclasses.json
      myclassesData.push(classToEnroll);

      // Update myclasses.json
      fs.writeFileSync(
        myclassesFilePath,
        JSON.stringify(myclassesData, null, 2),
        "utf8"
      );

      return NextResponse.json({ message: "Enrolled successfully" });
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
