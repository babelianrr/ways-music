import { relative } from "path";

const buildEslintCommand = (filenames) =>
    `next lint --fix --file ${filenames
        .map((f) => relative(process.cwd(), f))
        .join(" --file ")}`;
        
const commands = {
    "*.{js,jsx,ts,tsx}": [buildEslintCommand],
}

export default commands;
