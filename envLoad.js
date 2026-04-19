import { config } from "dotenv";

// const environment = "producao";
const environment = "desenvolvimento";

const envFile = environment === "producao" ?
    ".env" :
    ".env.dev";

config({path: envFile});