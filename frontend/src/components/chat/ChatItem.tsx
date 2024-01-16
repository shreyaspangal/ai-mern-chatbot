import { useAuth } from '../../context/AuthContext';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkCold } from 'react-syntax-highlighter/dist/esm/styles/prism';

function extractCodeFromString(message: string) {
    if (message.includes("```")) {
        const blocks = message.split("```");
        return blocks;
    }
}

function isCodeBlock(str: string) {
    return !!(
        str.includes("=") ||
        str.includes(";") ||
        str.includes("[") ||
        str.includes("]") ||
        str.includes("{") ||
        str.includes("}") ||
        str.includes("#") ||
        str.includes("//")
    )
}

export default function ChatItem({ content, role }: { content: string, role: "user" | "assistant" }) {
    const auth = useAuth();
    const messageBlocks = extractCodeFromString(content);

    return (
        role === "assistant" ? (
            <div className='flex p-2 my-2 py-4 gap-5 bg-[#004d5612] rounded-md'>
                <img
                    className="inline-block h-6 w-6 rounded-full invert"
                    src='openai.png'
                    alt="openai"
                />
                {!messageBlocks &&
                    (<div className="text-[18px]">
                        {content}
                    </div>)}
                {(messageBlocks && messageBlocks.length !== 0) &&
                    messageBlocks.map(block => (
                        isCodeBlock(block) ?
                            (<SyntaxHighlighter style={coldarkCold} language="javascript">
                                {block}
                            </SyntaxHighlighter>)
                            : (<div className="text-[18px]">
                                {content}
                            </div>)
                    ))

                }
            </div>
        ) : (
            <div className="flex p-2 gap-5 py-4 bg-[#004d56] rounded-md">
                <div className="inline-flex shrink-0 h-6 w-6 items-center justify-center rounded-full bg-slate-900">
                    <div className="text-md font-medium leading-none text-white fw-700">
                        {auth?.user?.name[0]}
                    </div>
                </div>
                <div className="text-[18px]">
                    {content}
                </div>
            </div>
        )
    )
}
