import { NextResponse, NextRequest } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {
  const request = new NextRequest(req);

  if (request.method === "POST") {
    const formData = JSON.parse(await request.text());

    let databaseFilePath;

    // Get the current route from the request URL
    const route = request.url.pathname;

    // Determine the database file path based on the route
    switch (route) {
      case "/schools/web-development":
        databaseFilePath = path.join(
          process.cwd(),
          "src/app/database/webdev.json"
        );
        break;
      case "/schools/data-science":
        databaseFilePath = path.join(
          process.cwd(),
          "src/app/database/datascience.json"
        );
        break;
      case "/schools/artificial-intelligence":
        databaseFilePath = path.join(
          process.cwd(),
          "src/app/database/artificialintelligence.json"
        );
        break;
      default:
        return NextResponse.error(new Error("Invalid route"), 404);
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

      // Generate a new ID for the enrolled class
      const lastEnrolledClass = myclassesData[myclassesData.length - 1];
      const newId = lastEnrolledClass ? lastEnrolledClass.id + 1 : 1;

      // Add the class to myclasses.json with the new ID
      classToEnroll.id = newId;
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
