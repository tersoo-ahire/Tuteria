import { NextResponse, NextRequest } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {
  const request = new NextRequest(req);

  if (request.method === "POST") {
    const formData = JSON.parse(await request.text());

    const myclassesFilePath = path.join(
      process.cwd(),
      "src/app/database/myclasses.json"
    );

    try {
      let myclassesFileContent = fs.readFileSync(myclassesFilePath, "utf8");
      let myclassesData = JSON.parse(myclassesFileContent);

      if (!Array.isArray(myclassesData)) {
        myclassesData = [];
      }

      // Find the index of the class to delete by ID
      const classIndex = myclassesData.findIndex(
        (classItem) => classItem.id === formData.classId
      );

      if (classIndex === -1) {
        return NextResponse.error(new Error("Class not found"), 404);
      }

      // Remove the class from myclasses.json
      myclassesData.splice(classIndex, 1);

      // Update myclasses.json
      fs.writeFileSync(
        myclassesFilePath,
        JSON.stringify(myclassesData, null, 2),
        "utf8"
      );

      return NextResponse.json({ message: "Class deleted successfully" });
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
