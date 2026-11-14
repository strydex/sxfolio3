import Box from "@/components/Box";
import { BsGithub } from "react-icons/bs";
import { TbWorld } from "react-icons/tb";

const ProjectCard = async ({ data }) => {
  let languages = {};
  try {
    const res = await fetch(
      `https://api.github.com/repos/strydex/${data.name}/languages`,
      { next: { revalidate: 3600 } },
    );
    if (res.ok) languages = await res.json();
  } catch {
    languages = { JavaScript: 100 };
  }

  const langKeys = Object.keys(languages || {});

  return (
    <Box className="flex min-h-[10rem] flex-col items-start justify-between gap-2 p-4 font-mono">
      <h3 className="text-lg font-bold text-primary">{data.name}</h3>
      {langKeys.length > 0 && (
        <p className="text-xs text-text_color">
          • {langKeys.slice(0, 3).map((lan) => (
            <span key={lan}>{lan} • </span>
          ))}
        </p>
      )}
      <p className="text-xs text-secondary/90 leading-relaxed">{data.description || "Open source project"}</p>
      <div className="flex gap-4 pt-2 text-xs">
        <a href={data.html_url} target="_blank" className="flex items-center gap-1 text-primary hover:opacity-80">
          <BsGithub /> Code
        </a>
        {data.homepage && (
          <a href={data.homepage} target="_blank" className="flex items-center gap-1 text-secondary hover:opacity-80">
            <TbWorld /> Demo
          </a>
        )}
      </div>
    </Box>
  );
};

export default ProjectCard;
