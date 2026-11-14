import Image from "next/image";
import ProjectCard from "./ProjectCard";
import Typewriter from "@/components/ArwesComponents/Typewriter";
import BlinkingText from "@/components/BlinkingText";
import moment from "moment/moment";
import { BiLinkExternal } from "react-icons/bi";
import { BsGithub } from "react-icons/bs";

export const dynamic = "force-dynamic";

const fallbackUser = {
  login: "strydex",
  name: "Emir Strydex",
  avatar_url: "https://avatars.githubusercontent.com/u/143320768?v=4",
  bio: "Lead AI Agent Architect & Full-Stack Systems Engineer",
  followers: 12,
  following: 8,
  location: "Armenia // Remote",
  email: "lab@viperlabs.ru",
  blog: "https://viperlabs.ru",
  created_at: "2023-08-27T00:00:00Z",
  public_repos: 18,
};

const fallbackRepos = [
  {
    id: 1,
    name: "sxfolio3",
    description: "Cyberpunk B2B Portfolio & Autonomous AI Terminal",
    html_url: "https://github.com/strydex/sxfolio3",
    homepage: "https://viperlabs.ru",
  },
  {
    id: 2,
    name: "cindy-state",
    description: "Encrypted nightly backup & AI companion state engine",
    html_url: "https://github.com/strydex/cindy-state",
  },
  {
    id: 3,
    name: "viperlabs",
    description: "Production web laboratory on Yandex Cloud Serverless",
    html_url: "https://github.com/strydex/viperlabs",
    homepage: "https://viperlabs.ru",
  },
];

const Github = async () => {
  let user = fallbackUser;
  let repos = fallbackRepos;

  try {
    const userRes = await fetch("https://api.github.com/users/strydex", {
      next: { revalidate: 3600 },
    });
    if (userRes.ok) user = await userRes.json();

    const reposRes = await fetch("https://api.github.com/users/strydex/repos", {
      next: { revalidate: 3600 },
    });
    if (reposRes.ok) repos = await reposRes.json();
  } catch {
    // fallback gracefully
  }

  return (
    <main className="container">
      <section className="grid grid-cols-1 py-16 sm:grid-cols-2">
        <div className="flex items-center justify-center">
          <Image
            src={user.avatar_url || fallbackUser.avatar_url}
            alt="avatar"
            width={300}
            height={300}
            className="w-2/3 rounded-full border-2 border-primary sm:w-1/2"
          />
        </div>
        <div className="mt-4 flex flex-col justify-center font-mono">
          <Typewriter
            as="h1"
            manager="decipher"
            className="mb-1 text-2xl font-bold text-primary"
          >
            {user.name}
          </Typewriter>
          <div className="mb-4">
            <a href="https://github.com/strydex" target="_blank" className="flex items-center gap-2 text-text_color">
              <BsGithub /> {user.login}
            </a>
          </div>
          <p className="mb-4 text-secondary">{user.bio}</p>
          <ul className="space-y-1 text-sm text-secondary/80">
            <li>
              {user.followers || 0} followers | {user.following || 0} following
            </li>
            {user.location && <li>Location: {user.location}</li>}
            {user.email && <li>Email: {user.email}</li>}
            {user.blog && (
              <li>
                <a href={user.blog} target="_blank" className="flex items-center gap-1">
                  {user.blog} <BiLinkExternal />
                </a>
              </li>
            )}
            <li>
              GitHub Member since {moment(user.created_at).format("DD/MM/YYYY")}
            </li>
          </ul>
        </div>
      </section>

      {/* Projects */}
      <section className="flex flex-col items-center pb-16 font-mono">
        <span className="flex items-center gap-2">
          <h2 className="text-3xl font-bold text-primary">Repositories</h2>
          <span className="text-secondary">({repos.length})</span>
        </span>
        <BlinkingText>• プロジェクト •</BlinkingText>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 w-full">
          {repos.map((project) => (
            <ProjectCard key={project.id} data={project} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Github;
