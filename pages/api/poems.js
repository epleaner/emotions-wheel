import fetch from "isomorphic-unfetch";

export default async (req, res) => {
  const { author } = req.query;

  const response = await fetch(
    `http://poetrydb.org/author/${author || "Shakespeare"}`
  );
  const data = await response.json();

  res.status(data.status || 200).json(data);
};
