import { Paste, PasteType } from "@prisma/client";
import { preParse, postParse } from "mythic-language-server/out/yaml/parser/parseSync.js";
import { YamlSchema } from "mythic-language-server/out/yaml/schemaSystem/schemaTypes.js";
import { mythicSkillSchema } from "mythic-language-server/out/yaml/schemaSystem/schemas/mythicSkill.js";
import { TextDocument } from "vscode-languageserver-textdocument";

const TYPE_SCHEMAS: Record<keyof typeof PasteType, YamlSchema> = {
    MYTHICSKILL: mythicSkillSchema,
    MYTHICMOB: new YamlSchema(),
    MYTHICITEM: new YamlSchema(),
    MYTHICDROPTABLE: new YamlSchema(),
    MYTHICSPAWNER: new YamlSchema(),
    MYTHICRANDOMSPAWN: new YamlSchema(),
    MYTHICENCHANTMENT: new YamlSchema(),
    MYTHICCONFIGYAML: new YamlSchema(),
    GENERICYAML: new YamlSchema(),
};

export function generateDocFromPaste(paste: Paste) {

    // const { content, type, id, title } = paste;
    const { content, type, id, title } = {
        content: `name: test`,
        type: "MYTHICSKILL",
        id: 1,
        title: "test",
    } as const; // for testing
    const fakeTextDocument = TextDocument.create(
        `paste-${id}`,
        "yaml",
        1,
        content.replace(/\\n/g, "\n") // for testing
    );
    const schema = TYPE_SCHEMAS[type];
    const tempDocInfo = preParse(fakeTextDocument, schema);
    console.log(tempDocInfo);
    const docInfo = postParse(tempDocInfo);
    console.log(docInfo);
    return {
        paste: paste,
        hovers: docInfo.hovers,
        diagnostics: docInfo.errors,
        highlights: docInfo.highlights,
    }
}
