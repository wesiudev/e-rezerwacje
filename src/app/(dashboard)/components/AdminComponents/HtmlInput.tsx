"use client";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { FaSignOutAlt } from "react-icons/fa";
import dynamic from "next/dynamic";
import { EditorProps } from "react-draft-wysiwyg";
const Editor = dynamic<EditorProps>(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
export default function HtmlInput({
  setProduct,
  product,
  label,
  type,
  title,
  htmlContent,
  setHtmlContent,
  closeInput,
}: {
  setProduct: any;
  product: any;
  label: any;
  type: any;
  title: any;
  htmlContent: any;
  setHtmlContent: any;
  closeInput: any;
}) {
  const submitHtmlContent = () => {
    const content = draftToHtml(convertToRaw(htmlContent.getCurrentContent()));

    setProduct({
      ...product,
      [title]: !content.toString().includes("<p></p>") ? content : "",
    });
  };

  return (
    <>
      {type === "html" && (
        <div
          className={`z-[250] fixed w-[50vw] min-h-[50vh] bg-slate-700 top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 p-8 rounded-xl flex items-center justify-center flex-col`}
        >
          <button
            onClick={() => {
              setHtmlContent(() => EditorState.createEmpty());
              closeInput();
            }}
            className="flex w-full justify-between mb-4 text-white font-bold"
          >
            <p className="text-2xl">{label}</p>
            <div className="flex flex-row items-center">
              Zamknij
              <FaSignOutAlt className="ml-2" />
            </div>
          </button>
          <Editor
            editorStyle={{
              backgroundColor: "rgb(148 163 184)",
              color: "black",
              height: "300px",
              padding: "3px 15px",
            }}
            editorState={htmlContent}
            onEditorStateChange={setHtmlContent}
          />
          <button
            onClick={() => {
              setHtmlContent(() => EditorState.createEmpty());
              submitHtmlContent();
              closeInput();
            }}
            className="text-white w-full p-4 bg-green-500 hover:bg-green-600 rounded-xl mt-4"
          >
            Zatwierdź
          </button>
        </div>
      )}
    </>
  );
}
