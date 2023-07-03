"use client";
import { Paste, PasteType } from "@prisma/client";
import { LightAsync, PrismAsyncLight } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import yaml from 'react-syntax-highlighter/dist/esm/languages/prism/yaml';

export default function PasteCodeBlock({ paste }: PasteCodeBlockProps) {
    // const { title, content, type } = paste;
    const { title, content, type } = {
        title: "test",
        content: `skill2:
  Cooldown: 30
  Skills:
  - skill{s=[
    - skill{s=[
      - message{m=1} @target
      ]} @target
    - skill{s=skill2}
    ]}`,
        type: PasteType.MYTHICSKILL,
    };
    return (
        <>
            <h1>{title}</h1>
            <PrismAsyncLight
                language="yaml"
                style={oneDark}
                showLineNumbers={true}
            >
                {content}
            </PrismAsyncLight>
        </>
    );
}
type PasteCodeBlockProps = {
    paste: Paste;
};
