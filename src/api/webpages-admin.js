import axios from "axios";
import { env } from "./environment";

const base_url = `${env}/mda`;

const getAll = async () => {
  const response = await axios.get(`${base_url}/all`);

  if (response.status === 200) {
    let sortData = response.data.data.sort((a, b) =>
      a.subdomain.toLowerCase().localeCompare(b.subdomain.toLowerCase(), "en", {
        sensitivity: "accent",
      }),
    );

    return sortData;
  } else {
    return [];
  }
};

export { getAllMdas };
