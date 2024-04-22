import dbConnect from "@/db/connect";
import Places from "@/db/models/Places";

export default async function handler(request, response) {
  try {
    await dbConnect();

    if (request.method === "GET") {
      const places = await Places.find();
      console.log(places);
      return response.status(200).json(places);
    }
  } catch (error) {
    console.error("Error in Fetching;", error);
    return response.status(500).json({ error: "Internal Server Error" });
  }
}
