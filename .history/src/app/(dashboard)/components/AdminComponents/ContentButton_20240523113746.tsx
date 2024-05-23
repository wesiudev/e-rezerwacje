import { ContentState, EditorState } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import { renderMarkdown } from "../../../../../lib/parseMarkdown";
export default function ContentButton({
  value,
  label,
  setInput,
  optional,
  title,
  type,
  setHtmlContent,
}: {
  value: any;
  label: string;
  setInput: Function;
  optional: boolean;
  title: string;
  type: string;
  setHtmlContent?: Function;
}) {
  return (
    <button
      className={`${!value ? "add_content_btn" : "text-left"} ${
        title === "shortDesc" ? "" : "mt-4"
      }`}
      onClick={() => {
        setInput({ type: type, title: title, label: label });
        if (type === "html" && setHtmlContent)
          setHtmlContent(() => {
            let contentBlock;
            if (typeof value === "string") {
              contentBlock = htmlToDraft(value);
              const contentState = ContentState.createFromBlockArray(
                contentBlock.contentBlocks
              );
              setHtmlContent(EditorState.createWithContent(contentState));
            } else {
              setHtmlContent("");
            }
          });
      }}
    >
      {!value && !optional && label}
      {value && type === "text" && title !== "imagesHeadingSmallText" && (
        <div
          className={`${
            title === "title" || title === "imagesHeadingMainText"
              ? "text-3xl"
              : "text-xl"
          } !text-left font-bold text-zinc-800 drop-shadow-lg shadow-black`}
        >
          {value}
        </div>
      )}
      {title === "imagesHeadingSmallText" && (
        <div
          className={`!text-left italic text-sm text-zinc-500 drop-shadow-lg shadow-black`}
        >
          {value}
        </div>
      )}
      {value && type === "html" && (
        <div dangerouslySetInnerHTML={renderMarkdown(value)} />
      )}
      {!value && optional && (
        <>
          {label}
          <br />
          <span className="text-sm font-normal">(opcjonalnie)</span>
        </>
      )}
    </button>
  );
}
