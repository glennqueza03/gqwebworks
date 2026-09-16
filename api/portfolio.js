import crypto from "node:crypto";
import { getRedis } from "./_lib/redis.js";
import { isAuthenticated } from "./_lib/auth.js";

const PROJECTS_KEY = "portfolio:projects";

const DEFAULT_PROJECTS = [
  {
    id: "jcbm",
    name: "JCBM",
    url: "https://jcbm-b9re.vercel.app/",
    description: "Professional business website",
    type: "Business presence",
    color: "#214845",
    category: "demo",
  },
  {
    id: "law-firm-website",
    name: "Law Firm Website",
    url: "https://law-firm-web-site.vercel.app/",
    description: "Legal practice website",
    type: "Professional services",
    color: "#33425b",
    category: "demo",
  },
  {
    id: "law-firm-template",
    name: "Law Firm Template",
    url: "https://lawfirmtemplatetest.vercel.app/",
    description: "Law firm template design",
    type: "Editorial template",
    color: "#74453b",
    category: "demo",
  },
  {
    id: "coffee-shop",
    name: "Coffee Shop",
    url: "https://coffeeshop-phi-black.vercel.app/",
    description: "Coffee business website",
    type: "Hospitality",
    color: "#a57945",
    category: "demo",
  },
  {
    id: "construction-web",
    name: "Construction Web",
    url: "https://construction-web-plum.vercel.app/",
    description: "Construction company site",
    type: "Trade services",
    color: "#3d4b42",
    category: "demo",
  },
  {
    id: "malware-ai-detection",
    name: "Malware AI Detection",
    url: "https://malware-ai-detection.vercel.app/",
    description:
      "Malware identifier using machine learning algorithms to determine whether a link being entered is malicious or not",
    type: "Machine learning",
    color: "#e6e0d3",
    category: "side",
  },
];

async function getProjects() {
  const redis = getRedis();
  const stored = await redis.get(PROJECTS_KEY);
  return Array.isArray(stored) ? stored : DEFAULT_PROJECTS;
}

async function saveProjects(projects) {
  await getRedis().set(PROJECTS_KEY, projects);
}

function isValidUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    const projects = await getProjects();
    return res.status(200).json({
      demos: projects.filter((p) => p.category !== "side"),
      sideProjects: projects.filter((p) => p.category === "side"),
    });
  }

  if (!(await isAuthenticated(req))) {
    return res.status(401).json({ error: "Not authenticated." });
  }

  if (req.method === "POST") {
    const { name, url, description, type, color, category } = req.body || {};

    if (!name || !url || !isValidUrl(url)) {
      return res.status(400).json({ error: "Name and a valid URL are required." });
    }

    const projects = await getProjects();
    const project = {
      id: crypto.randomUUID(),
      name,
      url,
      description: description || "",
      type: type || "",
      color: color || "#214845",
      category: category === "side" ? "side" : "demo",
    };

    const updated = [...projects, project];
    await saveProjects(updated);
    return res.status(201).json({ project });
  }

  if (req.method === "DELETE") {
    const id = req.query?.id || req.body?.id;
    if (!id) {
      return res.status(400).json({ error: "Project id required." });
    }

    const projects = await getProjects();
    const updated = projects.filter((p) => p.id !== id);

    if (updated.length === projects.length) {
      return res.status(404).json({ error: "Project not found." });
    }

    await saveProjects(updated);
    return res.status(200).json({ ok: true });
  }

  res.setHeader("Allow", "GET, POST, DELETE");
  return res.status(405).json({ error: "Method not allowed" });
}
