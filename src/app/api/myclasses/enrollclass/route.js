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

      // Find the class to enroll in by ID
      const classToEnroll = webdevData.find((classItem) => classItem.id === formData.classId);

      if (!classToEnroll) {
        return NextResponse.error(new Error("Class not found"), 404);
      }

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
      return NextResponse.error(new Error("Error reading/writing JSON files"), 500);
    }
  } else {
    return NextResponse.error(new Error("Method Not Allowed"), 405);
  }
}