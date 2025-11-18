import { promises as fs } from "fs";
import path from "path";

export default async function handler(req, res) {
  const filePath = path.join(process.cwd(), "mock_data.json");
  const jsonData = await fs.readFile(filePath, "utf8");
  const companies = JSON.parse(jsonData);

  let results = [...companies];
  const {
    q = "",
    industry = "",
    location = "",
    companySize = "",
    _sort = "name",
    _order = "asc",
  } = req.query;

  if (q) {
    const lower = q.toLowerCase();
    results = results.filter((c) =>
      JSON.stringify(c).toLowerCase().includes(lower)
    );
  }

  if (industry) {
    results = results.filter((c) => c.industry === industry);
  }

  if (location) {
    results = results.filter((c) => c.location === location);
  }

  if (companySize) {
    results = results.filter((c) => c.companySize === companySize);
  }

  results.sort((a, b) => {
    if (a[_sort] < b[_sort]) return _order === "asc" ? -1 : 1;
    if (a[_sort] > b[_sort]) return _order === "asc" ? 1 : -1;
    return 0;
  });

  res.status(200).json(results);
}
