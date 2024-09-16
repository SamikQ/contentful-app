import { createClient } from "contentful";
import { useEffect } from "react";
import { useState } from "react";

const client = createClient({
  space: "40j0lbalpo0h",
  environment: "master", // defaults to 'master' if not set
  accessToken: import.meta.env.VITE_API_KEY,
});

export const useFetchProjects = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  const getData = async () => {
    try {
      const response = await client.getEntries({ content_type: "projects" });
      const projects = response.items.map((item) => {
        const { title, url, image } = item.fields;
        const id = item.sys.id;
        // якщо існує img, якщо існує fields, якщо існуть file, дай мені url
        const img = image?.fields?.file?.url;
        return { title, url, id, img };
      });
      setProjects(projects);
      setLoading(false);
    } catch (err) {
      throw new Error(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return { loading, projects };
};
