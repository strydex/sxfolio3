import { GrMysql } from "react-icons/gr";
import {
  SiNextdotjs,
  SiMongodb,
  SiTailwindcss,
  SiPostgresql,
  SiSolidity,
  SiDjango,
  SiDocker,
  SiRedis,
  SiNginx,
  SiFlask,
} from "react-icons/si";
import {
  FaHtml5,
  FaCss3,
  FaGitAlt,
  FaBootstrap,
  FaPython,
} from "react-icons/fa";

const skills = {
  frontend: [
    { icon: <FaHtml5 />, link: "https://html.com/" },
    { icon: <FaCss3 />, link: "https://css3.com/" },
    { icon: <FaBootstrap />, link: "https://getbootstrap.com/" },
    { icon: <SiNextdotjs />, link: "https://nextjs.org/" },
    { icon: <SiTailwindcss />, link: "https://tailwindcss.com/" },
  ],
  backend: [
    { icon: <FaGitAlt />, link: "https://git-scm.com/" },
    { icon: <GrMysql />, link: "https://www.mysql.com/" },
    { icon: <SiMongodb />, link: "https://www.mongodb.com/pt-br" },
    { icon: <SiPostgresql />, link: "https://www.postgresql.org/" },
    { icon: <SiSolidity />, link: "https://soliditylang.org/" },
    { icon: <SiDjango />, link: "https://www.djangoproject.com/" },
    { icon: <SiDocker />, link: "https://www.docker.com/" },
    { icon: <SiRedis />, link: "https://redis.io/" },
    { icon: <SiNginx />, link: "https://nginx.org/en/" },
    { icon: <SiFlask />, link: "https://flask.palletsprojects.com/en/stable/" },
    { icon: <FaPython />, link: "https://www.python.org/" },
  ],
};

export default skills;
