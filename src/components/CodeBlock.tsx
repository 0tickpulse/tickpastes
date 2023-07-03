import React from "react";
import { CustomRange } from "mythic-language-server/out/utils/positionsAndRanges";

export type CodeBlockProps = {
    code: string;
    ranges: Map<CustomRange, string>;
};

const CodeBlock = ({ code, ranges }: CodeBlockProps) => {
    const lineLengths = code.split("\n").map((line) => line.length);
    const highlightCode = () => {
        let highlightedCode = [];
        let currentPosition = 0;

        let index = 0;
        ranges.forEach((color, range) => {
            const { start, end } = range;
            const startChar = start.toOffset(lineLengths);
            const endChar = end.toOffset(lineLengths);

            // Add the non-highlighted part of the code
            highlightedCode.push(<span key={`code-${index}-part-${currentPosition}`}>{code.substring(currentPosition, startChar)}</span>);

            // Add the highlighted part of the code
            highlightedCode.push(
                <span key={`code-${index}-part-${startChar}-${endChar}`} style={{ color }}>
                    {code.substring(startChar, endChar)}
                </span>
            );

            currentPosition = endChar;
            index++;
        });

        // Add the remaining non-highlighted part of the code
        highlightedCode.push(<span key={`code-${ranges.size}-part-${currentPosition}`}>{code.substring(currentPosition)}</span>);

        return highlightedCode;
    };

    return (
        <pre>
            <code>{highlightCode()}</code>
        </pre>
    );
};

export default CodeBlock;
