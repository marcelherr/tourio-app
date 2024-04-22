import dbConnect from "@/db/connect";
import Places from "@/db/models/Places";

export default async function handler(request, response) {
  try {
    await dbConnect();

    if (request.method === "GET") {
      const places = await Places.find();
      return response.status(200).json(places);
    }
  } catch (error) {
    console.error("Error in Fetching;", error);
    return response.status(500).json({ error: "Internal Server Error" });
  }

  if (request.method === "POST") {
    try {
      const placeData = request.body;
      await Places.create(placeData);

      response.status(201).json({ status: "Place created" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
