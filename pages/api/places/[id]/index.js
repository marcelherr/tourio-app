import dbConnect from "@/db/connect";
import Places from "@/db/models/Places";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (!id) {
    response.status(404).json({ status: "Data not found" });

    return;
  }
  if (request.method === "GET") {
    const place = await Places.findById(id);

    if (!place) {
      response.status(404).json({ status: "Not found" });
      return;
    }

    response.status(200).json(place);
    return;
  }
  response.status(405).json({ status: "Method not allowed" });
}
